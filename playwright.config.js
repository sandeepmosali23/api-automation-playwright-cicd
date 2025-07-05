const { defineConfig } = require('@playwright/test');
const environment = process.env.TEST_ENVIRONMENT || 'production';
const config = require(`./config/environments.json`)[environment];

module.exports = defineConfig({
  testDir: './tests',
  timeout: config.timeout,
  retries: process.env.CI ? config.retries : 0,
  
  use: {
    baseURL: config.baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'API Tests',
      testMatch: '**/api/**/*.spec.js',
    },
  ],

  reporter: process.env.CI ? [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'test-results.json' }],
    ['github']
  ] : [['html', { open: 'always' }]],
});