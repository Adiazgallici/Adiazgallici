const { chromium } = require("@playwright/test");
const fs = require("node:fs");
(async () => {
  const browser = await chromium.launch();
  const results = [];
  for (const width of [390, 1440]) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    const response = await page.goto("https://adiazgallici.vercel.app", {
      waitUntil: "load",
    });
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all(
        [...document.images].map(async (i) => {
          i.loading = "eager";
          try {
            await i.decode();
          } catch {}
        }),
      );
    });
    const state = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > innerWidth,
      brokenImages: [...document.images].filter(
        (i) => !i.complete || !i.naturalWidth,
      ).length,
      title: document.title,
    }));
    if (state.overflow || state.brokenImages || response.status() !== 200)
      throw Error(JSON.stringify(state));
    await page.keyboard.press("Tab");
    if ((await page.locator(":focus").innerText()) !== "Skip to content")
      throw Error("Skip link not first");
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => document.activeElement?.id === "main");
    await page.getByRole("link", { name: "The story behind it" }).click();
    await page.waitForURL("**/projects/vindue");
    await page.getByRole("link", { name: "Now", exact: true }).first().click();
    await page.waitForURL("**/now");
    results.push({
      width,
      status: response.status(),
      ...state,
      navigation: "PASS",
      skipLink: "PASS",
    });
    await context.close();
  }
  await browser.close();
  fs.writeFileSync(
    "docs/production-browser.json",
    JSON.stringify(
      {
        checkedOn: "2026-10-21",
        url: "https://adiazgallici.vercel.app",
        results,
      },
      null,
      2,
    ) + "\n",
  );
  console.log(JSON.stringify(results, null, 2));
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
