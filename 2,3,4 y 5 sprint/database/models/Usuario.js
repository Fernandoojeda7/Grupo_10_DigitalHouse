module.exports = (sequelize, dataTypes) => {
    let alias = "Usuario";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING,
            allNull: false
        },
        apeliido: {
            type: dataTypes.STRING,
            allNull: false
        },
        documento: {
            type: dataTypes.INTEGER,
            allNull: false
        },
        direccion: {
            type: dataTypes.STRING,
            allNull: false
        },
        email: {
            type: dataTypes.STRING,
            allNull: false
        },
        fecha_nacimiento: {
            type: dataTypes.DATA,
            allNull: false
        },
        image: {
            type: dataTypes.BLOB,
            allNull: false
        },
        contraseña: {
            type: dataTypes.STRING,
            allNull: false
        },
        producto_id: {
            type: dataTypes.INTEGER,
            foreingKey: true,
            references: {
                model: Producto,
                key: "id"
            },
            allNull: false
        }
    };
    let config = {
        tableName: "usuarios",
        timestamps: false
    }


    const Usuario = sequelize.define(alias, cols, config);

    Usuario.associate = function (models) {
        Usuario.hasMany(models.Producto, { 
            as: "producto",
            foreignKey: "producto_id"
        })
        }

    return Usuario;

}