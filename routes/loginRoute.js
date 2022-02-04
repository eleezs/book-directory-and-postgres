const express = require('express');
const router = express.Router();
const models = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
      return res.render('index', {errors});
    }
    const user = await models.user.findOne({where: {"email" :email}})
    if(user == null){
      errors.push({message: 'Invalid Crenditials'})
    }
    if(errors.length > 0 ){
      return res.render('index', {errors});
    }
    let validatePassword = bcrypt.compare(password, user.password)
    if(!validatePassword){
      errors.push({message: 'Invalid Crenditials'})
    }
    if(errors.length > 0 ){
      return res.render('index', {errors});
    }
    let payload= {
      email: req.email,
      password: req.password
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET,{
      expiresIn: '1h'
    });
    console.log(token)
    const user_role = await user.role;
    if(user_role == 'User'){
      // res.send("login successfully");
      res.redirect('/api/userDashboard')
    }
    else{
      // res.send("login successfully");
      res.redirect('/api/adminDashboard')
    }
    
  }catch (err){
    console.log(err)
  }
});

module.exports = router