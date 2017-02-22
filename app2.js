const express = require('express')
const bodyParser = require('body-parser')
// const pg = require('pg')
const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/bulletinboard');
const app = express()

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


var Message = sequelize.define('message', {
  creator: Sequelize.STRING,
  title: Sequelize.STRING,
  body: Sequelize.STRING
});

app.get('/', (req, res) => {
sequelize
    .sync()
    .then(function(){
      var messages = Message.findAll({ limit: 15})
    .then(function(messages) {
      res.render('index', {posts: messages, status: ""})
    })
  })
})

app.get('/form', (req, res) => {
    res.render('form')
})

app.post('/', (req, res) => {
sequelize
    .sync()
    .then( () => {
      Message.create({
        creator: req.body.creator,
        title: req.body.title,
        body: req.body.body
        })
      })
    .then(function () {
      return Message.findAll()
    })
    .then(function(messages) {
      console.log(messages)
      res.render('index', {posts: messages, status: "Your message has been posted"})
    })
})

app.get('/signup', (req, res) => {
  res.render('signup')
})

app.post('/signup', (req, res) => {
  sequelize
    .sync()
    .then( () => {
      User.create({
        title,
        body
      })
    })
})

app.listen(3000, () => {
    console.log('server started')
})
