// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************
// Dependencies
// =============================================================
// Requiring our models
var db = require("../models");
// Routes
// =============================================================
module.exports = function(app) {
  // GET route for getting all of the burgers
  app.get("/api/burgers", function(req, res) {
    var query = {};
    if (req.query.eater_id) {
      query.EaterId = req.query.eater_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Eater
    db.Burger.findAll({
      where: query,
      include: [db.Eater]
    }).then(function(dbBurger) {
      res.json(dbBurger);
    });
  });
  // Get rotue for retrieving a single burger
  app.get("/api/burgers/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Eater
    db.Burger.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Eater]
    }).then(function(dbBurger) {
      res.json(dbBurger);
    });
  });
  // POST route for saving a new burger
  app.post("/api/burgers", function(req, res) {
    console.log();
    console.log(req.body);
    console.log();
    db.Burger.create(req.body).then(function(dbBurger) {
      res.json(dbBurger);
    });
  });
  // DELETE route for deleting burgers
  app.delete("/api/burgers/:id", function(req, res) {
    db.Burger.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbBurger) {
      res.json(dbBurger);
    });
  });
  // PUT route for updating burgers
  app.put("/api/burgers/:id", function(req, res) {
    db.Burger.update(
      {devoured: req.body.devoured},
      {
        where: {
          id: req.params.id
        }
      }).then(function(dbBurger) {
        res.json(dbBurger);
      });
  });
};