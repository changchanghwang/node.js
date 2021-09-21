const mongoose = require("mongoose");

const { Schema } = mongoose;
const usersSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  pw: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("users", usersSchema);