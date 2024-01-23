const sequelize = require('sequelize');
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('planets', {
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
    }, { timestamps: false }
    );
};