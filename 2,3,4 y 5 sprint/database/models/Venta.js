module.exports = (sequelize, dataTypes) => {
    let alias = "Venta";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fecha_nacimiento: {
            type: dataTypes.DATA,
            allNull: false
        },
        monto: {
            type: dataTypes.INTEGER,
            allNull: false
        },
        forma_pago: {
            type: dataTypes.STRING,
            allNull: false
        },
        id_usuario: {
            type: dataTypes.INTEGER,
            foreingKey: true,
            references: {
                model: Usuario,
                key: "id"
            },
            allNull: false
        },
        id_producto: {
            type: dataTypes.INTEGER,
            allNull: false
        }
    };
    let config = {
        tableName: "ventas",
        timestamps: false
    }


    const Venta = sequelize.define(alias, cols, config);

    Venta.associate = function (models) {
        Venta.hasMany(models.Producto, { 
        as: "producto",
        foreignKey: "id_producto"
        })

    Venta.belongsToMany(models.Proveedor, {
        as: "proveedores",
        through: 'proveedor_venta',
        foreignKey: 'venta_id',
        otherKey: 'id_proveedor',
        timestamps: false
        })

}

    return Venta;

}