const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  phone: String,
  addressLines: [String],
}, {
  versionKey: false
});

module.exports = mongoose.model('contacts', userSchema);