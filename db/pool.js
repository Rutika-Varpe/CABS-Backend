// db/pool.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'CABS',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASS || 'tushar@2003',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: false, // Set to true if you want to see SQL logs
  }
);

module.exports = sequelize;
