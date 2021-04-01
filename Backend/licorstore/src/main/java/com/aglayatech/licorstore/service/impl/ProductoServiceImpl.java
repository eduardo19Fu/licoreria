package com.aglayatech.licorstore.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
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
	public List<Producto> findByName(String name) {
		return repoProducto.findByNombre(name);
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
