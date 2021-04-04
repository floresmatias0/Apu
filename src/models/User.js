const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("user", {
    id:{
      type: DataTypes.STRING(255),
      primaryKey: true,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
    },
    refresToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password_virtual:{
      type: DataTypes.VIRTUAL,
      allowNull: false,
      validate: {
        len:{
          args: [6,30],
          msg: 'invalid password'
        }
      }
    },
    rol: {
      type: DataTypes.ENUM("admin", "client"),
      defaultValue:"client"
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        isEmail:{
          msg: 'invalid email'
        }
      }
    },
    resetCode: {
      type: DataTypes.STRING,
      unique: true
  },
  });
};
