module.exports = (sequelize, type, material, tienda, moneda) => {
    const MaterialesTienda = sequelize.define('materiales_tienda', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        dimension: {
            type: type.STRING,
            allowNull: false
        },
        url_imagen: {
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
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    // relacion con materiales
    MaterialesTienda.belongsTo(material, { foreignKey: 'fk_id_material', onDelete: 'SET NULL', onUpdate: 'SET NULL' });
    material.hasMany(MaterialesTienda, { foreignKey: 'fk_id_material', onDelete: 'SET NULL', onUpdate: 'SET NULL' });
    // relacion con tiendas
    MaterialesTienda.belongsTo(tienda, { foreignKey: 'fk_id_tienda', onDelete: 'SET NULL', onUpdate: 'SET NULL' });
    tienda.hasMany(MaterialesTienda, { foreignKey: 'fk_id_tienda', onDelete: 'SET NULL', onUpdate: 'SET NULL' });
    // relacion con monedas
    MaterialesTienda.belongsTo(moneda, { foreignKey: 'fk_id_moneda', onDelete: 'SET NULL', onUpdate: 'SET NULL' });
    moneda.hasMany(MaterialesTienda, { foreignKey: 'fk_id_moneda', onDelete: 'SET NULL', onUpdate: 'SET NULL' });
    
    return MaterialesTienda;
}