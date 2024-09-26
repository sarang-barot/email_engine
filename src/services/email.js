const db = require('../../config/database');

class Email {
  static saveEmail(userId, emailData) {
    db.query(
      'INSERT INTO emails (user_id, email_id, subject, sender, body, received_at) VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE subject = ?, sender = ?, body = ?, received_at = ?',
      [userId, emailData.emailId, emailData.subject, emailData.sender, emailData.body, emailData.receivedAt, emailData.subject, emailData.sender, emailData.body, emailData.receivedAt]
    );
  }

  static fetchEmails(userId) {
    return new Promise((resolve, reject)=>{
      db.query(
        'SELECT COUNT(id) as count FROM emails WHERE user_id = ?',
        [userId], (err, result) => {
          if (err) reject(false);
          resolve({ count: result && result[0]?.count || 0 });
        }
      );
    });
  }
}

module.exports = Email;
