import { test, expect } from "./test-with-fixture";
import { ai } from "@zerostep/playwright";
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

      const aiArgs = { page, test };

      // Điền mật khẩu nhưng không điền tài khoản
      await ai("Fill password field with your-password", aiArgs);

      // Bấm nút đăng nhập
      page.on("dialog", async (dialog) => {
        expect(dialog.message()).toBe(
          "Vui lòng nhập đầy đủ tài khoản và mật khẩu."
        );
        await dialog.accept();
      });

      await ai("Click the Đăng nhập button", aiArgs);

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

      const aiArgs = { page, test };

      // Điền tài khoản nhưng không điền mật khẩu
      await ai("Fill username field with your-username", aiArgs);

      // Bấm nút đăng nhập
      page.on("dialog", async (dialog) => {
        expect(dialog.message()).toBe(
          "Vui lòng nhập đầy đủ tài khoản và mật khẩu."
        );
        await dialog.accept();
      });

      await ai("Click the Đăng nhập button", aiArgs);

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

      const aiArgs = { page, test };

      // Không điền tài khoản và mật khẩu

      // Bấm nút đăng nhập
      page.on("dialog", async (dialog) => {
        expect(dialog.message()).toBe(
          "Vui lòng nhập đầy đủ tài khoản và mật khẩu."
        );
        await dialog.accept();
      });

      await ai("Click the Đăng nhập button", aiArgs);

      await page.evaluate((_) => {},
      `testingbot_executor: ${JSON.stringify({ action: "setSessionStatus", arguments: { passed: true } })}`);
    } catch (e) {
      await page.evaluate((_) => {},
      `testingbot_executor: ${JSON.stringify({ action: "setSessionStatus", arguments: { passed: false, reason: e.message } })}`);
    }
  });
});
