import { test } from "./test-with-fixture";
import { ai } from "@zerostep/playwright";
require("dotenv").config();

test("Successful login redirects to hello page", async ({ page }, testInfo) => {
  try {
    // Set session name for testing tools (optional)
    await page.evaluate((_) => {},
    `testingbot_executor: ${JSON.stringify({ action: "setSessionName", arguments: { name: testInfo.project.name } })}`);

    // Navigate to base URL
    await page.goto(process.env.BASE_URL || "", {
      waitUntil: "networkidle",
    });

    const aiArgs = { page, test };

    // Interact with elements using ZeroStep AI
    await ai("Fill username field with your username", aiArgs);
    await ai("Fill password field with your password", aiArgs);
    await ai("Click the Đăng nhập button", aiArgs);

    // Use ZeroStep AI to check header text on hello.html
    const hasCorrectHeaderText = await ai(
      "Check the header text has Chào mừng bạn!",
      aiArgs
    );

    if (!hasCorrectHeaderText) {
      throw new Error("The header text on hello.html is not correct");
    }

    // Set session status for testing tools (optional)
    await page.evaluate((_) => {},
    `testingbot_executor: ${JSON.stringify({ action: "setSessionStatus", arguments: { passed: true } })}`);
  } catch (e) {
    // Report error and set session status for testing tools (optional)
    await page.evaluate((_) => {},
    `testingbot_executor: ${JSON.stringify({ action: "setSessionStatus", arguments: { passed: false, reason: e.message } })}`);
    throw e; // Re-throw to trigger Playwright failure handling
  }
});
