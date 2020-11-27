module.exports = (sequelize, type) => {
    const Monedas = sequelize.define('monedas', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        moneda: {
            type: type.STRING,
            allowNull: false
        },
        iso: {
            type: type.STRING,
            allowNull: false            
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    return Monedas;
}