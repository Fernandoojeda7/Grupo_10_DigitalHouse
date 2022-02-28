module.exports = (sequelize, dataTypes) => {
    let alias = "Producto";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING,
            allNull: false
        },
        discount: {
            type: dataTypes.INTEGER,
            
        },
        price: {
            type: dataTypes.INTEGER,
            allNull: false
        },
        category: {
            type: dataTypes.STRING,
            allNull: false
        },
        type: {
            type: dataTypes.STRING,
            allNull: false
        },
        image: {
            type: dataTypes.BLOB,
            allNull: false
        },
        description: {
            type: dataTypes.TEXT,
            allNull: false}
        
    };
    let config = {
        tableName: "productos",
        timestamps: false
    }


    const Producto = sequelize.define(alias, cols, config);

    Producto.associate = function (models) {
        Producto.belongsTo(models.Usuario, { 
            as: "usuario",
            foreignKey: "producto_id"
        })
        
        Producto.belongsTo(models.Venta, { 
            as: "venta",
            foreignKey: "id_producto"
            })
       
        Producto.belongsTo(models.Proveedor, { 
        as: "proveedor",
        foreignKey: "product_id"
            })
        }
    return Producto;

}