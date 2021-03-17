package com.aglayatech.licorstore.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.aglayatech.licorstore.model.MarcaProducto;
import com.aglayatech.licorstore.repository.IMarcaProductoRepository;
import com.aglayatech.licorstore.service.IMarcaProductoService;

@Service
public class MarcaProductoServiceImpl implements IMarcaProductoService {
	
	@Autowired
	private IMarcaProductoRepository marcaProductoRepo;

	@Override
	public List<MarcaProducto> findAll() {
		return marcaProductoRepo.findAll(Sort.by(Direction.ASC, "marca"));
	}

	@Override
	public MarcaProducto findById(Integer idMarca) {
		Optional<MarcaProducto> optional = marcaProductoRepo.findById(idMarca);
		if(optional.isPresent())
			return optional.get();
		else
			return null;
	}

	@Override
	public List<MarcaProducto> findByMarca(String marca) {
		return marcaProductoRepo.findByMarca(marca);
	}

	@Override
	public MarcaProducto createMarca(MarcaProducto marca) {
		return marcaProductoRepo.save(marca);
	}

	@Override
	public MarcaProducto updateMarca(MarcaProducto marca) {
		return marcaProductoRepo.save(marca);
	}

	@Override
	public void deleteMarca(Integer idMarca) {
		marcaProductoRepo.deleteById(idMarca);
	}

}
