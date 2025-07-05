import { UserApiClient } from '../clients/user.api.client';
import { UserFactory } from '../../data/factories/user.factory';
import { ValidationHelper } from '../../utils/validation.helper';

class UserService {
  constructor(request) {
    this.userApi = new UserApiClient(request);
  }

  async createValidUser(customData = {}) {
    const userData = UserFactory.createValidUser(customData);
    const response = await this.userApi.createUser(userData);

    return {
      ...response,
      userData,
      isValid: ValidationHelper.validateUserResponse(response)
    };
  }

  async getAllUsersWithValidation() {
    const response = await this.userApi.getAllUsers();
    
    return {
      ...response,
      isValid: ValidationHelper.validateUsersListResponse(response),
      userCount: response.data ? response.data.length : 0
    };
  }

  async verifyUserExists(userId) {
    const response = await this.userApi.getUserById(userId);
    return {
      ...response,
      exists: response.status === 200 && response.data !== null
    };
  }

  async performFullUserWorkflow(userData) {
    // Create user
    const createResponse = await this.createValidUser(userData);
    
    // Verify user exists (simulate)
    const verifyResponse = await this.getAllUsersWithValidation();
    
    return {
      createResponse,
      verifyResponse,
      workflowSuccess: createResponse.status === 201 && verifyResponse.status === 200
    };
  }
}

export default { UserService };