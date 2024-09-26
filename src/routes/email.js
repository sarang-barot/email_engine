const express = require('express');
const db = require('../../config/database');
const { syncEmails } = require('../modules/emailSync');

const router = express.Router();

router.get('/', (req, res) => {
  if (!req.isAuthenticated()) { 
    return res.redirect('/');
  }  

  db.query('SELECT * FROM emails WHERE user_id = ? ORDER BY received_at DESC', [req.user.id], (err, results) => {
    if (err) return res.status(500).send('Error fetching emails');
    syncEmails(req.user, results.length);
    res.render('emails', { emails: results });
  });
});

module.exports = router;
