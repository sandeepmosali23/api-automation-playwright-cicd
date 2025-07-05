class AuthFactory {
  static createValidCredentials() {
    return {
      email: "eve.holt@reqres.in", // ReqRes.in test user
      password: "cityslicka"
    };
  }

  static createInvalidCredentials(type = 'password') {
    const base = this.createValidCredentials();
    
    switch (type) {
      case 'email':
        base.email = 'invalid@email.com';
        break;
      case 'password':
        base.password = 'wrongpassword';
        break;
      case 'missing_email':
        delete base.email;
        break;
      case 'missing_password':
        delete base.password;
        break;
      case 'empty':
        base.email = '';
        base.password = '';
        break;
    }
    
    return base;
  }

  static createRegistrationData() {
    return {
      email: "eve.holt@reqres.in",
      password: "pistol"
    };
  }

  static createProfileUpdateData() {
    return {
      name: "Updated Name",
      job: "Updated Job Title",
      email: "updated@example.com"
    };
  }

  static createMultipleCredentials() {
    return [
      { email: "eve.holt@reqres.in", password: "cityslicka" },
      { email: "janet.weaver@reqres.in", password: "testpass123" },
      { email: "emma.wong@reqres.in", password: "password456" }
    ];
  }
}

module.exports = { AuthFactory };