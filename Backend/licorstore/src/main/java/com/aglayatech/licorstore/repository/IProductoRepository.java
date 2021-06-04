package com.aglayatech.licorstore.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.aglayatech.licorstore.model.Producto;

public interface IProductoRepository extends JpaRepository<Producto, Integer> {
	
	// Filtra los productos por nombre y devuelve un listado con las coincidencias
	// select * from Producto where nombre = /*valor ingresado por usuario*/
	List<Producto> findByNombreContaining(String nombre);
	
	@Query("select p from Producto p where p.codProducto = :codigo")
	Optional<Producto> findByCodigo(@Param("codigo") String codigo);

}
