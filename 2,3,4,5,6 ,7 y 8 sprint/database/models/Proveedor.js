module.exports = (sequelize, dataTypes) => {
    let alias = "Proveedor";
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
            allowNull: false
        },
        direccion: {
            type: dataTypes.STRING,
            allowNull: false
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false
        },
        contraseña: {
            type: dataTypes.TEXT,
            allowNull: false
        },
        
    };
    let config = {
        tableName: "proveedores",
        timestamps: false
    }


    const Proveedor = sequelize.define(alias, cols, config);

    Proveedor.associate = function (models) {
    Proveedor.belongsToMany(models.Venta, { 
        as: "ventas",
        through: 'proveedor_venta',
        foreignKey: 'id_proveedor',
        otherKey: 'venta_id',
        timestamps: false
        })
    

    Proveedor.belongsToMany(models.Producto, {
        as: "productos",
        through: 'producto_proveedor',
        foreignKey: 'proveedor_id',
        otherKey: 'producto_id',
        timestamps: false
        })
    }
    return Proveedor;

}