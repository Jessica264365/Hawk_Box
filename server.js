const express = require("express");
const exphbs = require("express-handlebars");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;

// Requiring our models for syncing
const db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Engine to use handlebars
app.engine(
  "handlebars",
  exphbs({ defaultLayout: "main", extname: "handlebars" })
);
// app.engine(".hbs", expressHbs({ defaultLayout: "layout", extname: ".hbs" }));
// app.set("view engine", ".hbs");

var hbs = exphbs.create({});

hbs.handlebars.registerHelper("readMore", function (str) {
  if (str.length > 150) return str.substring(0, 150) + "...";
  return str;
});
app.set("view engine", "handlebars");

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({}).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});
