const ORM = this
const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/bulletinboard');
const server = {}

ORM.hello = function () {
  console.log("hello orm-lite works!")
}

ORM.initialize = function () {
   ORM.server = new Sequelize('postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/bulletinboard');

}

ORM.getAll = function (table) {
return table.findAll()
}

ORM.findById = function (table, id) {
return  table.findOne( { user : id } )
}


module.exports = ORM
