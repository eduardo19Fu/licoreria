package com.aglayatech.licorstore.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.aglayatech.licorstore.model.MovimientoProducto;
import com.aglayatech.licorstore.model.Producto;
import com.aglayatech.licorstore.repository.IMovimientoProductoRepository;
import com.aglayatech.licorstore.service.IMovimientoProductoService;

@Service
public class MovimientoProductoServiceImpl implements IMovimientoProductoService {

	@Autowired
	private IMovimientoProductoRepository repoMovimiento;
	
	@Override
	public List<MovimientoProducto> findAll() {
		return repoMovimiento.findAll();
	}

	@Override
	public Page<MovimientoProducto> findAll(Pageable pageble) {
		return repoMovimiento.findAll(pageble);
	}

	@Override
	public Page<MovimientoProducto> findProductoMoves(Producto producto, Pageable pageable) {
		return repoMovimiento.findByProducto(producto, pageable);
	}

	@Override
	public MovimientoProducto save(MovimientoProducto movimientoProducto) {
		return repoMovimiento.save(movimientoProducto);
	}

}
