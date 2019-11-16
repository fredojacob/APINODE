'use strict'

//var mysql = require('mysql'),
 //   myConnection = require('express-myconnection'),
  //  dbOption = {
    //    host: 'localhost',
      //  user: 'root',
      //  password: '',
      //  port: 3306,
      //  database: 'movies'        
  //  },
    //Movies = myConnection(mysql, dbOption, 'request')

//module.exports = Movies

var mysql = require('mysql'),
    myConnection = require('express-myconnection'),
    dbOption = {
        host: 'movies.cel1kwzf8knb.us-east-1.rds.amazonaws.com',
        user: 'admin',
        password: '46le9map7',
        port: 3306,
        database: 'seminario'        
    },
    Movies = myConnection(mysql, dbOption, 'request')

module.exports = Movies


