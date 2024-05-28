const sequelize = require('sequelize');
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('planet', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isDestroyed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    }, { timestamps: false }
    );
};