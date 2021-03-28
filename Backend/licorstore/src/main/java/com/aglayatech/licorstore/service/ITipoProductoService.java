package com.aglayatech.licorstore.service;

import java.util.List;

import com.aglayatech.licorstore.model.TipoProducto;

public interface ITipoProductoService {
	
	public List<TipoProducto> findAll();
	
	public List<TipoProducto> findByTipo(String tipo);
	
	public TipoProducto findById(Integer id);
	
	public TipoProducto save(TipoProducto tipo);
	
	public void delete(Integer idtipo);

}
