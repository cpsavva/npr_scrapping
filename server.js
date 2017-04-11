// Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const exhandle = require('express-handlebars');
const methodOverride = require('method-override');


// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;


// Initialize Express
const app = express();

/* Handlebars and body-parser */
app.engine('handlebars', exhandle({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({
  extended: false
}));

/*use of /public content */
app.use(express.static(__dirname + '/public'));

/*use of method override to delete saved news posts*/
app.use(methodOverride('_method'))


// Database configuration with mongoose
// mongoose.connect("mongodb://localhost/nprScrape");
mongoose.connet('mongodb://heroku_w3fn37rw:25s0ub7mllh5j06h7eg7uhc3hh@ds047930.mlab.com:47930/heroku_w3fn37rw');
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});


/*require routes*/
require('./routes/cheerio.js')(app);
require('./routes/db_routes.js')(app);
require('./routes/comment_routes.js')(app);
app.get('/', function(req, res){
	res.render('index');
})

// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");

});