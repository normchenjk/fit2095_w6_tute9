const mongoose = require("mongoose");

// name, address, capacity
const warehouseSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: String,
  capacity: {
    type: Number,
    min: 200,
    max: 1000
  }
});

const WarehouseModel = mongoose.model('Warehouse', warehouseSchema);
module.exports = WarehouseModel;