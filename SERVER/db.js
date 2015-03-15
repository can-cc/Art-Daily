var setting = require('./setting'),
    Db = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server

module.exports = new Db(setting.db_database, 
                        new Server(setting.Db_host, setting.db_port, {}))
