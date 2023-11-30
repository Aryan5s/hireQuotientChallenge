const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const CommentSchema = new mongoose.Schema({
  id : {type : String , default : uuidv4},
  comment: {type: String,required: true},
  post: {type: mongoose.Schema.Types.ObjectId,ref: "Post",},
  createdBy:{type:String,ref:'User'},
  createdByUserId:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
  createdAt: { type: Date,default: Date.now,},
});

module.exports = mongoose.model("Comment", CommentSchema);