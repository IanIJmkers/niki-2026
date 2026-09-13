import { readFile, writeFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import puppeteer from "puppeteer-core";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const HTML_PATH = join(__dirname, "portfolio-preview.html");
const PDF_PATH = join(__dirname, "portfolio-preview.pdf");

const GLOBE_URL = "https://nikolettakalmar.com/images/globes.webp";
const FONT_URL = "https://nikolettakalmar.com/fonts/Lunette.woff2";

async function fetchDataUri(url, mime) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  return { uri: `data:${mime};base64,${buf.toString("base64")}`, bytes: buf.length };
}

async function main() {
  let html = await readFile(HTML_PATH, "utf8");

  console.log("Fetching + inlining assets…");
  const [globe, font] = await Promise.all([
    fetchDataUri(GLOBE_URL, "image/webp"),
    fetchDataUri(FONT_URL, "font/woff2"),
  ]);
  console.log(`  globe: ${globe.bytes} bytes, font: ${font.bytes} bytes`);

  // Inline assets (handle the www. redirect target too)
  html = html
    .replaceAll(GLOBE_URL, globe.uri)
    .replaceAll(GLOBE_URL.replace("https://", "https://www."), globe.uri)
    .replaceAll(FONT_URL, font.uri)
    .replaceAll(FONT_URL.replace("https://", "https://www."), font.uri);

  // Force the final, fully-revealed state (disable fade-in animations)
  const override = `
    <style id="pdf-override">
      *{ animation: none !important; }
      .globe-bg img{ opacity: .7 !important; }
      .cta{ opacity: 1 !important; }
    </style>
  `;
  html = html.replace("</head>", `${override}</head>`);

  console.log("Launching Chrome…");
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: "new",
  });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 2 });
    await page.emulateMediaType("screen");
    await page.setContent(html, { waitUntil: "networkidle0" });

    await page.pdf({
      path: PDF_PATH,
      width: "1280px",
      height: "800px",
      printBackground: true,
      pageRanges: "1",
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });
  } finally {
    await browser.close();
  }

  const { size } = await stat(PDF_PATH);
  console.log(`\n✓ Wrote ${PDF_PATH}`);
  console.log(`  ${(size / 1024).toFixed(0)} KB`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
