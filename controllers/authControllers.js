const {
    validateName,
    validateEmail,
    validatePassword,
  } = require("../utils/validator");
const User = require('../models/userModel')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
  
const registerUser = async(req , res) => {
    try {
        const { name, email, password } = req.body; //* destructuring name, email and password out of the request body

    const existingUser = await User.findOne({ where: { email: email } }); //* check if the user with the entered email already exists in the database
    if (existingUser) {
      return res.status(403).send("User already exists");
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

    const hashedPassword = await bcrypt.hash(password, (saltOrRounds = 10)); //* hashes the password with a salt, generated with the specified number of rounds

    const user = { email, name, password: hashedPassword };
    const createdUser = await User.create(user);

    console.log(createdUser);

    return res
      .status(201)
      .send(
        `Welcome to Devsnest ${createdUser.name}. Thank you for signing up`
      );
    } catch (err) {
        console.log(err);
        return res.status(500).send(`Error: ${err.message}`);
    }
}

const login = async(req , res) => {
    try {
        const { email, password } = req.body; //* destructuring email and password out of the request body

        if (email.length === 0) {
          return res.status(400).send("Error: Please enter your email");
        }
        if (password.length === 0) {
          return res.status(400).send("Error: Please enter your password");
        }
    
        const existingUser = await User.findOne({ email: email } ); //* check if the user with the entered email exists in the database
        console.log(existingUser)     
        if (!existingUser) {
          return res.status(404).send("Error: User not found");
        }
    
        //* hashes the entered password and then compares it to the hashed password stored in the database
        const passwordMatched = await bcrypt.compare(
          password,
          existingUser.password
        );
    
        if (!passwordMatched) {
          return res.status(400).send("Error: Incorrect password");
        }
    
        const payload = { user: { id: existingUser.id } };
        const bearerToken = await jwt.sign(payload, process.env.SECRET, {
          expiresIn: 360000,
        });
    
        res.cookie("t", bearerToken, { expire: '365d' });
    
        console.log("Logged in successfully");
    
        return res.status(200).json({ msg: "Signed-In successfully", bearerToken });
    } catch (err) {
        console.log(err);
        return res.status(500).send(`Error: ${err.message}`);
    }
}

const logout = async(req , res) => {
    res.clearCookie("t");
    return res.status(200).json({ msg: "Signed-Out successfully" });
}

module.exports = {
    registerUser , 
    login , 
    logout
}