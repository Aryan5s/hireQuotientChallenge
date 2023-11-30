const express = require('express');
const { addCommentonPost,  getAllPosts , 
getPost,  deletePost , addPost } = require('../controllers/postControllers');
const router = express.Router();

router.get('/:postId' , getPost);
router.get('/getAllPosts' , getAllPosts)
router.post('/createPost' , addPost)
router.delete('/deletePost' , deletePost)
router.post('/comment' , addCommentonPost)

module.exports = router;