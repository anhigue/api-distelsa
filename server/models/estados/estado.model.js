module.exports = (sequelize, type) => {
    const Estados = sequelize.define('estados', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        estado: {
            type: type.STRING
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    return Estados;
}