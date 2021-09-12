const mongoose = require('mongoose');

const todolistSchema = mongoose.Schema({
  userid: String,
  title: String,
  content: String
});

const todolist = (module.exports = mongoose.model('todolist', todolistSchema));
