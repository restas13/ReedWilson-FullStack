const Sequelize = require('sequelize');

require('dotenv').config();

const sequelize = process.env.JAWSDB_URL ? new Sequelize(process.env.JAWSDB_URL) : new Sequelize(process.env.DBNAME, process.env.USER, process.env.PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    port: 32306
});

module.exports = sequelize;