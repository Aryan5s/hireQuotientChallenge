const express = require('express');
const router = express.Router();
const authenticatedUser = require('../middlewares/auth')
const {
    getUserDetails ,
    editProfile
} = require('../controllers/userControllers')

router.get('/:id' , authenticatedUser, getUserDetails);
router.put('/:id/editProfile' ,  authenticatedUser , editProfile)

module.exports = router;