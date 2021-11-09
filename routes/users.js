const express = require('express');
const bcrypt = require('bcrypt');
const usersRouter = express.Router();
const { getAllUsers } = require('../db');
const jwt = require('jsonwebtoken');
const { JWT_SECRET = 'neverTell' } = process.env;
const {
  getUserByUsername,
  createUser,
} = require('../db')

usersRouter.post('/register', async (req, res, next) => {
    console.log('users register')
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
            isAdmin: false
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
            }, JWT_SECRET, {
                expiresIn: '1w'});
            res.send({
                user,
                message: "thank you for signing up",
                token 
                });
        }
    }
  
    } catch ({ name, message }) {
      next({ name, message })
    } 

  });

  usersRouter.post('/login', async (req, res, next) => {
    
    const { username, password } = req.body;
  
    
    if (!username || !password) {
      next({
        name: "MissingCredentialsError",
        message: "Please supply both a username and password"
      });
    }
  
    try {
      const user = await getUserByUsername(username);
      console.log('user: ', user)

      const isMatched = await bcrypt.compare(password, user.password);
  
      if (isMatched) {
        const token = jwt.sign({ 
          id: user.id, 
          username}, 
          JWT_SECRET);
      console.log('token: ', token);
        res.send({ 
            user, 
            message: "you're logged in!", 
            token: token });
      } else {
        next({ 
          name: 'IncorrectCredentialsError', 
          message: 'Username or password is incorrect'
        });
      }
    } catch(error) {
      console.log(error);
      next(error);
    }
  });

module.exports = usersRouter