const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  age: Number,
  gender: String,
  interests: String,
});

module.exports = mongoose.model('User', UserSchema);
