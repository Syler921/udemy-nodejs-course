const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', '159753258', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
