package com.aglayatech.licorstore.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.aglayatech.licorstore.model.TipoProducto;
import com.aglayatech.licorstore.repository.ITipoProductoRepository;
import com.aglayatech.licorstore.service.ITipoProductoService;

@Service
public class TipoProductoServiceImpl implements ITipoProductoService {

	@Autowired
	private ITipoProductoRepository repoTipo;
	
	@Override
	public List<TipoProducto> findAll() {
		return repoTipo.findAll(Sort.by(Direction.ASC, "id_tipo_producto"));
	}

	@Override
	public List<TipoProducto> findByTipo(String tipo) {
		return repoTipo.findByTipoProducto(tipo);
	}

	@Override
	public TipoProducto findById(Integer id) {
		Optional<TipoProducto> optional = repoTipo.findById(id);
		if(optional.isPresent())
			return optional.get();
		else
			return null;
	}

	@Override
	public TipoProducto create(TipoProducto tipo) {
		return repoTipo.save(tipo);
	}

	@Override
	public TipoProducto update(TipoProducto tipo) {
		return repoTipo.save(tipo);
	}

}
