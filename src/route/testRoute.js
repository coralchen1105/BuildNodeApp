var express = require("express");
var testRouter = express.Router();
const sql = require("mssql");

// use get method
var router = function(nav) {
  testRouter.route("/").get(function(req, res) {
    // render the contact ejs html
    res.render("test", {
      title: "Hello contact",
      nav: nav
    });
  });

  return testRouter;
};

module.exports = router;
