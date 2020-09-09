const mongoose = require("mongoose");

// Items - name, sku, cost, quantity, warehouse stored at, time added to the warehouse
const itemSchema = mongoose.Schema({
  name: String,
  sku: {
    type: String,
    validate: {
      validator: function(skuValue) {
        return skuValue.length == 10;
      },
      message: "SKU must be exactly 10 characters long"
    }
  },
  cost: Number,
  quantity: {
    type: Number,
    min: 0
  },
  warehouse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Warehouse"
  },
  created: {
    type: Date,
    default: Date.now
  }
});

const ItemModel = mongoose.model("Item", itemSchema);
module.exports = ItemModel;