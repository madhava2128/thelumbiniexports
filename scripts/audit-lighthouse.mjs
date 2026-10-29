import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";

const TARGETS = [
  { name: "Home", url: "http://localhost:3005/" },
  { name: "Collection", url: "http://localhost:3005/collection" },
  { name: "Stone (Tan Brown)", url: "http://localhost:3005/collection/tan-brown" },
];

async function runAudit() {
  console.log("Launching Headless Chrome for Lighthouse Mobile Audits...");
  const chrome = await chromeLauncher.launch({
    chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu"],
  });

  const options = {
    logLevel: "error",
    output: "json",
    onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
    port: chrome.port,
    formFactor: "mobile",
  };

  const results = [];

  for (const target of TARGETS) {
    console.log(`Auditing ${target.name} (${target.url})...`);
    try {
      const runnerResult = await lighthouse(target.url, options);
      const categories = runnerResult.lhr.categories;
      const perf = Math.round(categories.performance.score * 100);
      const a11y = Math.round(categories.accessibility.score * 100);
      const bp = Math.round(categories["best-practices"].score * 100);
      const seo = Math.round(categories.seo.score * 100);

      const audits = runnerResult.lhr.audits;
      const lcp = audits["largest-contentful-paint"]?.displayValue;
      const fcp = audits["first-contentful-paint"]?.displayValue;
      const cls = audits["cumulative-layout-shift"]?.displayValue;
      const tbt = audits["total-blocking-time"]?.displayValue;

      // Print diagnostics with score < 0.9
      const opps = Object.values(audits)
        .filter(a => a.details && a.details.type === 'opportunity' && a.score !== null && a.score < 0.9)
        .map(a => `${a.title}: ${a.displayValue || Math.round(a.score * 100)}`);

      results.push({
        Page: target.name,
        URL: target.url,
        Performance: perf,
        Accessibility: a11y,
        "Best Practices": bp,
        SEO: seo,
        LCP: lcp,
        FCP: fcp,
        CLS: cls,
        TBT: tbt,
        Opportunities: opps.join("; "),
      });
    } catch (e) {
      console.error(`Audit failed for ${target.name}:`, e.message);
      results.push({
        Page: target.name,
        URL: target.url,
        Error: e.message,
      });
    }
  }

  await chrome.kill();

  console.log("\n======================================================");
  console.log("Lighthouse Mobile Audit Scores (Target: 90+ Performance, 100 SEO & BP):");
  console.table(results);
  console.log("======================================================\n");
}

runAudit().catch((err) => {
  console.error("Fatal audit error:", err);
  process.exit(1);
});
