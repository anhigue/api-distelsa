module.exports = (sequelize, type, tipoUsuarios) => {
    const Usuarios = sequelize.define('usuarios', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: type.STRING,
            allowNull: false
        },
        apellido: {
            type: type.STRING,
            allowNull: false
        },
        correo: {
            type: type.STRING,
            allowNull: false
        },
        password: {
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

    Usuarios.belongsTo(tipoUsuarios, {
        foreignKey: 'fk_id_tipo_usuario',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    });

    tipoUsuarios.hasMany(Usuarios, {
        foreignKey: 'fk_id_tipo_usuario',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    });

    return Usuarios;
}