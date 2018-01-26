var express = require("express");
var authRouter = express.Router();
const sql = require("mssql");

var router = function() {
  authRouter.route("/signUp").post(function(req, res) {
    console.log(req.body);
    var request = new sql.Request();
    var user = {
      username: req.body.userName,
      password: req.body.password
    };

    // Todo: get user info to DB and save, then check user info and use session to check
    request.query("", function(err, rusult) {});
    // tell passport the user is for login
    req.login(req.body, function() {
      res.redirect("/auth/profile");
    });
  });

  // secure the route

  authRouter
    .route("/profile")
    .all(function(req, res, next) {
      if (!req.user) {
        res.redirect("/");
      }
      next();
    })
    .get(function(req, res) {
      res.json(req.user);
    });

  return authRouter;
};

module.exports = router;
