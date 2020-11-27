module.exports = (sequelize, type) => {
    const Tiendas = sequelize.define('tiendas', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        codigo: {
            type: type.STRING,
            allowNull: false
        },
        nombre: {
            type: type.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    return Tiendas;
}