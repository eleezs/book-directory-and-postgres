const express = require('express')
const multer = require('multer');
const router = express.Router();
const jwt = require('jsonwebtoken');
const models = require('../models');

const imageUpload = multer({
  dest: './public/data/uploads/' 
})

//upload images
router.post('/api/profilepic/upload', imageUpload.single('profilepics'), async (req, res) => {
  try{
    const { filename, mimetype } = req.file;
    const filepath = req.file.path + req.file.originalname;
    // res.send('successful')
    console.log(filepath);

    const authHeader = req.headers['x-auth-token'];
    if (authHeader) {
      const token = authHeader;
      console.log(token)
      jwt.verify(token, process.env.JWT_SECRET, async (err, user) =>{
        if (err) {
          console.log(err)
          // return res.status(403).send("Invalid Token");
        }
        // console.log(user)
        // Fetch the user by id 
        let userId = user.id;
        const username = user.name;
        console.log(userId);
        try{
          // Do something with the user
        await models.profilePics.create({
          id: userId,
          filename,
          filepath,
          mimetype
        })
        return res.status(200).render('userDashboard', {user: username});
        }catch (err){
          console.log(err)
        }
        
        
          
        
      });
    }

  }
  catch(err){
    console.log(err)
  }
  });
module.exports = router
