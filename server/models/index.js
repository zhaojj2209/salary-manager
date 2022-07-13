require('dotenv').config();

const env = process.env.NODE_ENV || 'development';

const database = env ==='production'
  ? process.env.DB_NAME
  : env ==='test'
    ? process.env.TEST_DB_NAME
    : process.env.DEV_DB_NAME;

const { Sequelize, DataTypes } = require('sequelize');

const options = {
  database,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dialect: 'postgres',
};

const sequelize = new Sequelize(options);

const db = {};
db.name = database;
db.sequelize = sequelize;
db.users = require('./users.model.js')(sequelize, DataTypes);
module.exports = db;