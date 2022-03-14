module.exports = (sequelize, dataTypes) => {
    let alias = "Venta";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        fecha: {
            type: dataTypes.DATE,
            allowNull: false
        },
        monto: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        forma_pago: {
            type: dataTypes.STRING,
            allowNull: false
        },
        id_producto: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    };
    let config = {
        tableName: "ventas",
        timestamps: false
    }


    const Venta = sequelize.define(alias, cols, config);

    Venta.associate = function (models) {
        Venta.belongsTo(models.Producto, { 
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