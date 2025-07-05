const { BaseApiClient } = require('./base.api.client');

class UserApiClient extends BaseApiClient {
  constructor(request) {
    super(request, '');
  }

  async createUser(userData) {
    return await this.post('/users', userData);
  }

  async getAllUsers() {
    return await this.get('/users');
  }

  async getUserById(userId) {
    return await this.get(`/users/${userId}`);
  }

  async updateUser(userId, userData) {
    return await this.put(`/users/${userId}`, userData);
  }

  async deleteUser(userId) {
    return await this.delete(`/users/${userId}`);
  }
}

module.exports = { UserApiClient };