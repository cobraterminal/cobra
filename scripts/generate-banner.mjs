#!/usr/bin/env node
/**
 * Generates banner (1500x500) and icon (400x400) with hexagon background.
 * Run: npm run generate-banner
 * Requires: dev server running (npm run dev)
 * If npm install fails on puppeteer: PUPPETEER_SKIP_DOWNLOAD=1 npm install
 */

import puppeteer from "puppeteer"
import { join } from "path"
import { fileURLToPath } from "url"

const __dirname = fileURLToPath(new URL(".", import.meta.url))
const publicDir = join(__dirname, "..", "public")

async function capture(page, url, selector, viewport, outputs) {
  await page.setViewport({ ...viewport, deviceScaleFactor: 1 })
  await page.goto(url, { waitUntil: "networkidle0", timeout: 5000 })
  await page.waitForSelector(selector, { timeout: 5000 })
  await page.evaluate(() => {
    document.querySelectorAll("body > *").forEach((el) => {
      const rect = el.getBoundingClientRect()
      const style = getComputedStyle(el)
      if (style.position === "fixed" && rect.width < 120 && rect.height < 120 && rect.left < 150 && rect.bottom > 250) {
        el.style.setProperty("display", "none", "important")
      }
    })
  })
  const element = await page.$("main")
  for (const { path, type, quality } of outputs) {
    await element.screenshot({
      path: join(publicDir, path),
      type,
      ...(quality && { quality }),
    })
  }
}

async function generate() {
  console.log("Launching browser...")
  const browser = await puppeteer.launch({
    headless: "new",
    executablePath:
      process.platform === "darwin"
        ? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
        : process.platform === "win32"
          ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
          : "/usr/bin/google-chrome",
  })

  try {
    const page = await browser.newPage()
    const ports = [3000, 3001]
    let baseUrl = null
    for (const port of ports) {
      try {
        await page.goto(`http://localhost:${port}/banner`, {
          waitUntil: "networkidle0",
          timeout: 5000,
        })
        baseUrl = `http://localhost:${port}`
        break
      } catch (e) {
        if (!e.message?.includes("ERR_CONNECTION_REFUSED")) throw e
      }
    }
    if (!baseUrl) {
      throw new Error("Nie można połączyć z serwerem. Uruchom: npm run dev")
    }

    console.log("Generating banner (1500x500)...")
    await capture(page, `${baseUrl}/banner`, "h1", { width: 1500, height: 500 }, [
      { path: "cobra-banner.png", type: "png" },
      { path: "cobra-banner.jpg", type: "jpeg", quality: 100 },
    ])

    console.log("Generating icon (400x400)...")
    await capture(page, `${baseUrl}/icon`, "img", { width: 400, height: 400 }, [
      { path: "cobra-icon.png", type: "png" },
      { path: "cobra-icon.jpg", type: "jpeg", quality: 100 },
    ])

    console.log("\nSaved to public/:")
    console.log("  - cobra-banner.png, cobra-banner.jpg (1500x500)")
    console.log("  - cobra-icon.png, cobra-icon.jpg (400x400)")
  } catch (err) {
    console.error("Error:", err.message)
    console.log("\nMake sure the dev server is running: npm run dev")
    process.exit(1)
  } finally {
    await browser.close()
  }
}

generate()
