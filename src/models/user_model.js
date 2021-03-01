const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  user: {
    _id: String,
    type: String,
    require: true,
    trim: true,
  },
  name: {
    type: String,
    require: true,
    trim: true,
  },
  lastname: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    trim: true,
    unique: true,
  },
  is_admin: {
    type: String,
    default: "F",
  },
  register: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("user", UserSchema);
