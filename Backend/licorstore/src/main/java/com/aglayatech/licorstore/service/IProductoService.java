package com.aglayatech.licorstore.service;

import java.util.List;

import com.aglayatech.licorstore.model.Producto;

public interface IProductoService {
	
	public List<Producto> findAll();
	
	public List<Producto> findByName(String name);
	
	public Producto findById(Integer idproducto);
	
	public Producto create(Producto producto);
	
	public Producto update(Producto producto);

}
