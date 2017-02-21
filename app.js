// BullitinBoard

const express = require('express')
const bodyParser = require('body-parser')
const pg = require('pg')
const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/bulletinboard');
const connectionString = 'postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/bulletinboard';
const app = express()

app.set('views', __dirname + '/views')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))


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
      res.render('index', {posts: messages})
    })
  })
})

app.get('/form', (req, res) => {
    res.render('form')
})

app.post('/form', (req, res) => {
  console.log('form input: ' + req.body.firstname + ' ' + req.body.title + ' is coming through')
sequelize
    .sync()
    .then( () => {
      Message.create({
        creator: req.body.firstname,
        title: req.body.title,
        body: req.body.body
        })
      })
    .then( () => {
      Message.findAll()
      })
    .then( (messages) => {
      console.log(messages)
      res.send(messages)
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
