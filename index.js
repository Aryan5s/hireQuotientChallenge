const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const connectDB = require('./config/dbConnect')
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')
app.use(express.urlencoded({extended : false}))
app.use(express.json())

app.use('/api/v1/auth' , authRoutes)
app.use('/api/v1/user' , userRoutes)
app.use('/api/v1/posts' , postRoutes)

app.listen(PORT , () => {
    connectDB();
    console.log(`Server is Running on Port : ${PORT}`)
})