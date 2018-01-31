var express = require("express");
var postRouter = express.Router();
const sql = require("mssql");

var router = function(nav, BookDB) {
  var bookService = require("../services/goodreadsService.js");
  var bookController = require("../controllers/bookController.js")(
    bookService,
    nav,
    BookDB
  );
  postRouter.route("/").get(bookController.getIndex);

  // get id params from request and past to /:id url
  postRouter.route("/:id").get(bookController.getBookIdFromService);

  return postRouter;
};

module.exports = router;
