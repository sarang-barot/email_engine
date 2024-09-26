const db = require('../../config/database');

class User {
  static updateUser(userId, count) {
    db.query(
      'UPDATE users SET total_email_count = ? WHERE id = ?',
      [count, userId]
    );
  }
}

module.exports = User;
