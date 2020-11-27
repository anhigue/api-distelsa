module.exports = (sequelize, type) => {
    const TipoUsuarios = sequelize.define('tipo_usuarios', {
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

    return TipoUsuarios;
}