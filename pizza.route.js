const express = require("express");
const pizzaRoutes = express.Router();

let Pizza = require("./pizza.model");

pizzaRoutes.route("/create").post(function (req, res) {
  let pizza = new Pizza(req.body);
  pizza
    .save()
    .then((pizza) => {
      res.status(200).json({ pizza: "pizza in created successfully" });
    })
    .catch((err) => {
      res.status(400).send("ERROR: Unable to save pizza to database.");
    });
});

pizzaRoutes.route("/").get(function (req, res) {
  Pizza.find(function (err, pizzas) {
    if (err) {
      console.log(err);
    } else {
      res.json(pizzas);
    }
  });
});

module.exports = pizzaRoutes;
