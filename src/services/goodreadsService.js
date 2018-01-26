var http = require("http");
var xml2js = require("xml2js");
var parser = xml2js.parser({ explicitArray: false });

var goodreadsService = function() {
  var getBookById = function(id, cb) {
    var options = {
      host: "www.goodreads.com"
    };
    cb(null, { description: "our description" });

    http.request(option, callback).end();
  };
};

module.exports = gppdreadsService;
