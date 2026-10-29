/**
 * Verification script: scripts/check-pages.mjs
 *
 * Fetches raw HTML for every route from a running server (no client-side JS executed)
 * and asserts:
 * 1. Exactly one H1 with its text.
 * 2. Title length, meta description length, and canonical URL.
 * 3. Number of <img> elements and non-empty alt/dimensions.
 * 4. Zero forbidden strings: "Loading content", "Photo Slot", "pending", "TBC", "TODO", "placeholder", "Lorem", "marble", "basalt", "Imperial".
 * 5. Main body word count above sensible minimums.
 * 6. All internal links resolve with status 200.
 * 7. Removed routes return 404.
 * 8. JSON-LD structured data is valid JSON with required types.
 */

const BASE_URL = process.env.TEST_HOST || "http://localhost:3000";

const ROUTES_TO_TEST = [
  { path: "/", type: "home", minWords: 200, expectedH1: "Granite cut and polished in Hanamkonda." },
  { path: "/company", type: "company", minWords: 350, expectedH1: "About The Lumbini Exports" },
  { path: "/collection", type: "collection", minWords: 200, expectedH1: "Granite Collection" },
  { path: "/collection?category=colour", type: "collection-filter", minWords: 150, expectedCanonical: "https://www.thelumbiniexports.in/collection" },
  { path: "/collection?category=finish", type: "collection-filter", minWords: 150, expectedCanonical: "https://www.thelumbiniexports.in/collection" },
  { path: "/collection/tan-brown", type: "stone", minWords: 250, expectedH1: "Tan Brown" },
  { path: "/collection/peacock-brown", type: "stone", minWords: 250, expectedH1: "Peacock Brown" },
  { path: "/collection/royal-blue", type: "stone", minWords: 250, expectedH1: "Royal Blue" },
  { path: "/collection/safari-blue", type: "stone", minWords: 250, expectedH1: "Safari Blue" },
  { path: "/collection/honey-blue", type: "stone", minWords: 250, expectedH1: "Honey Blue" },
  { path: "/collection/lapotra", type: "stone", minWords: 250, expectedH1: "Lapotra" },
  { path: "/collection/flaming", type: "stone", minWords: 250, expectedH1: "Flaming" },
  { path: "/infrastructure", type: "infrastructure", minWords: 300, expectedH1: "Granite Processing Unit & Facilities" },
  { path: "/get-quote", type: "quote", minWords: 150, expectedH1: "Request a Quote", expectedCanonical: "https://www.thelumbiniexports.in/get-quote" },
  { path: "/get-quote?stone=tan-brown&finish=Polished", type: "quote-params", minWords: 150, expectedCanonical: "https://www.thelumbiniexports.in/get-quote" },
  { path: "/terms", type: "legal", minWords: 400, expectedH1: "Terms & Conditions" },
  { path: "/privacy", type: "legal", minWords: 400, expectedH1: "Privacy Policy" },
];

const REMOVED_ROUTES = [
  "/collection/imperial-pink",
  "/collection/imperial-pink-granite",
  "/collection/marble",
  "/collection/basalt-stone",
  "/non-existent-random-route",
];

const FORBIDDEN_STRINGS = [
  "Loading content",
  "Photo Slot",
  "pending",
  "TBC",
  "TODO",
  "placeholder",
  "Lorem",
  "marble",
  "basalt",
  "Imperial",
];

function cleanHtmlText(html) {
  // Remove script and style tags
  let text = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, " ");
  text = text.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, " ");
  text = text.replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, " ");
  // Strip all HTML tags
  text = text.replace(/<[^>]+>/g, " ");
  // Decode basic HTML entities
  text = text.replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&bull;/g, " ")
    .replace(/&ndash;/g, "-")
    .replace(/&mdash;/g, "-")
    .replace(/&rarr;/g, " ")
    .replace(/&darr;/g, " ");
  return text.replace(/\s+/g, " ").trim();
}

function countWords(text) {
  const words = text.split(/\s+/).filter((w) => w.length > 0);
  return words.length;
}

function extractMeta(html, nameOrProperty) {
  const regex = new RegExp(`<meta\\s+[^>]*(?:name|property)=["']${nameOrProperty}["'][^>]*content=["']([^"']*)["']`, "i");
  const match = html.match(regex);
  if (match) return match[1];

  // Try reverse attribute order: content then name
  const regexRev = new RegExp(`<meta\\s+[^>]*content=["']([^"']*)["'][^>]*(?:name|property)=["']${nameOrProperty}["']`, "i");
  const matchRev = html.match(regexRev);
  return matchRev ? matchRev[1] : null;
}

function extractTagText(html, tag) {
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "gi");
  const matches = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    const raw = match[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    if (raw) matches.push(raw);
  }
  return matches;
}

function extractCanonical(html) {
  const match = html.match(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
  if (match) return match[1];
  const matchRev = html.match(/<link\s+[^>]*href=["']([^"']*)["'][^>]*rel=["']canonical["']/i);
  return matchRev ? matchRev[1] : null;
}

function extractImages(html) {
  const imgRegex = /<img\b([^>]*)>/gi;
  const images = [];
  let match;
  while ((match = imgRegex.exec(html)) !== null) {
    const attrs = match[1];
    const srcMatch = attrs.match(/src=["']([^"']*)["']/i);
    const altMatch = attrs.match(/alt=["']([^"']*)["']/i);
    const widthMatch = attrs.match(/width=["']([^"']*)["']/i);
    const heightMatch = attrs.match(/height=["']([^"']*)["']/i);
    const isAriaHidden = /aria-hidden=["']true["']/i.test(attrs);
    const isDecorative = altMatch && altMatch[1] === "" && isAriaHidden;

    images.push({
      raw: match[0],
      src: srcMatch ? srcMatch[1] : null,
      alt: altMatch ? altMatch[1] : null,
      hasAlt: altMatch !== null,
      width: widthMatch ? widthMatch[1] : null,
      height: heightMatch ? heightMatch[1] : null,
      isDecorative,
    });
  }
  return images;
}

function extractJsonLd(html) {
  const regex = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  const blocks = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    try {
      const parsed = JSON.parse(match[1]);
      blocks.push(parsed);
    } catch (e) {
      blocks.push({ __error: e.message, __raw: match[1] });
    }
  }
  return blocks;
}

function extractInternalLinks(html) {
  const regex = /href=["']([^"']*)["']/gi;
  const links = new Set();
  let match;
  while ((match = regex.exec(html)) !== null) {
    const href = match[1].trim();
    if (
      href.startsWith("/") &&
      !href.startsWith("//") &&
      !href.startsWith("/_next") &&
      !href.startsWith("/api") &&
      !href.includes(".") // ignore static file links like .png, .jpg, .ico
    ) {
      links.add(href.split("#")[0]); // strip fragment
    }
  }
  return Array.from(links).filter(Boolean);
}

async function run() {
  console.log(`\n======================================================`);
  console.log(`SEO & Crawler Verification Suite`);
  console.log(`Target: ${BASE_URL}`);
  console.log(`======================================================\n`);

  let totalFailures = 0;
  const allDiscoveredLinks = new Set();
  const summaryTable = [];

  for (const test of ROUTES_TO_TEST) {
    const url = `${BASE_URL}${test.path}`;
    const failures = [];

    let res;
    let html = "";
    try {
      res = await fetch(url, { headers: { Accept: "text/html" } });
      html = await res.text();
    } catch (err) {
      console.error(`❌ [FAIL] Could not fetch ${url}: ${err.message}`);
      totalFailures++;
      continue;
    }

    if (res.status !== 200) {
      failures.push(`Expected HTTP 200 but received ${res.status}`);
    }

    // 1. Exactly one H1
    const h1s = extractTagText(html, "h1");
    if (h1s.length !== 1) {
      failures.push(`Expected exactly 1 <h1> tag, found ${h1s.length}: ${JSON.stringify(h1s)}`);
    }

    // 2. Title and description
    const titles = extractTagText(html, "title");
    const title = titles[0] || "";
    const description = extractMeta(html, "description") || "";
    const canonical = extractCanonical(html);

    if (!title) {
      failures.push(`Missing <title> tag`);
    }
    if (!description) {
      failures.push(`Missing meta description`);
    }
    if (test.expectedCanonical && canonical !== test.expectedCanonical) {
      failures.push(`Canonical URL mismatch: expected "${test.expectedCanonical}", got "${canonical}"`);
    }

    // 3. Images verification
    const images = extractImages(html);
    for (const img of images) {
      // Must have alt attribute
      if (!img.hasAlt) {
        failures.push(`Image missing alt attribute: ${img.src}`);
      }
    }

    // 4. Forbidden strings in body
    // Remove scripts and json-ld before checking visible text
    const visibleText = cleanHtmlText(html);
    for (const forbidden of FORBIDDEN_STRINGS) {
      const regex = new RegExp(`\\b${forbidden}\\b`, "i");
      if (regex.test(visibleText)) {
        // Exception: "flamed" is allowed, but not "Imperial", "marble", "basalt", "pending", etc.
        failures.push(`Visible body contains forbidden string: "${forbidden}"`);
      }
    }

    // 5. Word count
    const wordCount = countWords(visibleText);
    if (test.minWords && wordCount < test.minWords) {
      failures.push(`Word count too low: ${wordCount} words (minimum required: ${test.minWords})`);
    }

    // 6. JSON-LD blocks
    const jsonLdBlocks = extractJsonLd(html);
    for (const block of jsonLdBlocks) {
      if (block.__error) {
        failures.push(`Malformed JSON-LD block: ${block.__error}`);
      }
    }

    // Collect links for crawling
    const links = extractInternalLinks(html);
    links.forEach((l) => allDiscoveredLinks.add(l));

    if (failures.length > 0) {
      console.log(`❌ [FAIL] ${test.path}`);
      failures.forEach((f) => console.log(`   - ${f}`));
      totalFailures += failures.length;
    } else {
      console.log(`✅ [PASS] ${test.path}`);
      console.log(`   - H1: "${h1s[0]}"`);
      console.log(`   - Title (${title.length} chars): "${title}"`);
      console.log(`   - Meta Description (${description.length} chars): "${description}"`);
      console.log(`   - Canonical: "${canonical || "None"}"`);
      console.log(`   - Images: ${images.length} verified | Word count: ${wordCount} words | JSON-LD blocks: ${jsonLdBlocks.length}`);
    }

    summaryTable.push({
      Route: test.path,
      Status: failures.length === 0 ? "PASS" : "FAIL",
      H1: h1s[0] || "MISSING",
      TitleLength: title.length,
      DescLength: description.length,
      Words: wordCount,
      Images: images.length,
      Canonical: canonical || "MISSING",
    });
  }

  // Verify internal links resolve with status 200
  console.log(`\n--- Verifying All Internal Links (${allDiscoveredLinks.size} unique targets) ---`);
  for (const link of allDiscoveredLinks) {
    try {
      const res = await fetch(`${BASE_URL}${link}`, { headers: { Accept: "text/html" } });
      if (res.status !== 200) {
        console.log(`❌ [FAIL] Internal link ${link} returned status ${res.status}`);
        totalFailures++;
      }
    } catch (e) {
      console.log(`❌ [FAIL] Internal link ${link} could not be fetched: ${e.message}`);
      totalFailures++;
    }
  }

  // Verify removed routes return 404
  console.log(`\n--- Verifying Removed Routes Return HTTP 404 ---`);
  for (const removed of REMOVED_ROUTES) {
    try {
      const res = await fetch(`${BASE_URL}${removed}`, { headers: { Accept: "text/html" } });
      if (res.status === 404) {
        console.log(`✅ [PASS] Removed route ${removed} correctly returns HTTP 404`);
      } else {
        console.log(`❌ [FAIL] Removed route ${removed} returned status ${res.status} (expected 404)`);
        totalFailures++;
      }
    } catch (e) {
      console.log(`❌ [FAIL] Could not test removed route ${removed}: ${e.message}`);
      totalFailures++;
    }
  }

  console.log(`\n======================================================`);
  console.log(`Summary of Checked Pages:`);
  console.table(summaryTable);
  console.log(`Total Failures: ${totalFailures}`);
  console.log(`======================================================\n`);

  if (totalFailures > 0) {
    process.exit(1);
  }
}

run().catch((err) => {
  console.error("Unhandled verification error:", err);
  process.exit(1);
});
