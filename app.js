var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var passport = require("passport");
var session = require("express-session");
const Sequelize = require("sequelize");
var app = express();
// DB connection
const sequelize = new Sequelize("Books", "dev", "dev", {
  host: "localhost",
  dialect: "mssql",
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
// test DB connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

// get DB data from dbConnection file
var BookDB = require("./src/config/dbConnection.js")(sequelize);

var port = 3000;

var nav = [
  { Link: "/", Text: "Home" },
  { Link: "/about", Text: "About" },
  { Link: "/post", Text: "Sample post" },
  { Link: "/contact", Text: "Contact" }
];

// get router object from router folder
var indexRouter = require("./src/route/indexRoute.js")(nav);
var aboutRouter = require("./src/route/aboutRoute.js")(nav);
var contactRouter = require("./src/route/contactRoute.js")(nav);
var postRouter = require("./src/route/postRoute.js")(nav, BookDB);
var testRouter = require("./src/route/testRoute.js")(nav);
var authRouter = require("./src/route/authSignUp.js")(nav);
//To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.
// all static files all under public directory and once load it and just skip 'public' directory and go to sub dir
app.use(express.static("public"));

// middleware to handle to request message, parser to Json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({ secret: "library" }));

require("./src/config/passport.js")(app);
// use normal express
//app.use(express.static('src/views'));

// use ejs
app.set("views", "./src/views");

// template engines (EJS)
app.set("view engine", "ejs");
app.use("/", indexRouter);
app.use("/index", indexRouter);
app.use("/About", aboutRouter);
app.use("/Post", postRouter);
app.use("/contact", contactRouter);
app.use("/test", testRouter);
app.use("/auth", authRouter);

// make the server running and start to listen to local port 5000
app.listen(3000, function(err) {
  console.log("running");
});
