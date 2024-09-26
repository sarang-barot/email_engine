const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/outlook', passport.authenticate('windowslive', {
  scope: ['openid', 'profile', 'offline_access', 'https://outlook.office.com/mail.Read']
}));

router.get('/outlook/callback', passport.authenticate('windowslive', {
  failureRedirect: '/'
}), (req, res) => {
  console.log(">>>>>> callback");
  res.redirect('/emails');
});

module.exports = router;
