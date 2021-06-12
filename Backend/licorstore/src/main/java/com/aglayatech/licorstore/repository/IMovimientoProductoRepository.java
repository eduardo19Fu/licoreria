package com.aglayatech.licorstore.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.aglayatech.licorstore.model.MovimientoProducto;
import com.aglayatech.licorstore.model.Producto;

public interface IMovimientoProductoRepository extends JpaRepository<MovimientoProducto, Long> {
	
	Page<MovimientoProducto> findByProducto(Producto producto, Pageable pageable);

}
