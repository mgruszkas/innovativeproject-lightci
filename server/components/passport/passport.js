/**
 * Created by root on 12/16/14.
 */


var LocalStrategy   = require('passport-local').Strategy;
var db = require('../db/db');

module.exports = function(passport) {

  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    var dbUser = db.findInstance('Users', {where: {id: id}});
    dbUser.then(function (user) {
      done(null, user[0]);
    });
  });

  // =========================================================================
  // LOCAL LOGIN =============================================================
  // =========================================================================

  passport.use('local-login', new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true
    },

    function(req, email, password, done) {

      var dbUser = db.findInstance('Users', {where: {user_email: email}});
      dbUser.then(function (user) {
        if (user.length==0) {
          req.session.error = 'Incorrect email.';
          console.log(req.session.error);

          return done(null, false, {message: 'Incorrect email.'});
        }

        if (user[0].user_pass !== password) {
          req.session.error = 'Incorrect password.';
          console.log(req.session.error);

          return done(null, false, {message: 'Incorrect password.'});
        }

        console.log("Auth OK - " + user[0].user_email);
        return done(null, user[0]);
      });

    }));
}