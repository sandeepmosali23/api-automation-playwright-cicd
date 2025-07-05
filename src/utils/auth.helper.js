class AuthHelper {
  static validateToken(token) {
    if (!token) return false;
    // Basic token validation (in real apps, you'd decode JWT)
    return typeof token === 'string' && token.length > 10;
  }

  static validateLoginResponse(response) {
    return response.status === 200 && 
           response.data && 
           response.data.token &&
           this.validateToken(response.data.token);
  }

  static validateLogoutResponse(response) {
    return response.status === 200;
  }

  static validateProtectedEndpointResponse(response) {
    return response.status === 200 && response.data;
  }

  static validateUnauthorizedResponse(response) {
    return response.status === 401 || response.status === 403;
  }

  static generateAuthHeaders(token) {
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }

  static logAuthAction(action, success, token = null) {
    const timestamp = new Date().toISOString();
    const status = success ? '✅' : '❌';
    const tokenInfo = token ? `(Token: ${token.substring(0, 10)}...)` : '';
    
    console.log(`[${timestamp}] ${status} ${action} ${tokenInfo}`);
  }
}

module.exports = { AuthHelper };