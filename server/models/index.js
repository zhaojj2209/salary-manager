require('dotenv').config();

const env = process.env.NODE_ENV || 'development';

const database = env ==='production'
  ? process.env.DATABASE
  : env ==='test'
    ? process.env.TEST_DATABASE
    : process.env.DEV_DATABASE;

const { Sequelize, DataTypes } = require('sequelize');
const options = {
  database,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  dialect: 'postgres',
}

const sequelize = new Sequelize(options);

const db = {};
db.name = database;
db.sequelize = sequelize;
db.users = require("./users.model.js")(sequelize, DataTypes);
module.exports = db;