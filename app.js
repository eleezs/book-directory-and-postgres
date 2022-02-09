const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const morgan = require('morgan'); 
require('dotenv').config();

const signup = require('./routes/registerRoute');
const login = require('./routes/loginRoute');
const verifyEmailToken = require('./middleware/emailJwtVerify');
const auth = require("./middleware/auth");
const proPic = require('./routes/profilePics')

const app = express();

let corsOptions = {
  origin: "http://localhost:3031"
};

app.use(cors(corsOptions));
app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded ({extended: true }));
app.use(express.static(__dirname + '/public'));

app.set('view engine', "ejs");

// connect to db
const sequelize = new Sequelize ( 
  'firstDB', 
  'postgres', 
  process.env.DB_PWD, 
  {
    host: 'localhost',
    dialect: 'postgres'
  }
)
sequelize.authenticate().then(() =>{
  console.log('Database Connected Successfully')
}).catch((error) => {
  console.log('Database Connection Failed', error)
})


app.get('/', (req, res) =>{
  res.render('index')
})

app.get('/api/login', (req, res) =>{
  res.render('login')
});

app.get('/api/userdashboard', auth, (req, res) =>{
  res.render('userDashboard')
});

app.get('/api/admindashboard',  (req, res)=>{
  res.render('adminDashboard')
});



// Register 
app.post('/api/register', signup);
// verify email
app.get('/verifyemail/:token', verifyEmailToken);
// login
app.post('/api/login', login);
// upload profile pics
app.post('/api/profilepic/upload', proPic)










const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{
  console.log(`App is listening on ${PORT}`);
});