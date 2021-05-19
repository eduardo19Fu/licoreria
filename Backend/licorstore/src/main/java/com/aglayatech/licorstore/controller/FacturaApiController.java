package com.aglayatech.licorstore.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aglayatech.licorstore.model.Factura;
import com.aglayatech.licorstore.service.IFacturaService;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping(value = {"/api"})
public class FacturaApiController {
	
	@Autowired
	private IFacturaService serviceFactura;
	
	@GetMapping(value = "/facturas")
	public List<Factura> index(){
		return this.serviceFactura.findAll();
	}
	
	@GetMapping(value = "/facturas/page/{page}")
	public Page<Factura> index(@PathVariable("page") Integer page){
		return this.serviceFactura.findAll(PageRequest.of(page, 5));
	}
	
	@GetMapping(value = "/facturas/{id}")
	public ResponseEntity<?> showFactura(@PathVariable("id") Long idfactura){
		
		Factura factura = null;
		Map<String, Object> response = new HashMap<>();
		
		try {
			factura = serviceFactura.findFactura(idfactura);
		} catch (DataAccessException e) {
			response.put("mensaje", "¡Error en la base de datos!");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		if(factura == null) {
			response.put("mensaje", "¡La factura con id ".concat(idfactura.toString()).concat(" no existe en la base de datos!"));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<Factura>(factura, HttpStatus.OK);
	}
}
