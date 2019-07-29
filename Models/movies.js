'use strict'

var mysql = require('mysql'),
    myConnection = require('express-myconnection'),
    dbOption = {
        host: 'localhost',
        user: 'root',
        password: '',
        port: 3306,
        database: 'movies'        
    },
    Movies = myConnection(mysql, dbOption, 'request')

module.exports = Movies


