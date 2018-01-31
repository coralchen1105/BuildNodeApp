const sql = require("mssql");
var xml2js = require("xml2js");
var parser = new xml2js.Parser();
var inspect = require("util-inspect");
// todo: controller
// get post Route function here
var bookController = function(bookService, nav, BookDB) {
  var getIndex = function(req, res) {
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
  };

  var getBookIdFromService = function(req, res) {
    // MARK!!!!!!!! finally get api data from callback function
    // TODO: cleanup data
    bookService().getBookById(function(result) {
      console.log(result.GoodreadsResponse.book[0].id);
      console.log(result.GoodreadsResponse.book[0].title);
      console.log(result.GoodreadsResponse.book[0].description);

      res.render("singlePostView", {
        title: "singlePost",
        nav: nav,
        book: result.GoodreadsResponse.book[0]
      });
    });
  };

  var getById = function(req, res) {
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
  };

  return {
    getIndex: getIndex,
    getById: getById,
    getBookIdFromService: getBookIdFromService
  };
};

module.exports = bookController;
