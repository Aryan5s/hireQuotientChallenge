const Post = require('../models/postModel');
const Comment = require('../models/commentModel');
const { v4: uuidv4 } = require('uuid');
const validate = require('uuid-validate');

const addPost = async(req , res) => {
    try {
        const {title , description} = req.body;
        console.log(req.user)
        const postDetails = {
          id : uuidv4(),
          title : title,
          desc : description,
          user : req.user._id,
          created_at : Date.now(),
          comments : [],
          likes : 0,
          likedBy : []
        }

        const newPost = new Post(postDetails);
        await newPost.save();
        return res.status(200).json({post : newPost})
    } catch (error) {
        console.log(error);
        return res.status(500).json({err : error.message})
    }
}

const deletePost = async(req , res) => {
    try {
        const postId = req.params.id;
        if(!validate(id)) return res.status(404).json({msg : `Invalid Post Id : ${postId}`})
        const deletedPost = await Post.findByIdAndDelete(postId);
        if(!deletedPost) return res.status(404).json({msg : `No Post Found`});
        return res.status(200).json(deletedPost);
    } catch (error) {
        console.log(error);
        return res.status(500).json({err : error.message})
    }
}

const addCommentonPost = async(req , res) => {
    try {
        if(!validate(req.params.id)) return res.status(404).json({msg : 'Invalid Post Id'})
        const {comment} = req.body;
        const post = await Post.findById(req.params.id);
        if(!post) return res.status(404).json({msg : `No Post Found with Id : ${req.params.id}`});
        const commentDetails = {
            id : uuidv4(),
            comment : comment,
            post : post._id,
            createdBy : req.user.name,
            createdByUserId : req.user._id,
            createdAt : Date.now()
        }

        const newComment = new Comment(commentDetails);
        await Comment.save(newComment);
        post.comments.push(newComment);

        return res.status(200).json({commentId : commentDetails.id})
    } catch (error) {
        console.log(error);
        return res.status(500).json({err : error.message});
    }
}

const getPost = async(req , res) => {
    try {
        if(!validate(req.params.id)) return res.status(404).json({msg : 'Invalid Post Id'})
        const post = await Post.findById(req.params.id);
        if(!post) return res.status(404).json({msg : `No Post found with Id : ${req.params.id}`})
        return res.status(200).json({post})
    } catch (error) {
        console.log(error);
        return res.status(500).json({err : error.message})
    }
}

const getAllPosts = async(req , res) => {
    try {
    const userId = req.user._id;
    const posts = await Post.find({ user :  userId}).sort({ created_at: -1 });
    if(posts.length === 0) return res.status(404).json({msg : `No Post found by user ${req.user.name}`})

    const formattedPosts = posts.map(post => ({
      id: post.id,
      title: post.title,
      desc: post.desc,
      created_at: post.created_at,
      comments: post.comments,
      likes: post.likes
    }));

    res.staus(200).json(formattedPosts);
    } catch (error) {
        console.log(error);
        return res.status(500).json({err : error.message});
    }
}

module.exports = {
    addPost,
    deletePost,
    addCommentonPost,
    getPost,
    getAllPosts
}