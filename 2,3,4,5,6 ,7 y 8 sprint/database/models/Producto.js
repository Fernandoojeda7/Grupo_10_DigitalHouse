module.exports = (sequelize, dataTypes) => {
    let alias = "Producto";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        discount: {
            type: dataTypes.STRING,
            
        },
        price: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        category: {
            type: dataTypes.STRING,
            allNull: false
        },
        type: {
            type: dataTypes.STRING,
            allowNull: false
        },
        image: {
            type: dataTypes.STRING,
            allowNull: false
        },
        description: {
            type: dataTypes.TEXT,
            allowNull: false
        }
        
    };
    let config = {
        tableName: "productos",
        timestamps: false
    }


    const Producto = sequelize.define(alias, cols, config);

    Producto.associate = function (models) {
        Producto.hasMany(models.Venta, { 
            as: "venta",
            foreignKey: "id_producto"
            })
       
      
        Producto.belongsToMany(models.Proveedor, { 
            as: "proveedores",
            through: 'producto_proveedor',
            foreignKey: 'producto_id',
            otherKey: 'proveedor_id',
            timestamps: false
            })
            
        }
    return Producto

}