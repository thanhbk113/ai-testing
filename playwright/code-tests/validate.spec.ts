import { test, expect } from "@playwright/test";
require("dotenv").config();

test.describe("Form Validation", () => {
  test("Should show alert when username is missing", async ({
    page,
  }, testInfo) => {
    try {
      await page.evaluate((_) => {},
      `testingbot_executor: ${JSON.stringify({ action: "setSessionName", arguments: { name: testInfo.project.name } })}`);
      await page.goto(process.env.BASE_URL || "", {
        waitUntil: "networkidle",
      });

      // Điền mật khẩu nhưng không điền tài khoản
      await page.fill("#password", "your-password");

      // Bấm nút đăng nhập
      page.on("dialog", async (dialog) => {
        expect(dialog.message()).toBe(
          "Vui lòng nhập đầy đủ tài khoản và mật khẩu."
        );
        await dialog.accept();
      });

      await page.click('input[type="submit"]');
      await page.evaluate((_) => {},
      `testingbot_executor: ${JSON.stringify({ action: "setSessionStatus", arguments: { passed: true } })}`);
    } catch (e) {
      await page.evaluate((_) => {},
      `testingbot_executor: ${JSON.stringify({ action: "setSessionStatus", arguments: { passed: false, reason: e.message } })}`);
    }
  });

  test("Should show alert when password is missing", async ({
    page,
  }, testInfo) => {
    try {
      await page.evaluate((_) => {},
      `testingbot_executor: ${JSON.stringify({ action: "setSessionName", arguments: { name: testInfo.project.name } })}`);
      await page.goto(process.env.BASE_URL || "", {
        waitUntil: "networkidle",
      });

      // Điền tài khoản nhưng không điền mật khẩu
      await page.fill("#username", "your-username");

      // Bấm nút đăng nhập
      page.on("dialog", async (dialog) => {
        expect(dialog.message()).toBe(
          "Vui lòng nhập đầy đủ tài khoản và mật khẩu."
        );
        await dialog.accept();
      });

      await page.click('input[type="submit"]');
      //capture image and sent to testing bot
      await page.screenshot({ path: "image.png" });
      await page.evaluate((_) => {},
      `testingbot_executor: ${JSON.stringify({ action: "setSessionStatus", arguments: { passed: true } })}`);
    } catch (e) {
      await page.evaluate((_) => {},
      `testingbot_executor: ${JSON.stringify({ action: "setSessionStatus", arguments: { passed: false, reason: e.message } })}`);
    }
  });

  test("Should show alert when both username and password are missing", async ({
    page,
  }, testInfo) => {
    try {
      await page.evaluate((_) => {},
      `testingbot_executor: ${JSON.stringify({ action: "setSessionName", arguments: { name: testInfo.project.name } })}`);
      await page.goto(process.env.BASE_URL || "", {
        waitUntil: "networkidle",
      });

      // Không điền tài khoản và mật khẩu

      // Bấm nút đăng nhập
      page.on("dialog", async (dialog) => {
        expect(dialog.message()).toBe(
          "Vui lòng nhập đầy đủ tài khoản và mật khẩu."
        );
        await dialog.accept();
      });

      await page.click('input[type="submit"]');
      await page.evaluate((_) => {},
      `testingbot_executor: ${JSON.stringify({ action: "setSessionStatus", arguments: { passed: true } })}`);
    } catch (e) {
      await page.evaluate((_) => {},
      `testingbot_executor: ${JSON.stringify({ action: "setSessionStatus", arguments: { passed: false, reason: e.message } })}`);
    }
  });
});
