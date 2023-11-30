const User = require('../models/userModel');
const uuidValidator = require('uuid-validate')

const getUserDetails = async (req , res) => {
       try{
        if(!uuidValidator(req.params.id)) return res.status(404).json({msg : 'Invalid User Id'})
        const user = await User.find({id : req.params.id});
        if(!user) return res.status(404).json({msg : `No User found with Id : ${req.params.id}`})
        return res.status(200).json({user})
       }catch(error){
          return res.status(404).json({
            error : `error message : ${error.message}`
          })
       }
}

const editProfile = async (req , res) => {
 try {
    const {name , email , password } = req.body;
    const existingUser = await User.find({ email: email } ); //* check if the user with the entered email already exists in the database
    if (!existingUser) {
      return res.status(403).send(`No User with email ${email} exists`);
    }

   
    if (!validateName(name)) {
        return res
          .status(400)
          .send(
            "Error: Invalid user name: name must be longer than two characters and must not include any numbers or special characters"
          );
      }
  
      if (!validateEmail(email)) {
        return res.status(400).send("Error: Invalid email");
      }
  
      if (!validatePassword(password)) {
        return res
          .status(400)
          .send(
            "Error: Invalid password: password must be at least 8 characters long and must include atleast one - one uppercase letter, one lowercase letter, one digit, one special character"
          );
      }

    const updatedUser = await User.updateOne(
        {
            id : req.params.id
        }, {
            name : name,
            email : email,
            password : password
        }
      )
    return res.status(200).json(updatedUser)
 } catch (error) {
    return res.status(404).json({
        error : `Error Message : ${error.message}`
    })
 }
}

module.exports = {
    editProfile,
    getUserDetails
}