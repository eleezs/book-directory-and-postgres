const express = require('express');
const router = express.Router();
const models = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// const auth = require("../middleware/auth");

router.post('/api/login', async(req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    // validate input
    let errors =[];

    if(!email || !password){
      errors.push({message: "Please input all fields"});
    }
    if(errors.length > 0 ){
      return res.render('login', {errors});
    }
    const user = await models.users.findOne({where: {"email" :email}})
    if(user == null){
      errors.push({message: 'Invalid Crenditials'})
    }
    if(errors.length > 0 ){
      return res.render('login', {errors});
    }
    let validatePassword = bcrypt.compare(password, user.password)
    if(!validatePassword){
      errors.push({message: 'Invalid Crenditials'})
    }
    if(errors.length > 0 ){
      return res.render('login', {errors});
    }
    let payload= {
      id: user.id,
      email: email,
      name: user.name
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET,{
      expiresIn: '1h'
    });
    console.log(token)
    const user_role = await user.role;
    const username = await user.name;
    if(user_role == 'User'){
      // res.header('x-auth-token', token).send("login successfully");
      res.header('x-auth-token', token).render('userDashboard', {user: username})
    }
    else{
      // res.header('x-auth-token', token).send("login successfully");
      res.header('x-auth-token', token).render('adminDashboard', {user: username})
    }
    
  }catch (err){
    console.log(err)
  }
});

module.exports = router