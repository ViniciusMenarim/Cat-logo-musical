const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('music_catalog', 'root', 'your_password', {
  host: '127.0.0.1', 
  port: 3306, 
  dialect: 'mysql',
  logging: false,
});

sequelize
  .authenticate()
  .then(() => console.log('Conexão com o banco de dados estabelecida com sucesso.'))
  .catch(err => console.error('Erro ao conectar ao banco de dados:', err));

module.exports = sequelize;
