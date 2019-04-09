const config = require('config')

const Sequelize = require('sequelize')
const sequelize = new Sequelize(
  config.get('database'),
  config.get('user'),
  config.get('password'),
  {
    host: config.get('host'),
    dialect: 'mysql'
  }
)

exports.sequelize = sequelize
