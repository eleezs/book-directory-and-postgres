const jwt = require('jsonwebtoken');
const config = process.env;

const verifyEmailToken =  (req, res) => {
  const {token} = req.params;
  // Verifing the JWT token 
  jwt.verify(token, config.JWT_SECRET, function(err, decoded) {
      if (err) {
          console.log(err);
          res.send("Email verification failed, possibly the link is invalid or expired");
      }
      else {
        // res.send("Email verifified successfully");
          res.redirect("/api/login");
      }
  });
}

module.exports = verifyEmailToken