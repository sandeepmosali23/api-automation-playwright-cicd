const { faker } = require('@faker-js/faker');

class UserFactory {
  static createValidUser(overrides = {}) {
    return {
      name: faker.person.fullName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      website: faker.internet.url(),
      ...overrides
    };
  }

  static createInvalidUser(invalidField) {
    const base = this.createValidUser();
    
    switch (invalidField) {
      case 'email':
        base.email = 'invalid-email';
        break;
      case 'name':
        base.name = '';
        break;
      case 'username':
        base.username = 'user@#$%';
        break;
    }
    
    return base;
  }

  static createUsersArray(count = 3) {
    return Array.from({ length: count }, () => this.createValidUser());
  }

  static createSpecificUser(type) {
    const users = {
      john: {
        name: "John Doe",
        username: "johndoe",
        email: "john@example.com",
        phone: "1-555-123-4567",
        website: "johndoe.com"
      },
      jane: {
        name: "Jane Smith",
        username: "janesmith",
        email: "jane@example.com",
        phone: "1-555-987-6543",
        website: "janesmith.com"
      }
    };
    
    return users[type] || this.createValidUser();
  }
}

module.exports = { UserFactory };