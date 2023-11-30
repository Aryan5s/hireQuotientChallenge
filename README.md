# hireQuotientChallenge
## Problem Statement :
Develop a robust and scalable Node.js backend using MongoDB as your database.

## Requirements : 
- User Authentication: Implement a secure login/logout system.
- MongoDB Integration: Use MongoDB for data storage. Demonstrate how to perform CRUD (Create, Read, Update, Delete) operations.
- API Development: Create RESTful APIs for the following functionalities:
- User Profile Management: Allow users to create, view, and edit their profiles.
- Post Creation and Retrieval: Enable users to create posts and retrieve them.
- Commenting System: Users should be able to comment on posts.
- Error Handling: Implement comprehensive error handling and logging.
- Documentation: Provide clear documentation on the setup and usage of your backend.

## Evaluation Criteria : 
- Code quality, readability, and efficiency.
- Scalability and performance of the solution.
- Security measures and best practices in Node.js and MongoDB integration.
- Completeness and clarity of documentation.

## Running the Code Locally :
- Clone the Project :
  ```
  https://github.com/Aryan5s/hireQuotientChallenge.git
  ```
- Install Dependencies :
  ```
  npm install
  ```
- Run The Server :
  ```
  npm start
  ```
  The server will be running on localhost:5000

## Tech Stack :
- NodeJs , ExpressJS , MongoDB
- Testing - Postman / ThunderClient

## Features : 
- Create User
- Get User Details
- Edit User Profile
- Add Post
- Get Single Post
- Get All Posts
- Delete Post
- Add Comment on Post
***Make sure you are using correct Bearer Token for all the requests.***

## ENV Variables : 
- PORT
- MONGODB_URI
- JWT_SECRET

## Authentication EndPoints : 
```
POST /api/v1/auth/register - Used to Register a New User 
POST /api/v1/auth/login - Used to Login already Registered User
POST /api/v1/auth/logout - Used to Logout Users
```
- REGISTER USER :
Register takes a POST request with Three parameters name, email, password and gives you the newly created User
```
{_id : Sample Object ID,
email : Sample Email,
password : Sample Password
name : Sample Name,
id : Sample UUID }
```
- Login User :
Login takes a POST request with Two parameters email, password and gives you message : success and the bearer token in respone
```
{message : 'success',
bearerToken : bearerToken
}
```
- Logout User :
Clears the cookie (bearer token) and logs out the user, gives a JSON Response as :
```   
{ msg: "Signed-Out successfully" }
```
## User Endpoints : 
