var express = require("express");
var postRouter = express.Router();
const sql = require("mssql");

var router = function(nav, BookDB) {
  postRouter.route("/").get(function(req, res) {
    BookDB.findAll().then(function(books) {
      var jsonString = JSON.stringify(books);
      var obj = JSON.parse(jsonString);
      var bookData = obj;
      // console.log(bookData);
      res.render("post", {
        title: "Hello post",
        nav: nav,
        books: bookData
      });
    });
  });

  // get id params from request and past to /:id url
  postRouter.route("/:id").get(function(req, res) {
    var id = req.params.id;
    BookDB.findAll({
      where: {
        bookId: id
      }
    }).then(function(books) {
      var jsonString = JSON.stringify(books);
      var obj = JSON.parse(jsonString);
      var bookData = obj;
      // console.log(bookData[0].title);
      res.render("singlePostView", {
        title: "singlePost",
        nav: nav,
        book: bookData[0]
      });
    });
  });

  return postRouter;
};

module.exports = router;
