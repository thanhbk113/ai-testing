import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: [
    // {
    //   name: "chromium",
    //   use: { ...devices["Desktop Chrome"] },
    // },

    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },

    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },
    {
      name: "chromium",
      use: {
        browserName: "chromium",
        channel: "chrome",
        connectOptions: {
          wsEndpoint:
            "wss://cloud.testingbot.com/playwright?key=ed739792712a74f993bf3245d855c623&secret=edfacbcd909277f5d4800d671b9167ca&browserName=chrome&browserVersion=latest",
        },
      },
    },
    // //firefox testingbot
    // {
    //   name: "firefox",
    //   use: {
    //     browserName: "firefox",
    //     channel: "firefox",
    //     connectOptions: {
    //       wsEndpoint:
    //         "wss://cloud.testingbot.com/playwright?key=ed739792712a74f993bf3245d855c623&secret=edfacbcd909277f5d4800d671b9167ca&browserName=firefox&browserVersion=latest",
    //     },
    //   },
    // },
    // //safari testingbot
    // {
    //   name: "safari",
    //   use: {
    //     browserName: "webkit",
    //     channel: "webkit",
    //     connectOptions: {
    //       wsEndpoint:
    //         "wss://cloud.testingbot.com/playwright?key=ed739792712a74f993bf3245d855c623&secret=edfacbcd909277f5d4800d671b9167ca&browserName=webkit&browserVersion=latest",
    //     },
    //   },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
