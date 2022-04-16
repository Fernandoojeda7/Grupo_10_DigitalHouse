module.exports = (sequelize, dataTypes) => {
    let alias = "Usuario";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING,
            allowNull: false
        },
        apellido: {
            type: dataTypes.STRING,
            allowNull: false
        },
        documento: {
            type: dataTypes.INTEGER,
            allNull: false
        },
        direccion: {
            type: dataTypes.STRING,
            allowNull: false
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false
        },
        fecha_nacimiento: {
            type: dataTypes.DATE,
            allowNull: false,
        },
        image: {
            type: dataTypes.BLOB,
            allowNull: false
        },
        contraseña: {
            type: dataTypes.TEXT,
            allowNull: false
        },
    };
    let config = {
        tableName: "usuarios",
        timestamps: false
    }

    const Usuario = sequelize.define(alias, cols, config);

    Usuario.associate = function (models) {
        Usuario.hasMany(models.Venta, { 
            as: "venta",
            foreignKey: "id_usuario"
        })
        }

    return Usuario;

}