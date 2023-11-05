const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelizeInst = new Sequelize(process.env['database'],
    process.env['user'],
    process.env['password'], {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelizeInst;