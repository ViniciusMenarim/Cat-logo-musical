const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Genre = sequelize.define('Genre', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'O nome do gênero não pode ser vazio.' },
    },
  },
}, {
  tableName: 'genres',
  timestamps: true,
});

module.exports = Genre;
