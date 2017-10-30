var db = require("../models");
module.exports = function(app) {
  app.get("/api/eaters", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Burger
    db.Author.findAll({
      include: [db.Burger]
    }).then(function(dbEater) {
      res.json(dbEater);
    });
  });
  app.get("/api/eaters/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Burger
    db.Eater.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Burger]
    }).then(function(dbEater) {
      res.json(dbEater);
    });
  });
  app.post("/api/eaters", function(req, res) {
    db.Eater.create(req.body).then(function(dbEater) {
      res.json(dbEater);
    });
  });
  app.delete("/api/eaters/:id", function(req, res) {
    db.Eater.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbEater) {
      res.json(dbEater);
    });
  });
};