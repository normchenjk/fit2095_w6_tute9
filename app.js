const express = require("express");
const app = express();
const mongoose = require("mongoose");

// Warehouse - name, address, capacity
// Create
// Read

// Items - name, sku, cost, quantity, warehouse stored at, time added to the warehouse
// Create
// Read
// Update
// Delete

const Warehouse = require("./models/warehouse.js");
const Item = require("./models/item.js");

mongoose.connect("mongodb://localhost:27017/warehouseDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  function (err) {
    if (err) {
      throw err
    }

    console.log("Successfully connected");
  });

// Warehouse routes
// http://localhost:8080/addwarehouse/OtherWarehouse/500/Melbourne
app.get("/addwarehouse/:name/:capacity/:address", function (req, res) {
  const warehouse = new Warehouse({
    name: req.params.name,
    address: req.params.address,
    capacity: parseInt(req.params.capacity)
  });

  warehouse.save(function (err) {
    if (err) {
      console.log("Unable to create the warehouse.", err.message);
    }

    res.redirect("/getwarehouses");
  });
});

app.get("/getwarehouses", function (req, res) {
  Warehouse.find(function (err, data) {
    data = JSON.stringify(data, null, 2);
    res.send("<pre>" + data + "</pre>");
  });
});

// Item routes
// http://localhost:8080/additem/5f5817cac239a62798dcaa72/Book/1234567890/20/40
app.get("/additem/:whId/:name/:sku/:cost/:quantity", function (req, res) {
  const item = new Item({
    name: req.params.name,
    sku: req.params.sku,
    cost: req.params.cost,
    quantity: req.params.quantity,
    warehouse: mongoose.Types.ObjectId(req.params.whId)
  });

  item.save(function (err) {
    if (err) {
      console.log("Unable to create the item.", err.message);
    }

    res.redirect("/getitems");
  });
});

app.get("/getitems", function (req, res) {
  Item.find(function (err, data) {
    data = JSON.stringify(data, null, 2);
    res.send("<pre>" + data + "</pre>");
  });
});

// http://localhost:8080/updateItem/1234567890/500
app.get("/updateItem/:sku/:newQty", function (req, res) {
  Item.updateOne(
    { 'sku': req.params.sku },
    { $set: { 'quantity': parseInt(req.params.newQty) } },
    function (err, data) {
      res.redirect("/getitems");
    }
  )
});

// http://localhost:8080/deleteItem/1234567890
app.get("/deleteItem/:sku", function (req, res) {
  Item.findOneAndDelete(
    { 'sku': req.params.sku },
    function (err, data) {
      res.redirect("/getitems");
    }
  )
});

app.listen(8080);