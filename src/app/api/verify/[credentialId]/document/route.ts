import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getAllCredentials } from "@/lib/credential-service";

interface RouteParams {
  params: Promise<{ credentialId: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { credentialId } = await params;
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const isDownload = searchParams.get("download") === "1" || searchParams.get("download") === "true";

  if (!type || (type !== "certificate" && type !== "offer-letter")) {
    return NextResponse.json(
      { error: "Invalid document type requested. Valid options: 'certificate', 'offer-letter'." },
      { status: 400 }
    );
  }

  try {
    const records = await getAllCredentials();
    const record = records.find(
      (r) => r.id.toLowerCase() === (credentialId || "").trim().toLowerCase()
    );

    if (!record) {
      return NextResponse.json(
        { error: "Credential record not found." },
        { status: 404 }
      );
    }

    if (record.status !== "active") {
      return NextResponse.json(
        { error: `Document access unavailable. Credential status is '${record.status}'.` },
        { status: 403 }
      );
    }

    const docRef =
      type === "certificate"
        ? record.certificateDocument
        : record.offerLetterDocument;

    if (!docRef || !docRef.path) {
      return NextResponse.json(
        {
          error: `Document not yet supplied. The ${
            type === "certificate" ? "completion certificate" : "offer letter"
          } PDF is pending client upload.`,
        },
        { status: 404 }
      );
    }

    // Secure path resolution to prevent directory traversal
    const primaryPath = path.resolve(/*turbopackIgnore: true*/ process.cwd(), docRef.path);
    if (!primaryPath.startsWith(process.cwd())) {
      return NextResponse.json(
        { error: "Access denied." },
        { status: 403 }
      );
    }

    // Check multiple candidate locations (e.g. data/docs, public/docs)
    const baseName = path.basename(docRef.path);
    const candidatePaths = [
      primaryPath,
      path.join(/*turbopackIgnore: true*/ process.cwd(), "public", "docs", baseName),
      path.join(/*turbopackIgnore: true*/ process.cwd(), "data", "docs", baseName),
    ];

    let foundPath: string | null = null;
    for (const candPath of candidatePaths) {
      if (candPath.startsWith(process.cwd()) && fs.existsSync(/*turbopackIgnore: true*/ candPath)) {
        foundPath = candPath;
        break;
      }
    }

    if (!foundPath) {
      return NextResponse.json(
        {
          error: `Document file not found on server. The ${
            type === "certificate" ? "completion certificate" : "offer letter"
          } PDF has not yet been placed on the server.`,
        },
        { status: 404 }
      );
    }

    const fileBuffer = await fs.promises.readFile(/*turbopackIgnore: true*/ foundPath);
    const filename = docRef.filename || `${type}.pdf`;
    const disposition = isDownload ? "attachment" : "inline";

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `${disposition}; filename="${encodeURIComponent(filename)}"`,
        "Content-Length": fileBuffer.length.toString(),
        "Accept-Ranges": "bytes",
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error(`[Document API Error] Failed to serve ${type} for ${credentialId}:`, error);
    return NextResponse.json(
      { error: "Internal server error while processing document request." },
      { status: 500 }
    );
  }
}
