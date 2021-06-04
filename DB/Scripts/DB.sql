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
  `precio_venta` DECIMAL(10,2) NULL,
  `porcentaje_ganancia` FLOAT NULL,
  `fecha_ingreso` DATE NULL,
  `fecha_vencimiento` DATE NULL,
  `id_estado` INT NULL,
  `stock` INT NOT NULL,
  `imagen` VARCHAR(500) NULL,
  `fecha_registro` TIMESTAMP NULL,
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
  `estado` TINYINT NULL,
  `fecha_registro` TIMESTAMP NULL,
  PRIMARY KEY (`id_usuario`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `licor_db`.`Clientes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `licor_db`.`Clientes` ;

CREATE TABLE IF NOT EXISTS `licor_db`.`Clientes` (
  `id_cliente` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(300) NOT NULL,
  `nit` VARCHAR(45) NULL,
  `direccion` VARCHAR(500) NOT NULL,
  `fecha_registro` TIMESTAMP NULL,
  PRIMARY KEY (`id_cliente`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `nit_UNIQUE` ON `licor_db`.`Clientes` (`nit` ASC);


-- -----------------------------------------------------
-- Table `licor_db`.`Facturas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `licor_db`.`Facturas` ;

CREATE TABLE IF NOT EXISTS `licor_db`.`Facturas` (
  `id_factura` BIGINT NOT NULL AUTO_INCREMENT,
  `no_factura` BIGINT NULL,
  `serie` TEXT NULL,
  `total` DECIMAL(10,2) NULL,
  `fecha` TIMESTAMP NULL,
  `id_usuario` INT NULL,
  `id_estado` INT NULL,
  `id_cliente` INT NULL,
  PRIMARY KEY (`id_factura`),
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
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE INDEX `fk_ventas_idestado_idx` ON `licor_db`.`Facturas` (`id_estado` ASC);

CREATE INDEX `fk_ventas_idusuario_idx` ON `licor_db`.`Facturas` (`id_usuario` ASC);

CREATE INDEX `fk_ventas_idcliente_idx` ON `licor_db`.`Facturas` (`id_cliente` ASC);


-- -----------------------------------------------------
-- Table `licor_db`.`Facturas_Detalle`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `licor_db`.`Facturas_Detalle` ;

CREATE TABLE IF NOT EXISTS `licor_db`.`Facturas_Detalle` (
  `id_detalle` BIGINT NOT NULL AUTO_INCREMENT,
  `id_producto` INT NULL,
  `id_factura` BIGINT NULL,
  `cantidad` INT NULL,
  `sub_total` DECIMAL(10,2) NULL,
  PRIMARY KEY (`id_detalle`),
  CONSTRAINT `fk_detalles_fac_idproducto`
    FOREIGN KEY (`id_producto`)
    REFERENCES `licor_db`.`Productos` (`id_producto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_detalles_fac_idfactura`
    FOREIGN KEY (`id_factura`)
    REFERENCES `licor_db`.`Facturas` (`id_factura`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_detalles_idproducto_idx` ON `licor_db`.`Facturas_Detalle` (`id_producto` ASC);

CREATE INDEX `fk_detalles_idventa_idx` ON `licor_db`.`Facturas_Detalle` (`id_factura` ASC);


-- -----------------------------------------------------
-- Table `licor_db`.`Roles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `licor_db`.`Roles` ;

CREATE TABLE IF NOT EXISTS `licor_db`.`Roles` (
  `id_role` INT NOT NULL AUTO_INCREMENT,
  `role` VARCHAR(100) NULL,
  PRIMARY KEY (`id_role`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `licor_db`.`Usuarios_Roles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `licor_db`.`Usuarios_Roles` ;

CREATE TABLE IF NOT EXISTS `licor_db`.`Usuarios_Roles` (
  `id_usuario` INT NOT NULL,
  `id_role` INT NOT NULL,
  PRIMARY KEY (`id_usuario`, `id_role`),
  CONSTRAINT `fk_usuarios_perfil_idusuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `licor_db`.`Usuarios` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuarios_perfil_idperfil`
    FOREIGN KEY (`id_role`)
    REFERENCES `licor_db`.`Roles` (`id_role`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_usuarios_perfil_idperfil_idx` ON `licor_db`.`Usuarios_Roles` (`id_role` ASC);


-- -----------------------------------------------------
-- Table `licor_db`.`Historico`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `licor_db`.`Historico` ;

CREATE TABLE IF NOT EXISTS `licor_db`.`Historico` (
  `id_registro` INT NOT NULL AUTO_INCREMENT,
  `no_factura` INT NULL,
  `cliente` VARCHAR(100) NULL,
  `nit` VARCHAR(45) NULL,
  `fecha_eliminacion` TIMESTAMP NULL,
  `fecha_venta` TIMESTAMP NULL,
  `usuario` VARCHAR(200) NULL,
  PRIMARY KEY (`id_registro`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `licor_db`.`Correlativos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `licor_db`.`Correlativos` ;

CREATE TABLE IF NOT EXISTS `licor_db`.`Correlativos` (
  `id_correlativo` INT NOT NULL AUTO_INCREMENT,
  `correlativo_inicial` BIGINT NULL,
  `correlativo_final` BIGINT NULL,
  `correlativo_actual` BIGINT NULL,
  `id_estado` INT NULL,
  `id_usuario` INT NULL,
  `fecha_creacion` TIMESTAMP NULL,
  PRIMARY KEY (`id_correlativo`),
  CONSTRAINT `fk_correlativos_idestado`
    FOREIGN KEY (`id_estado`)
    REFERENCES `licor_db`.`Estados` (`id_estado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_correlativos_idusuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `licor_db`.`Usuarios` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_correlativos_idestado_idx` ON `licor_db`.`Correlativos` (`id_estado` ASC);

CREATE INDEX `fk_correlativos_idusuario_idx` ON `licor_db`.`Correlativos` (`id_usuario` ASC);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
