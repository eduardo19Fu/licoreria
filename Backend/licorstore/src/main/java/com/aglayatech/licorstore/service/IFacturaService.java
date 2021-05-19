package com.aglayatech.licorstore.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.aglayatech.licorstore.model.Factura;

public interface IFacturaService {
	
	public List<Factura> findAll();
	
	public Page<Factura> findAll(Pageable pageable);
	
	public Factura findFactura(Long idfactura);
	
	public Factura save(Factura factura);

}
