const express = require('express');
const router = express.Router();
const models = require('../models');
const bcrypt = require('bcrypt')
const {pool} = require('../config/dbConfig')

router.post('/api/register', async(req, res) => {
  let {name, email, role, password} = req.body;
  password = password.toString()
  // console.log(name, email, role, password);

  let errors =[];

  if(!name || !email || !role || !password) {
    errors.push({message: "Please enter all field"});
  }
  if(password.length < 8) {
    errors.push({message: 'Password must be 8 character and above'})
  }

  if(errors.length > 0 ){
   return res.render('index', {errors});
  }
  let oldUser = await models.user.findOne({where: {'email': email} })
  if(oldUser){
    errors.push({message: 'Email already exist. Try Login'})
    res.render('index')
  }
    // create user
    // hash password
    try {
      let hashedPassword = await bcrypt.hash(req.body.password, 10);

    
      let user = await models.user.create({
        name: name.toUpperCase(),
        email: email.toLowerCase(),
        role: role,
        password: hashedPassword
      });
      if (user.role === "User"){
        res.render('userDashboard')
      }
      
    }
    catch(err) {
      res.status(500).send({
        message: err.message
      })
   }
  
  
});


module.exports =router