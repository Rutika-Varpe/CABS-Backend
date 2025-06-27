// db/pool.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // Supabase requires this
        },
      },
      logging: false, // Show SQL queries if needed
    })
  : new Sequelize(
      process.env.DB_NAME || 'CABS',
      process.env.DB_USER || 'postgres',
      process.env.DB_PASS || 'tushar@2003',
      {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres',
        dialectOptions: process.env.DB_SSL === 'true' ? {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          }
        } : {},
        logging: false,
      }
    );

module.exports = sequelize;
