class ValidationHelper {
  static validateUserResponse(response) {
    if (!response.data) return false;
    
    const user = response.data;
    const requiredFields = ['id', 'name', 'username', 'email'];
    
    return requiredFields.every(field => 
      user.hasOwnProperty(field) && 
      user[field] !== null && 
      user[field] !== undefined
    );
  }

  static validateUsersListResponse(response) {
    if (!response.data || !Array.isArray(response.data)) return false;
    
    return response.data.every(user => 
      this.validateUserResponse({ data: user })
    );
  }

  static validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static validateResponseTime(responseTime, maxTime = 2000) {
    return responseTime < maxTime;
  }

  static validateHttpStatus(status, expected = 200) {
    return status === expected;
  }
}

module.exports = { ValidationHelper };