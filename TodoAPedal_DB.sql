CREATE TABLE `usuarios` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `nombre` VARCHAR(255) NOT NULL,
   `apellido` VARCHAR(55) NOT NULL,
   `documento` INT NOT NULL,
   `direccion` VARCHAR(200) NOT NULL,
   `email` VARCHAR(50) NOT NULL,
   `fecha_nacimiento` DATETIME NOT NULL,
   `image` BLOB NOT NULL,
   `contraseña` TEXT NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `productos` (
   `id` INT NOT NULL AUTO_INCREMENT,
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
   `id` INT NOT NULL AUTO_INCREMENT,
   `fecha` DATETIME NOT NULL,
   `monto` INT NOT NULL,
   `forma_pago` VARCHAR(255) NOT NULL,
   `id_producto` INT NOT NULL,
   `id_usuario` INT NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `proveedores` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `nombre` VARCHAR(200) NOT NULL,
   `apellido` VARCHAR(200) NOT NULL,
   `documento` INT NOT NULL,
   `email` VARCHAR(200) NOT NULL,
   `direccion` VARCHAR(200) NOT NULL,
   `contraseña` TEXT NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `proveedor_venta` (
   `id_proveedor` INT NOT NULL,
   `venta_id` INT NOT NULL
  
);

CREATE TABLE `producto_proveedor` (
   `producto_id` INT NOT NULL,
   `proveedor_id` INT NOT NULL

);


ALTER TABLE `ventas` ADD CONSTRAINT `FK_760fe5b3-d09f-47f6-8bca-1d1c83c2548a` FOREIGN KEY (`id_producto`) REFERENCES `productos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `ventas` ADD CONSTRAINT `FK_8322534e-d146-436a-85a1-3392717615e8` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ;

ALTER TABLE `proveedor_venta` ADD CONSTRAINT `FK_3a3cee4a-9757-497c-9adc-dd98e50dae3c` FOREIGN KEY (`venta_id`) REFERENCES `ventas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `proveedor_venta` ADD CONSTRAINT `FK_de0bd488-29e7-47e4-bb18-dfaccb3b86fc` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedores`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `producto_proveedor` ADD CONSTRAINT `FK_b659a192-ef95-4fcb-ad72-229a3dde215c` FOREIGN KEY (`producto_id`) REFERENCES `productos`(`id`)  ;

ALTER TABLE `producto_proveedor` ADD CONSTRAINT `FK_a470e2dc-2e88-433d-a10a-e5ada0a61c0f` FOREIGN KEY (`proveedor_id`) REFERENCES `proveedores`(`id`)  ;
