/**
 * Real browser click-through for /get-started (not a direct API POST).
 */
import { chromium } from "playwright";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://tef-deploy.vercel.app";

async function submitAndReport(page, label, { name, email, checkHoneypot = false, fakeCompanyAutofill = false }) {
  console.log(`\n=== ${label} ===`);
  await page.goto(`${SITE}/get-started`, { waitUntil: "networkidle" });

  const formAction = await page.locator("form.tef-get-started-form").getAttribute("action");
  const formMethod = await page.locator("form.tef-get-started-form").getAttribute("method");
  console.log("Form wiring:", { formAction, formMethod });

  const hp = page.locator(".tef-hp input");
  console.log("Honeypot:", {
    name: await hp.getAttribute("name"),
    type: await hp.getAttribute("type"),
    checked: await hp.isChecked().catch(() => null),
  });

  await page.fill("#name", name);
  await page.fill("#email", email);

  if (fakeCompanyAutofill) {
    // Simulate what Chrome/1Password used to do to name="company"
    await page.evaluate(() => {
      const form = document.querySelector("form.tef-get-started-form");
      if (!form) return;
      let input = form.querySelector('input[name="company"]');
      if (!input) {
        input = document.createElement("input");
        input.type = "text";
        input.name = "company";
        input.value = "Autofilled Corp";
        form.appendChild(input);
      } else {
        input.value = "Autofilled Corp";
      }
    });
    console.log("Injected autofilled company=Autofilled Corp (legacy trap)");
  }

  if (checkHoneypot) {
    await page.evaluate(() => {
      const el = document.querySelector('.tef-hp input[name="tef_extra"]');
      if (el) el.checked = true;
    });
    console.log("Checked honeypot checkbox intentionally");
  }

  console.log(`Click "Begin the Programme" with email=${email}`);
  await Promise.all([
    page.waitForURL((url) => !url.pathname.endsWith("/api/get-started"), {
      timeout: 45000,
      waitUntil: "networkidle",
    }),
    page.click('button[type="submit"]'),
  ]);

  const url = page.url();
  const body = (await page.locator("body").innerText()).slice(0, 280);
  console.log("Landed URL:", url);
  console.log("Body snippet:", body.replace(/\s+/g, " ").trim());
  return url;
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // 1) Clean real click-through
  const url1 = await submitAndReport(page, "Clean browser submit", {
    name: "Browser Repro",
    email: `browser.ok.${Date.now()}@example.com`,
  });

  // 2) Legacy autofill of company should NOT bounce anymore
  const url2 = await submitAndReport(page, "Legacy company autofill present", {
    name: "Autofill Victim",
    email: `browser.autofill.${Date.now()}@example.com`,
    fakeCompanyAutofill: true,
  });

  // 3) Real honeypot still blocks bots
  const url3 = await submitAndReport(page, "Honeypot checked (bot)", {
    name: "Bot",
    email: `browser.bot.${Date.now()}@example.com`,
    checkHoneypot: true,
  });

  console.log("\n=== SUMMARY ===");
  console.log("clean → /paths?", url1.includes("/paths"));
  console.log("company autofill → /paths?", url2.includes("/paths"));
  console.log("honeypot checked → bounced to /get-started?", /\/get-started\/?$/.test(new URL(url3).pathname) && !url3.includes("/paths"));

  await browser.close();

  if (!url1.includes("/paths") || !url2.includes("/paths")) {
    process.exit(1);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
