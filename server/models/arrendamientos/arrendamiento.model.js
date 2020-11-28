module.exports = (sequelize, type, estados, usuarios, proveedor, moneda) => {
    const Arrendamientos = sequelize.define('arrendamientos', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fecha_inicio: {
            type: type.DATE,
            allowNull: false
        },
        fecha_fin: {
            type: type.DATE,
            allowNull: false
        },
        fecha: {
            type: type.DATE,
            allowNull: false
        },
        total: {
            type: type.FLOAT,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    // relacion con estados
    Arrendamientos.belongsTo(estados, { foreignKey: 'fk_id_estado', onDelete: 'SET NULL', onUpdate: 'SET NULL' });
    estados.hasMany(Arrendamientos, { foreignKey: 'fk_id_estado', onDelete: 'SET NULL', onUpdate: 'SET NULL' });
    // relacion con usuarios
    Arrendamientos.belongsTo(usuarios, { foreignKey: 'fk_id_usuario', onDelete: 'SET NULL', onUpdate: 'SET NULL' });
    usuarios.hasMany(Arrendamientos, { foreignKey: 'fk_id_usuario', onDelete: 'SET NULL', onUpdate: 'SET NULL' });
    // relacion con proveedores
    Arrendamientos.belongsTo(proveedor, { foreignKey: 'fk_id_proveedor', onDelete: 'SET NULL', onUpdate: 'SET NULL' });
    proveedor.hasMany(Arrendamientos, { foreignKey: 'fk_id_proveedor', onDelete: 'SET NULL', onUpdate: 'SET NULL' });
    // relacion con monedas
    Arrendamientos.belongsTo(moneda, { foreignKey: 'fk_id_moneda', onDelete: 'SET NULL', onUpdate: 'SET NULL' });
    moneda.hasMany(Arrendamientos, { foreignKey: 'fk_id_moneda', onDelete: 'SET NULL', onUpdate: 'SET NULL' });

    return Arrendamientos;
}