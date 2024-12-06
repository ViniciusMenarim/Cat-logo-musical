const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Album = sequelize.define('Album', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'O título não pode ser vazio.' },
    },
  },
  releaseYear: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: { msg: 'O ano de lançamento deve ser um número inteiro.' },
    },
  },
  cover: {
    type: DataTypes.STRING,
    allowNull: true, 
    validate: {
      isUrl: { msg: 'A capa deve ser uma URL válida.' },
    },
  },
}, {
  tableName: 'albums', 
  timestamps: true, 
});

module.exports = Album;
