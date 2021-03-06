const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('categories', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
          },
          description: {
            type: DataTypes.TEXT,
            allowNull: false
          }
    },{
        timestamps: false
    });
};
