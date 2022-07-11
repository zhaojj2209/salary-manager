module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("users", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salary: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0
      }
    },
  });
  return Users;
};