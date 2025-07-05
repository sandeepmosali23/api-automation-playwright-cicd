const { BaseApiClient } = require('./base.api.client');

class AuthApiClient extends BaseApiClient {
  constructor(request) {
    super(request, '');
  }

  async login(credentials) {
    return await this.post('/login', credentials);
  }

  async register(userData) {
    return await this.post('/register', userData);
  }

  async getUser(userId) {
    return await this.get(`/users/${userId}`);
  }

  async updateUser(userId, userData) {
    return await this.put(`/users/${userId}`, userData);
  }

  async getUsers() {
    return await this.get('/users');
  }
}

module.exports = { AuthApiClient };