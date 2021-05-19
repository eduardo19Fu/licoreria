package com.aglayatech.licorstore.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.aglayatech.licorstore.model.Factura;
import com.aglayatech.licorstore.repository.IFacturaRepository;
import com.aglayatech.licorstore.service.IFacturaService;

@Service
public class FacturaServiceImpl implements IFacturaService {

	@Autowired
	private IFacturaRepository repoFactura;
	
	@Override
	public List<Factura> findAll() {
		return repoFactura.findAll(Sort.by(Direction.ASC, "fecha"));
	}

	@Override
	public Page<Factura> findAll(Pageable pageable) {
		return repoFactura.findAll(pageable);
	}

	@Override
	public Factura findFactura(Long idfactura) {
		return repoFactura.findById(idfactura).orElse(null);
	}

	@Override
	public Factura save(Factura factura) {
		return repoFactura.save(factura);
	}

}
