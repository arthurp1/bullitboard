const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/bulletinboard');
const app = express()
const session = require('express-session')
const Cookies = require('js-cookie')

//middleware
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html')

//models
var User = sequelize.define ('user', {
  user: Sequelize.STRING,
  password: Sequelize.STRING
})

var Message = sequelize.define('message', {
  title: Sequelize.STRING,
  body: Sequelize.STRING
})

Message.hasOne(User)

// Cookies.set('name', { foo: 'bar' });
// Cookies.getJSON('name'); // => { foo: 'bar' }

//routes
app.get('/', (req, res) => {
sequelize
    .sync()
    .then(function(){
      var messages = Message.findAll({ limit: 15})
    .then(function(messages) {
      res.render('index', {posts: messages, status: "Welcome!"})
    })
  })
})

app.get('/form', (req, res) => {
    res.render('form')
})

app.post('/form', (req, res) => {
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

app.get('/login', (req, res) => {
  res.render('login', { error: ""})
})

app.post('/login', (req, res) => {
  console.log(req.body.user)
  console.log(req.body.password)
  sequelize
    .sync()
    .then(function () {
      return User.findOne( { user : req.body.user } )
    })
    .then(function (user) {
      console.log(user.user)
      console.log(user.password)
      if (user) {
        res.render('login', { error: "You are now logged in " } )
      } else if (req.body.password === user.password) {
        res.redirect('form')
      } else {
        res.render('login', { error: "invalid password you dirty hacker"} )
      }
    })
})

app.listen(3000, () => {
    console.log('server started')
})


// standard fill
sequelize.sync({force: true}).then(function () {
    User.create({
      user: 'Arthur',
      password: 'admin'
    })
    Message.create({
      creator: 'Darth Vader',
      title: 'I\'m not your father',
      body: 'Dear Luke, It might sound confusing, but I\'m not your father, but your mum.'
    })
    .then(function() {  console.log('\n\n\n\n\n')})
  })
