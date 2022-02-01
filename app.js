const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const { pool } = require('./config/dbConfig')
const Sequelize = require('sequelize');
require('dotenv').config();

const signup = require('./routes/registerRoute')

const app = express();

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

app.get('/api/userdashboard', (req, res) =>{
  res.render('userDashboard', {user: "Uche"});
});

app.get('/api/admindashboard', (req, res)=>{
  res.render('adminDashboard', {user: "Admin"});
});

// Register 
app.post('/api/register', signup)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{
  console.log(`App is listening on ${PORT}`);
});