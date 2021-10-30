const express = require('express');
const usersRouter = express.Router();
const { getAllUsers } = require('../db');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const {
  getUserByUsername,
  createUser,
} = require('../db')

usersRouter.post('/users/register', async (req, res, next) => {
    const { username, password, firstName, lastName, email } = req.body;
  
    try {
      const _user = await getUserByUsername(username);
      if (_user) {
        next({
          name: 'UserExistsError',
          message: 'A user by that username already exists'
        });
      } else if(password.length < 8){
          next({
              name:'Password Length',
              message: 'make it longer, sonny!!'
          })
      } else {

  
        const user = await createUser({
            firstName,
            lastName,
            email,
            username,
            password,
            isAdmin
        });
        if(!user){
            next({
                name:'no user',
                message:'user not found'
            })
        } else {
            const token = jwt.sign({ 
                id: user.id, 
                username
              }, process.env.JWT_SECRET, {
                expiresIn: '1w'});
            res.send({ 
                message: "thank you for signing up",
                token 
                });
        }
    }
  
    } catch ({ name, message }) {
      next({ name, message })
    } 

  });

module.exports = usersRouter