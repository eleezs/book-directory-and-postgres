const jwt = require("jsonwebtoken");
const config = process.env;

const verifyToken = (req, res, next) => {
  try{
  const authHeader = req.headers['x-auth-token'];

  if (authHeader) {
    const token = authHeader;
    jwt.verify(token, config.JWT_SECRET, (err, user) =>{
      if (err) {
        return res.status(401).send("Invalid Token");
      }
      console.log(user)
      // req.user = user;
    next()
    }); 
  }else {
    res.status(401).send('A token is required')
  }
  } catch (err) {
    // return res.status(401).send(err.message)
    console.log(err)
  }
};

module.exports = verifyToken;