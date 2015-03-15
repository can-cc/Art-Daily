var setting = require('./setting'),
    redis = require('redis')

module.exports = redis.createClient(setting.db_port,
                                    setting.db_host,
                                    setting.db_options)










