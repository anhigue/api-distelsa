module.exports = (sequelize, type) => {
    const Proveedores = sequelize.define('proveedores', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        proveedor: {
            type: type.STRING,
            allowNull: false
        },
        estado: {
            type: type.BOOLEAN,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    return Proveedores;
}