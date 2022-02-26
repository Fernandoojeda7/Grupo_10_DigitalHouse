CREATE TABLE `usuarios` (
   `id` INT AUTO_INCREMENT,
   `nombre` VARCHAR(50) NOT NULL,
   `apellido` VARCHAR(55) NOT NULL,
   `documento` INT NOT NULL,
   `direccion` VARCHAR(200) NOT NULL,
   `email` VARCHAR(50) NOT NULL,
   `fecha_nacimiento` DATETIME NOT NULL,
   `image` BLOB NOT NULL,
   `contraseña` INT NOT NULL,
   `productos_id` INT NOT NULL,
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
   `id_usuario` INT NOT NULL,
   `id_producto` INT NOT NULL,
   PRIMARY KEY (`id`)
);


ALTER TABLE `usuarios` ADD CONSTRAINT `FK_33580400-7d58-483a-9305-d2832d261299` FOREIGN KEY (`productos_id`) REFERENCES `productos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `ventas` ADD CONSTRAINT `FK_e6152e63-29e6-42d9-84a3-1d8bd55f86e1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `ventas` ADD CONSTRAINT `FK_760fe5b3-d09f-47f6-8bca-1d1c83c2548a` FOREIGN KEY (`id_producto`) REFERENCES `productos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
