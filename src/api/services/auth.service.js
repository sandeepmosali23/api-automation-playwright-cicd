const { AuthApiClient } = require('../clients/auth-api.client');

class AuthService {
  constructor(request) {
    this.authApi = new AuthApiClient(request);
    this.currentToken = null;
    this.currentUser = null;
  }

  async loginUser(credentials) {
    const response = await this.authApi.login(credentials);
    
    if (response.status === 200 && response.data?.token) {
      this.currentToken = response.data.token;
      this.currentUser = response.data.user || null;
    }
    
    return {
      ...response,
      isAuthenticated: !!this.currentToken,
      token: this.currentToken
    };
  }

  async registerUser(userData) {
    const response = await this.authApi.register(userData);
    
    if (response.status === 200 && response.data?.token) {
      this.currentToken = response.data.token;
    }
    
    return {
      ...response,
      isRegistered: response.status === 200,
      token: response.data?.token || null
    };
  }

  async getUser(userId) {
    const response = await this.authApi.getUser(userId);
    return {
      ...response,
      isFound: response.status === 200
    };
  }

  async updateUser(userId, userData) {
    const response = await this.authApi.updateUser(userId, userData);
    return {
      ...response,
      isUpdated: response.status === 200
    };
  }

  async performUserWorkflow(credentials, userId, updateData) {
    // Step 1: Login
    const loginResponse = await this.loginUser(credentials);
    
    // Step 2: Get User
    const getUserResponse = await this.getUser(userId);
    
    // Step 3: Update User
    const updateResponse = await this.updateUser(userId, updateData);
    
    return {
      loginResponse,
      getUserResponse,
      updateResponse,
      workflowSuccess: loginResponse.isAuthenticated && 
                      getUserResponse.isFound && 
                      updateResponse.isUpdated
    };
  }

  getCurrentToken() {
    return this.currentToken;
  }

  isAuthenticated() {
    return !!this.currentToken;
  }
}

module.exports = { AuthService };