const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  image: String,
  caption: String
});

const POSTModel = mongoose.model("post", postSchema);

module.exports = POSTModel;