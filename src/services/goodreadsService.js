var https = require("https");
var xml2js = require("xml2js");
var parser = new xml2js.Parser();

var goodreadsService = function() {
  var getBookById = function(cb) {
    https
      .get(
        "https://www.goodreads.com/book/show/50.xml?key=UEUngmlt9a7njzyHk5Nzmw",
        resp => {
          let data = ""; // A chunk of data has been recieved.

          resp.on("data", chunk => {
            data += chunk;
          }); // The whole response has been received. Print out the result.

          resp.on("end", () => {
            parser.parseString(data, (err, result) => {
              cb(result);
            });
          });
        }
      )
      .on("error", err => {
        console.log("Error: " + err.message);
      });
  };

  return {
    getBookById: getBookById
  };
};

module.exports = goodreadsService;
