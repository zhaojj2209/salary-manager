require('dotenv').config();

const pgtools = require('pgtools');

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
  dialectOptions: {
    ssl: false,
  }
}

const config = {
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

console.log('creating db');

pgtools.createdb(config, database, function(err, res) {
  if (err) {
    return;
  }
  console.log(res);
});

const sequelize = new Sequelize(options);

const db = {};
db.name = database;
db.sequelize = sequelize;
db.users = require('./users.model.js')(sequelize, DataTypes);
module.exports = db;