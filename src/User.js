const Sequelize = require('sequelize')
const sequelize = require('./Database').sequelize

const User = sequelize.define('User', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ip: {
    type: Sequelize.STRING(16),
    allowNull: false
  },
  firstConnect: {
    type: Sequelize.DATE,
    default: new Date(),
    allowNull: false
  },
  lastConnect: {
    type: Sequelize.DATE,
    allowNull: false
  },
  connectCount: {
    type: Sequelize.INTEGER,
    default: 1,
    allowNull: false
  }
}, {
  timestamps: false,
  freezeTableName: true
})

exports.model = User
