module.exports = (sequelize, type, arrendamientos, materialesTienda) => {
    const ArrendamientosMateriales = sequelize.define('arrendamientos_materiales', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        observacion: {
            type: type.STRING,
            allowNull: false
        },
        cantidad: {
            type: type.INTEGER,
            allowNull: false
        },
        precio: {
            type: type.FLOAT,
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

    // relacion con arrendamientos
    ArrendamientosMateriales.belongsTo(arrendamientos, { foreignKey: 'fk_id_arrendamiento', onDelete: 'SET NULL', onUpdate: 'SET NULL' });
    arrendamientos.hasMany(ArrendamientosMateriales, { foreignKey: 'fk_id_arrendamiento', onDelete: 'SET NULL', onUpdate: 'SET NULL' });
    // relacion con materiales por tienda
    ArrendamientosMateriales.belongsTo(materialesTienda, { foreignKey: 'fk_id_material_tienda', onDelete: 'SET NULL', onUpdate: 'SET NULL' });
    materialesTienda.hasMany(ArrendamientosMateriales, { foreignKey: 'fk_id_material_tienda', onDelete: 'SET NULL', onUpdate: 'SET NULL' });

    return ArrendamientosMateriales;
}