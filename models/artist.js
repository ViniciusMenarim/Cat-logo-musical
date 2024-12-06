const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Artist = sequelize.define('Artist', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'O nome do artista não pode ser vazio.' },
    },
  },
}, {
  tableName: 'artists',
  timestamps: true,
});

module.exports = Artist;
