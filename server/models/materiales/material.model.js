module.exports = (sequelize, type, tipoMateriales) => {
    const Materiales = sequelize.define('materiales', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        material: {
            type: type.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    Materiales.belongsTo(tipoMateriales, {
        foreignKey: 'fk_id_tipo_material',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    });

    tipoMateriales.hasMany(Materiales, {
        foreignKey: 'fk_id_tipo_material',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    });

    return Materiales;
}