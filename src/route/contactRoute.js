var express = require("express");
var contactRouter = express.Router();
const sql = require("mssql");

// use get method
var router = function(nav) {
  contactRouter.route("/").get(function(req, res) {
    // render the contact ejs html
    res.render("contact", {
      title: "Hello contact",
      nav: nav
    });
  });

  return contactRouter;
};

module.exports = router;
