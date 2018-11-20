const Sequelize = require('sequelize')
const db = require('../db')

const Game = db.define('game', {
  board_data: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

module.exports = Game
