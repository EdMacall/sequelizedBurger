// *** Dependencies
// =============================================================
var express        = require("express");
var methodOverride = require("method-override");
var bodyParser     = require("body-parser");

var PORT = process.env.PORT || 3000;

// Sets up the Express App
// =============================================================
var app = express();

// Requiring our models for syncing
// var db = require("./models/burger.js");

// Static directory
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

// Sets up the Express app to handle data parsing
/*
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
*/

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
// =============================================================
// require("./routes/api-routes.js")(app);
var routes = require("./controllers/burgers_controller.js");

app.use("/", routes);


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
// Syncing our sequelize models and then starting our Express app
// =============================================================
/*
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
*/