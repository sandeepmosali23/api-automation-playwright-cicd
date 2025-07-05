module.exports = {
  testDir: './tests',
  timeout: 30000,
  use: {
    baseURL: 'https://jsonplaceholder.typicode.com',
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
    },
  },
  reporter: [
    ['html', { outputFolder: 'test-results' }],
    ['json', { outputFile: 'test-results.json' }]
  ],
  projects: [
    {
      name: 'API Tests',
      testMatch: '**/*.spec.js',
    },
  ],
};