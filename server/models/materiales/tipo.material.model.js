module.exports = (sequelize, type) => {
    const TipoMateriales = sequelize.define('tipo_materiales', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tipo: {
            type: type.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    return TipoMateriales;
}