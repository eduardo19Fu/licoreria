package com.aglayatech.licorstore.service;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.aglayatech.licorstore.model.MovimientoProducto;
import com.aglayatech.licorstore.model.Producto;

public interface IMovimientoProductoService {
	
	public List<MovimientoProducto> findAll();
	
	public List<MovimientoProducto> findByFecha(Date fechaIni, Date fechaFin);
	
	public Page<MovimientoProducto> findAll(Pageable pageble);
	
	public Page<MovimientoProducto> findProductoMoves(Producto producto, Pageable pageable);
	
	public MovimientoProducto save(MovimientoProducto movimientoProducto);
}
