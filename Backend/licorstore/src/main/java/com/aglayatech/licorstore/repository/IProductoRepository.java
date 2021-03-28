package com.aglayatech.licorstore.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aglayatech.licorstore.model.Producto;

public interface IProductoRepository extends JpaRepository<Producto, Integer> {
	
	// Filtra los productos por nombre y devuelve un listado con las coincidencias
	// select * from Producto where nombre = /*valor ingresado por usuario*/
	List<Producto> findByNombre(String nombre);

}
