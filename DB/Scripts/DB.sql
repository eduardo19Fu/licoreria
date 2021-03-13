-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema licor_db
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `licor_db` ;

-- -----------------------------------------------------
-- Schema licor_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `licor_db` DEFAULT CHARACTER SET utf8 ;
USE `licor_db` ;

-- -----------------------------------------------------
-- Table `licor_db`.`Tipos_Producto`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `licor_db`.`Tipos_Producto` ;

CREATE TABLE IF NOT EXISTS `licor_db`.`Tipos_Producto` (
  `id_tipo_producto` INT NOT NULL AUTO_INCREMENT,
  `tipo_producto` VARCHAR(100) NULL,
  `fecha_registro` TIMESTAMP NULL,
  `id_usuario` INT NULL,
  PRIMARY KEY (`id_tipo_producto`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `licor_db`.`Marcas_Producto`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `licor_db`.`Marcas_Producto` ;

CREATE TABLE IF NOT EXISTS `licor_db`.`Marcas_Producto` (
  `id_marca_producto` INT NOT NULL AUTO_INCREMENT,
  `marca` VARCHAR(100) NOT NULL,
  `fecha_registro` TIMESTAMP NULL,
  `id_usuario` INT NULL,
  PRIMARY KEY (`id_marca_producto`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `licor_db`.`Estados`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `licor_db`.`Estados` ;

CREATE TABLE IF NOT EXISTS `licor_db`.`Estados` (
  `id_estado` INT NOT NULL AUTO_INCREMENT,
  `estado` VARCHAR(75) NULL,
  PRIMARY KEY (`id_estado`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `licor_db`.`Productos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `licor_db`.`Productos` ;

CREATE TABLE IF NOT EXISTS `licor_db`.`Productos` (
  `id_producto` INT NOT NULL AUTO_INCREMENT,
  `cod_producto` VARCHAR(100) NOT NULL,
  `nombre` VARCHAR(100) NOT NULL,
  `id_tipo_producto` INT NULL,
  `id_marca_producto` INT NULL,
  `precio_compra` DECIMAL(10,2) NULL,
  `precio_venta` DECIMAL(10,2) NOT NULL,
  `porcentaje_ganancia` FLOAT NOT NULL,
  `fecha_vencimiento` DATE NULL,
  `id_estado` INT NULL,
  `stock` INT NOT NULL,
  PRIMARY KEY (`id_producto`),
  CONSTRAINT `fk_producto_idtipo`
    FOREIGN KEY (`id_tipo_producto`)
    REFERENCES `licor_db`.`Tipos_Producto` (`id_tipo_producto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_producto_idmarca`
    FOREIGN KEY (`id_marca_producto`)
    REFERENCES `licor_db`.`Marcas_Producto` (`id_marca_producto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_producto_idestado`
    FOREIGN KEY (`id_estado`)
    REFERENCES `licor_db`.`Estados` (`id_estado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_producto_idtipo_idx` ON `licor_db`.`Productos` (`id_tipo_producto` ASC);

CREATE INDEX `fk_producto_idmarca_idx` ON `licor_db`.`Productos` (`id_marca_producto` ASC);

CREATE INDEX `fk_producto_idestado_idx` ON `licor_db`.`Productos` (`id_estado` ASC);


-- -----------------------------------------------------
-- Table `licor_db`.`Usuarios`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `licor_db`.`Usuarios` ;

CREATE TABLE IF NOT EXISTS `licor_db`.`Usuarios` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `usuario` VARCHAR(50) NULL,
  `password` VARCHAR(500) NULL,
  `primer_nombre` VARCHAR(50) NULL,
  `segundo_nombre` VARCHAR(50) NULL,
  `apellido` VARCHAR(100) NULL,
  `id_estado` INT NULL,
  PRIMARY KEY (`id_usuario`),
  CONSTRAINT `fk_usuarios_idestado`
    FOREIGN KEY (`id_estado`)
    REFERENCES `licor_db`.`Estados` (`id_estado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_usuarios_idestado_idx` ON `licor_db`.`Usuarios` (`id_estado` ASC);


-- -----------------------------------------------------
-- Table `licor_db`.`Clientes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `licor_db`.`Clientes` ;

CREATE TABLE IF NOT EXISTS `licor_db`.`Clientes` (
  `id_cliente` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(300) NOT NULL,
  `nit` VARCHAR(45) NULL,
  `direccion` VARCHAR(500) NULL,
  `fecha_registro` TIMESTAMP NULL,
  PRIMARY KEY (`id_cliente`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `nit_UNIQUE` ON `licor_db`.`Clientes` (`nit` ASC);


-- -----------------------------------------------------
-- Table `licor_db`.`Ventas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `licor_db`.`Ventas` ;

CREATE TABLE IF NOT EXISTS `licor_db`.`Ventas` (
  `id_venta` INT NOT NULL AUTO_INCREMENT,
  `no_factura` VARCHAR(50) NULL,
  `total` DECIMAL(10,2) NULL,
  `fecha` TIMESTAMP NOT NULL,
  `id_usuario` INT NULL,
  `id_estado` INT NULL,
  `id_cliente` INT NULL,
  PRIMARY KEY (`id_venta`),
  CONSTRAINT `fk_ventas_idestado`
    FOREIGN KEY (`id_estado`)
    REFERENCES `licor_db`.`Estados` (`id_estado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ventas_idusuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `licor_db`.`Usuarios` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ventas_idcliente`
    FOREIGN KEY (`id_cliente`)
    REFERENCES `licor_db`.`Clientes` (`id_cliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_ventas_idestado_idx` ON `licor_db`.`Ventas` (`id_estado` ASC);

CREATE INDEX `fk_ventas_idusuario_idx` ON `licor_db`.`Ventas` (`id_usuario` ASC);

CREATE INDEX `fk_ventas_idcliente_idx` ON `licor_db`.`Ventas` (`id_cliente` ASC);


-- -----------------------------------------------------
-- Table `licor_db`.`Detalles_Venta`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `licor_db`.`Detalles_Venta` ;

CREATE TABLE IF NOT EXISTS `licor_db`.`Detalles_Venta` (
  `id_detalle` INT NOT NULL AUTO_INCREMENT,
  `id_producto` INT NULL,
  `id_venta` INT NULL,
  `sub_total` DECIMAL(10,2) NULL,
  PRIMARY KEY (`id_detalle`),
  CONSTRAINT `fk_detalles_idproducto`
    FOREIGN KEY (`id_producto`)
    REFERENCES `licor_db`.`Productos` (`id_producto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_detalles_idventa`
    FOREIGN KEY (`id_venta`)
    REFERENCES `licor_db`.`Ventas` (`id_venta`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_detalles_idproducto_idx` ON `licor_db`.`Detalles_Venta` (`id_producto` ASC);

CREATE INDEX `fk_detalles_idventa_idx` ON `licor_db`.`Detalles_Venta` (`id_venta` ASC);


-- -----------------------------------------------------
-- Table `licor_db`.`Pefiles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `licor_db`.`Pefiles` ;

CREATE TABLE IF NOT EXISTS `licor_db`.`Pefiles` (
  `id_perfil` INT NOT NULL AUTO_INCREMENT,
  `perfil` VARCHAR(100) NULL,
  PRIMARY KEY (`id_perfil`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `licor_db`.`Usuarios_Perfiles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `licor_db`.`Usuarios_Perfiles` ;

CREATE TABLE IF NOT EXISTS `licor_db`.`Usuarios_Perfiles` (
  `id_usuario` INT NOT NULL,
  `id_perfil` INT NOT NULL,
  PRIMARY KEY (`id_usuario`, `id_perfil`),
  CONSTRAINT `fk_usuarios_perfil_idusuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `licor_db`.`Usuarios` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuarios_perfil_idperfil`
    FOREIGN KEY (`id_perfil`)
    REFERENCES `licor_db`.`Pefiles` (`id_perfil`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_usuarios_perfil_idperfil_idx` ON `licor_db`.`Usuarios_Perfiles` (`id_perfil` ASC);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
