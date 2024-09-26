const passport = require('passport');
const OutlookStrategy = require('passport-outlook').Strategy;
const db = require('./database');

passport.use(new OutlookStrategy({
  clientID: process.env.OUTLOOK_CLIENT_ID,
  clientSecret: process.env.OUTLOOK_CLIENT_SECRET,
  callbackURL: process.env.OUTLOOK_CALLBACK_URL,
  passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done) => {
  const email = profile._json.EmailAddress;
  const outlookId = profile.id;

  db.query(
    'SELECT * FROM users WHERE outlook_id = ? OR email = ?',
    [outlookId, email],
    (err, results) => {
      if (err) return done(err);
      
      if (results.length > 0) {
        const user = results[0];
        db.query(
          'UPDATE users SET access_token = ?, refresh_token = ?, token_expiry = DATE_ADD(NOW(), INTERVAL 3600 SECOND) WHERE id = ?',
          [accessToken, refreshToken, user.id]
        );
        return done(null, user);
      } else {
        db.query( 
          'INSERT INTO users (email, outlook_id, access_token, refresh_token, token_expiry) VALUES (?, ?, ?, ?, DATE_ADD(NOW(), INTERVAL 3600 SECOND))',
          [email, outlookId, accessToken, refreshToken],
          (err, results) => {
            if (err) return done(err);
            return done(null, { id: results.insertId, email, outlookId });
          }
        );
      }
    }
  );
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
    if (err) return done(err);
    done(null, results[0]);
  });
});

module.exports = passport;
