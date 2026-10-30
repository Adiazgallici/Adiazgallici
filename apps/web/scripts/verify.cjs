const { chromium, webkit, expect } = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;
const fs = require("node:fs");

(async () => {
  const results = [];
  const base = process.env.QA_BASE || "http://127.0.0.1:3017";
  const routes = [
    "/",
    "/projects/vindue",
    "/projects/partidito",
    "/projects/passadore",
    "/projects/lessio-store",
    "/projects/lessio-stock",
    "/projects/isclaude-2x",
    "/now",
    "/log",
  ];
  for (const [engine, driver] of [
    ["chromium", chromium],
    ["webkit", webkit],
  ]) {
    const browser = await driver.launch();
    try {
      for (const width of [360, 390, 768, 1440])
        for (const theme of ["dark", "light"]) {
          const context = await browser.newContext({
            viewport: { width, height: width < 768 ? 844 : 1000 },
            reducedMotion: "reduce",
          });
          await context.addInitScript(
            (theme) => localStorage.setItem("portfolio-theme", theme),
            theme,
          );
          const page = await context.newPage();
          const errors = [];
          page.on("pageerror", (error) => errors.push(error.message));
          for (const route of routes) {
            errors.length = 0;
            const response = await page.goto(base + route, {
              waitUntil: "load",
            });
            await page.evaluate(async () => {
              await document.fonts.ready;
              await Promise.all(
                [...document.images].map(async (image) => {
                  image.loading = "eager";
                  try {
                    await image.decode();
                  } catch {}
                }),
              );
            });
            const state = await page.evaluate(() => ({
              overflow: document.documentElement.scrollWidth > innerWidth,
              heading: document.querySelector("h1")?.textContent,
              lang: document.documentElement.lang,
              appliedTheme: document.documentElement.dataset.theme,
              brokenImages: [...document.images]
                .filter((image) => !image.complete || !image.naturalWidth)
                .map((image) => image.src),
            }));
            let violations = [];
            if (engine === "chromium" && [390, 1440].includes(width)) {
              violations = (
                await new AxeBuilder({ page })
                  .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
                  .analyze()
              ).violations.map((item) => ({
                id: item.id,
                impact: item.impact,
                nodes: item.nodes.map((node) => ({
                  target: node.target,
                  summary: node.failureSummary,
                })),
              }));
            }
            results.push({
              engine,
              width,
              theme,
              route,
              status: response.status(),
              ...state,
              violations,
              errors: [...errors],
            });
            if (
              route === "/" &&
              engine === "chromium" &&
              [390, 1440].includes(width)
            ) {
              await page.screenshot({
                path: `docs/redesign-${width === 390 ? "mobile" : "desktop"}-${theme}.png`,
                fullPage: true,
                animations: "disabled",
              });
            }
          }
          await page.goto(base + "/");
          await page.getByRole("link", { name: "The story behind it" }).click();
          await page.waitForURL("**/projects/vindue");
          await page
            .getByRole("link", { name: "Now", exact: true })
            .first()
            .click();
          await page.waitForURL("**/now");
          await page.goto(base + "/missing-project");
          await expect(page.locator("h1")).toContainText("Nothing built");
          console.log(engine, width, theme, "pages and navigation checked");
          await context.close();
        }
    } finally {
      await browser.close();
    }
  }
  fs.writeFileSync(
    "docs/browser-qa.json",
    JSON.stringify({ base, checkedOn: "2026-10-21", results }, null, 2) + "\n",
  );
  const failures = results.filter(
    (row) =>
      row.status !== 200 ||
      row.overflow ||
      row.brokenImages.length ||
      row.violations.length ||
      row.errors.length ||
      row.theme !== row.appliedTheme,
  );
  console.log(JSON.stringify({ checks: results.length, failures }, null, 2));
  if (failures.length) process.exitCode = 1;
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
