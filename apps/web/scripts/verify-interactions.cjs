const { chromium, webkit, expect } = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;
const fs = require("node:fs");

(async () => {
  const results = [];
  const base = process.env.QA_BASE || "http://127.0.0.1:3017";
  for (const [engine, driver] of [
    ["chromium", chromium],
    ["webkit", webkit],
  ]) {
    const browser = await driver.launch();
    try {
      for (const width of [390, 1440]) {
        const context = await browser.newContext({
          viewport: { width, height: 900 },
          reducedMotion: "reduce",
        });
        const page = await context.newPage();
        const errors = [];
        page.on("pageerror", (error) => errors.push(error.message));
        await page.goto(base);
        await expect(page.locator("html")).toHaveAttribute(
          "data-theme",
          "dark",
        );
        await page
          .getByRole("button", { name: "Switch to light mode" })
          .click();
        await expect(page.locator("html")).toHaveAttribute(
          "data-theme",
          "light",
        );
        await page.reload();
        await expect(page.locator("html")).toHaveAttribute(
          "data-theme",
          "light",
        );
        await page
          .getByRole("link", { name: "Now", exact: true })
          .first()
          .click();
        await page.waitForURL("**/now");
        await expect(page.locator("html")).toHaveAttribute(
          "data-theme",
          "light",
        );
        await page.goto(base);
        await page.getByRole("button", { name: "Switch to dark mode" }).click();
        await page.getByRole("tab", { name: "02 Partidito" }).click();
        await expect(page.getByRole("tabpanel")).toContainText(
          "Built for the next match.",
        );
        await page.keyboard.press("ArrowRight");
        await expect(
          page.getByRole("tab", { name: "03 Passadore" }),
        ).toHaveAttribute("aria-selected", "true");
        await expect(page.getByRole("tabpanel")).toContainText(
          "Your words. The right filters.",
        );
        let violations = [];
        if (engine === "chromium")
          violations = (
            await new AxeBuilder({ page })
              .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
              .analyze()
          ).violations.map((v) => ({
            id: v.id,
            targets: v.nodes.map((n) => n.target),
          }));
        await page
          .getByRole("link", { name: "Explore Inmobiliaria Passadore" })
          .click();
        await page.waitForURL("**/projects/passadore");
        await expect(page.locator("h1")).toContainText(
          "Inmobiliaria Passadore",
        );
        await expect(page.locator(".project-deck")).toContainText(
          "Semantic property search",
        );
        await page.goto(base);
        const keyboardPage = await context.newPage();
        await keyboardPage.goto(base);
        // WebKit's default macOS keyboard policy tabs to controls, not anchors.
        if (engine === "webkit")
          await keyboardPage
            .getByRole("link", { name: "Skip to content" })
            .focus();
        else await keyboardPage.keyboard.press("Tab");
        await expect(keyboardPage.locator(":focus")).toHaveText(
          "Skip to content",
        );
        await keyboardPage.keyboard.press("Enter");
        await keyboardPage.waitForFunction(
          () => document.activeElement?.id === "main",
        );
        await keyboardPage.close();
        const order = await page
          .locator("#work h3, .commerce-section h3, .small-tool h3")
          .allTextContents();
        if (
          !order[2]?.includes("Inmobiliaria") ||
          order.at(-1) !== "isclaude-2x"
        )
          throw new Error("Project priority is incorrect");
        results.push({
          engine,
          width,
          defaultDark: true,
          themeToggle: "PASS",
          persistence: "PASS",
          keyboardTabs: "PASS",
          projectNavigation: "PASS",
          skipLink:
            engine === "webkit"
              ? "PASS: focused link + Enter; macOS Tab policy skips anchors"
              : "PASS: first Tab + Enter",
          order,
          violations,
          errors,
        });
        await context.close();
      }
    } finally {
      await browser.close();
    }
  }
  fs.writeFileSync(
    "docs/interaction-qa.json",
    JSON.stringify({ base, checkedOn: "2026-10-21", results }, null, 2) + "\n",
  );
  console.log(JSON.stringify(results, null, 2));
  if (results.some((row) => row.violations.length || row.errors.length))
    process.exitCode = 1;
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
