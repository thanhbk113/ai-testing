import { test, expect } from "@playwright/test";
require("dotenv").config();

test("Successful login redirects to hello page", async ({ page }, testInfo) => {
  try {
    await page.evaluate((_) => {},
    `testingbot_executor: ${JSON.stringify({ action: "setSessionName", arguments: { name: testInfo.project.name } })}`);
    await page.goto(process.env.BASE_URL || "", {
      waitUntil: "networkidle",
    });

    // Điền tài khoản và mật khẩu
    await page.fill("#username", "your-username");
    await page.fill("#password", "your-password");

    // Bấm nút đăng nhập
    await page.click('input[type="submit"]');

    // Kiểm tra trang đã chuyển hướng đến hello.html
    await expect(page).toHaveURL(
      new RegExp(`${process.env.BASE_URL}/hello.html`)
    );

    // Kiểm tra nội dung trang hello.html
    await expect(page.locator("h1")).toHaveText("Chào mừng bạn!");

    await page.evaluate((_) => {},
    `testingbot_executor: ${JSON.stringify({ action: "setSessionStatus", arguments: { passed: true } })}`);
  } catch (e) {
    await page.evaluate((_) => {},
    `testingbot_executor: ${JSON.stringify({ action: "setSessionStatus", arguments: { passed: false, reason: e.message } })}`);
  }
});
