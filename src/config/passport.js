var passport = require("passport");

module.exports = function(app) {
  app.use(passport.initialize());
  app.use(passport.session());
  /* 
see one note 
*/
  //The result of the serializeUser method is attached to the session as req.session.passport.user = {}
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  // return to the upper folder
  require("../strategies/local.strategy")();
};
