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
    allowNull: false
  },
  lastConnect: {
    type: Sequelize.DATE,
    allowNull: false
  },
  connectCount: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false,
  freezeTableName: true
})

User.connect = function (ip) {
  return this.findOne({
    where: { ip }
  })
  .then(user => {
    let currentDate = new Date().toLocaleString()
    if (user) {
      return this.update({
        lastConnect: currentDate,
        connectCount: Sequelize.literal('connectCount + 1')
      }, {
        where: { ip }
      })
    } else {
      return this.create({
        ip,
        firstConnect: currentDate,
        lastConnect: currentDate,
        connectCount: 1
      })
    }
  })
}

exports.model = User
