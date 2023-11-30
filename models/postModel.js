const mongoose = require('mongoose');
const {v4 : uuidv4} = require('uuid')

const postSchema = new mongoose.Schema({
  id: { type: String, default : uuidv4 },
  title: { type: String, required: true },
  desc: { type: String, required: true },
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User" },
  created_at: { type: Date, default: Date.now },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  likes: { type: Number, default: 0 },
  likedBy : {type : mongoose.Schema.Types.ObjectId , ref : "User"}
});

module.exports = mongoose.model('Post', postSchema);