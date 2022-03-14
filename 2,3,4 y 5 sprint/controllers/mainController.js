const Producto = require('../database/models/Producto');
const db = require('../database/models');
const Productos = db.Producto;

const controller = {
	index: (req, res) => {
		db.Producto.findAll()
		.then(function(productos) {
			res.render('index', {productos})
		}).catch(error => res.send(error))
	},
	
};

module.exports = controller;
