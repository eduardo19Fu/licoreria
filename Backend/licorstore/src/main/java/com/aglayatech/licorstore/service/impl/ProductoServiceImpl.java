package com.aglayatech.licorstore.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.aglayatech.licorstore.model.Producto;
import com.aglayatech.licorstore.repository.IProductoRepository;
import com.aglayatech.licorstore.service.IProductoService;

@Service
public class ProductoServiceImpl implements IProductoService {

	@Autowired
	private IProductoRepository repoProducto;

	@Override
	public List<Producto> findAll() {
		return repoProducto.findAll(Sort.by(Direction.ASC, "nombre"));
	}

	@Override
	public Page<Producto> findAll(Pageable pageable) {
		return repoProducto.findAll(pageable);
	}

	@Override
	public List<Producto> findByName(String name) {
		return repoProducto.findByNombre(name);
	}

	@Override
	public Producto findByCodigo(String codigo) {
		return repoProducto.findByCodigo(codigo).orElse(null);
	}

	@Override
	public Producto findById(Integer idproducto) {
		return repoProducto.findById(idproducto).orElse(null);
	}

	@Override
	public Producto save(Producto producto) {
		return repoProducto.save(producto);
	}

	@Override
	public void delete(Integer idproducto) {
		repoProducto.deleteById(idproducto);
	}

}
