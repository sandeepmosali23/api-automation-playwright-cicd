const { test, expect } = require('@playwright/test');
const { UserService } = require('../../src/api/services/user.service').default;
const { UserFactory } = require('../../src/data/factories/user.factory');
const { PerformanceHelper } = require('../../src/utils/performance.helper');
const { ValidationHelper } = require('../../src/utils/validation.helper');

test.describe('User Management API', () => {
  let userService;

  test.beforeEach(async ({ request }) => {
    userService = new UserService(request);
  });

  test('TC_REG_001 - Create valid user with service layer', async () => {
    const userData = UserFactory.createSpecificUser('john');
    const result = await userService.createValidUser(userData);

    expect(result.status).toBe(201);
    expect(result.isValid).toBeTruthy();
    expect(result.data.name).toBe(userData.name);
    expect(result.data.email).toBe(userData.email);
    expect(ValidationHelper.validateResponseTime(result.responseTime)).toBeTruthy();

    PerformanceHelper.logPerformance('TC_REG_001', result.responseTime, 'POST /users');
  });

  test('TC_REG_002 - Create user with random data', async () => {
    const result = await userService.createValidUser();

    expect(result.status).toBe(201);
    expect(result.isValid).toBeTruthy();
    expect(result.data).toHaveProperty('id');
    expect(ValidationHelper.validateEmail(result.data.email)).toBeTruthy();

    PerformanceHelper.logPerformance('TC_REG_002', result.responseTime, 'POST /users');
  });

  test('TC_GET_001 - Get all users with validation', async () => {
    const result = await userService.getAllUsersWithValidation();

    expect(result.status).toBe(200);
    expect(result.isValid).toBeTruthy();
    expect(result.userCount).toBe(10);
    expect(result.data[0].name).toBe('Leanne Graham');

    PerformanceHelper.logPerformance('TC_GET_001', result.responseTime, 'GET /users');
  });

  test('TC_WORKFLOW_001 - Complete user workflow', async () => {
    const userData = UserFactory.createSpecificUser('jane');
    const result = await userService.performFullUserWorkflow(userData);

    expect(result.workflowSuccess).toBeTruthy();
    expect(result.createResponse.status).toBe(201);
    expect(result.verifyResponse.status).toBe(200);
  });

  test('TC_DATA_001 - Data-driven user creation', async () => {
    const users = UserFactory.createUsersArray(3);
    const results = [];

    for (const userData of users) {
      const result = await userService.createValidUser(userData);
      results.push(result);
    }

    results.forEach((result, index) => {
      expect(result.status).toBe(201);
      expect(result.isValid).toBeTruthy();
      PerformanceHelper.logPerformance(`TC_DATA_001_${index + 1}`, result.responseTime);
    });
  });
});