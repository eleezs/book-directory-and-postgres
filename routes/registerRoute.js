const express = require('express');
const router = express.Router();
const models = require('../models');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
// const {pool} = require('../config/dbConfig')

router.post('/api/register', async(req, res) => {
  let {name, email, role, password} = req.body;
  console.log(name, email, role, password);

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
  try {
    let oldUser = await models.user.findOne({where: {'email': email} })
    if(oldUser){
      errors.push({message: 'Email already exist. Try Login'})
      return res.render('index', {errors})
    }
      // create user
    // hash password
   
    let hashedPassword = await bcrypt.hash(req.body.password, 10);

    let user = await models.user.create({
      name: name.toUpperCase(),
      email: email.toLowerCase(),
      role: role,
      password: hashedPassword
    });
    res.json({message: 'Register successful'})
     
    let transporter = nodemailer.createTransport({
      host: 'smtp.mail.yahoo.com',
      port: 587,
      secure: false, // upgrade later with STARTTLS
      auth: {
        user: 'spiritcat@yahoo.com',
        pass: process.env.MAIL_PWD,
      },
      tls: {
        rejectUnauthorized:false
      }
    });

    // let payload = {
    //   email: req.body.email
    // }
    const token = jwt.sign({data: 'Token data'}, process.env.JWT_SECRET,{
      expiresIn: '1h'
    });

    const data = 
  `
    <h3>Email Verification</h3>
    <h4>Dear ${req.body.name}</h4>
    <p>Welcome to Uche's Book Store</p>
    <p>Your login details are as follows:
      <ul>
        <li>Username: ${req.body.email} </li>
        <li> Password: ${req.body.password}</li>
      </ul>
      Kindly Verify your Email
      <a href="http://localhost:3000/verifyemail/${token}"> Click here to Verify your Email</a><br>
      Thank you.<br>
      Management.
      </p>
  `;

    const mailOptions = {
      from: '"Book Directory Management" <spiritcat@yahoo.com>', // sender address
      to: req.body.email, // list of receivers
      subject: 'Account Creation and Activation', // Subject line
      html: data, // plain text body
    }

    transporter.sendMail(mailOptions, (error, info) =>{
      if (error) console.log(error);
      console.log('Email Sent Successfully');
      console.log(info); 
    })
  }
  catch(err) {
    res.status(500).send({
      message: err.message
    })
  }
});


module.exports =router