package com.aglayatech.licorstore.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.aglayatech.licorstore.model.Producto;

public interface IProductoService {
	
	public List<Producto> findAll();
	
	public Page<Producto> findAll(Pageable pageable);
	
	public List<Producto> findByName(String name);
	
	public Producto findByCodigo(String codigo);
	
	public Producto findById(Integer idproducto);
	
	public Producto save(Producto producto);
	
	public void delete(Integer idproducto);

}
