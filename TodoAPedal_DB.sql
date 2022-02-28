CREATE TABLE `usuarios` (
   `id` INT AUTO_INCREMENT,
   `nombre` VARCHAR(255) NOT NULL,
   `apellido` VARCHAR(55) NOT NULL,
   `documento` INT NOT NULL,
   `direccion` VARCHAR(200) NOT NULL,
   `email` VARCHAR(50) NOT NULL,
   `fecha_nacimiento` DATETIME NOT NULL,
   `image` BLOB NOT NULL,
   `contraseña` INT NOT NULL,
   `producto_id` INT NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `productos` (
   `id` INT,
   `name` VARCHAR(255) NOT NULL,
   `discount` INT,
   `price` INT NOT NULL,
   `category` VARCHAR(255) NOT NULL,
   `type` VARCHAR(255) NOT NULL,
   `image` BLOB NOT NULL,
   `description` TEXT NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `ventas` (
   `id` INT,
   `fecha` DATETIME NOT NULL,
   `monto` INT NOT NULL,
   `forma_pago` VARCHAR(255) NOT NULL,
   `id_producto` INT NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `proveedores` (
   `id` INT,
   `nombre` VARCHAR(200) NOT NULL,
   `apellido` VARCHAR(200) NOT NULL,
   `documento` INT NOT NULL,
   `email` VARCHAR(200) NOT NULL,
   `direccion` VARCHAR(200) NOT NULL,
   `product_id` INT,
   `contraseña` INT NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `proveedor_venta` (
   `id_proveedor` INT NOT NULL,
   `venta_id` INT NOT NULL
);


ALTER TABLE `usuarios` ADD CONSTRAINT `FK_33580400-7d58-483a-9305-d2832d261299` FOREIGN KEY (`producto_id`) REFERENCES `productos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `ventas` ADD CONSTRAINT `FK_760fe5b3-d09f-47f6-8bca-1d1c83c2548a` FOREIGN KEY (`id_producto`) REFERENCES `productos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `proveedores` ADD CONSTRAINT `FK_2563d1a6-aaee-4fae-a1e5-21e894f53c0a` FOREIGN KEY (`product_id`) REFERENCES `productos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `proveedor_venta` ADD CONSTRAINT `FK_3a3cee4a-9757-497c-9adc-dd98e50dae3c` FOREIGN KEY (`venta_id`) REFERENCES `ventas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `proveedor_venta` ADD CONSTRAINT `FK_de0bd488-29e7-47e4-bb18-dfaccb3b86fc` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedores`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
