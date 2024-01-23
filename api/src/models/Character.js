const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('characters', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ki: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        maxKi: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        affiliation: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        originPlanet: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        created: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
          },
    }, { timestamps: false }
    );
};