const axios = require('axios');
const Email = require('../services/email');
const User = require('../services/user');

async function syncEmails(user, emailCount = 0) {
  try {
    let url = 'https://outlook.office.com/api/v2.0/me/messages?$count=true';
    if(emailCount && emailCount < user?.total_email_count) {
      url += `&$skip=${emailCount}&$top=20`;
    }
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${user.access_token}` }
    });
    
    if(user?.total_email_count != response?.data?.['@odata.count']) {
      User.updateUser(user.id, response.data['@odata.count']);
    }

    const emails = response.data.value;
    emails.forEach((email) => {
      const emailData = {
        emailId: email.Id,
        subject: email.Subject,
        sender: email.From.EmailAddress.Address,
        body: email.Body.Content,
        receivedAt: new Date(email.ReceivedDateTime)
      };
      Email.saveEmail(user.id, emailData);
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = { syncEmails };
