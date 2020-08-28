"use strict";
const express = require("express");
const routes = express.Router();
const cartItems = [
  {
    id: 1,
    product: "pumpkins",
    price: 5,
    quantity: 4,
  },
  {
    id: 2,
    product: "ghosts",
    price: 3,
    quantity: 12,
  },
  {
    id: 3,
    product: "skeletons",
    price: 12,
    quantity: 2,
  },
];
let newId = 3;
// GET / cart - items;
routes.get("/cart-items", (req, res) => {
  const maxPrice = parseInt(req.query.maxPrice);
  const prefix = req.query.prefix;
  const pageSize = parseInt(req.query.pageSize);
  if (maxPrice) {
    const filteredCart = cartItems.filter((cart) => cart.price <= maxPrice);
    res.json(filteredCart);
  } else if (prefix) {
    const filteredCart = cartItems.filter((cart) =>
      cart.product.startsWith(prefix)
    );
    res.json(filteredCart);
  } else if (pageSize) {
    const filteredCart = cartitem.slice(0, pageSize);
    res.status(200);
    res.jason(filteredCart);
  } else {
    res.json(cartItems);
  }
});

// GET /cart-items/:id
routes.get("/cart-items/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let item = cartItems.find((item) => item.id === id);
  if (item) {
    res.status(200);
    res.json(item);
  } else {
    res.status(404);
    res.send(`ID ${id} not found.`);
  }
});

// // POST /cart-items
routes.post("/cart-items", (req, res) => {
  let item = req.body;
  item.id = newId++;
  cartItems.push(item);
  // 201 status denotes CREATED
  res.status(201);
  res.json(item);
});

// // PUT /cart-items/:id
routes.put("/cart-items/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let index = cartItems.findIndex((item) => {
    return item.id === id;
  });
  cartItems[index] = req.body;
  items[index].id = id;
  res.status(200);
  res.json(items[index]);
});

// // DELETE /cart-items/:id
routes.delete("/cart-items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = cartItems.findIndex((item) => item.id === id);
  cartItems.splice(index, 1);
  // 204 status = deleted
  res.status(204);
  res.json();
});

module.exports = routes;
