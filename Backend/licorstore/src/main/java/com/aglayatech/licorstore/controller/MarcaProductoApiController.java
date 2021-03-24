package com.aglayatech.licorstore.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aglayatech.licorstore.model.MarcaProducto;
import com.aglayatech.licorstore.service.IMarcaProductoService;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping(value = "/api")
public class MarcaProductoApiController {
	
	@Autowired
	private IMarcaProductoService serviceMarca;
	
	@GetMapping(value = "/marcas")
	public List<MarcaProducto> index(){
		List<MarcaProducto> list = serviceMarca.findAll();
		return list;
	}
	
	@GetMapping(value = "/marcas/{id}")
	public ResponseEntity<?> getById(@PathVariable("id") Integer id) {
		
		MarcaProducto marca = null;
		Map<String, Object> response = new HashMap<>();
		
		try {
			marca = serviceMarca.findById(id);
		} catch (DataAccessException e) {
			response.put("mensaje", "La busqueda en la base de datos no pudo llevarse a cabo!");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		if(marca == null) {
			response.put("mensaje", "¡La marca buscada no se encuentra registrada en la base de datos!");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<MarcaProducto>(marca, HttpStatus.OK);
	}
	
	@PostMapping(value = "/marcas")
	public ResponseEntity<?> create(@RequestBody MarcaProducto marca) {
		
		Map<String, Object> response = new HashMap<>();
		
		try {
			serviceMarca.save(marca);
		} catch(DataAccessException ex) {
			response.put("mensaje", "Ha ocurrido un error en la base de datos!");
			response.put("error", ex.getMessage().concat(": ").concat(ex.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "El Regimen ha sido registrado con éxito!");
		response.put("marca", marca);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
	
	// Controlador que permite actualizar el registro enviado por protocolo Http PUT
	@PutMapping(value = "/marca")
	public ResponseEntity<?> update(@RequestBody MarcaProducto marca){
		
		Map<String, Object> response = new HashMap<>();
		
		try {
			serviceMarca.save(marca);
		} catch(DataAccessException e) {
			response.put("mensaje", "Ha ocurrido un error en la base de datos!");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		if(marca.getIdMarcaProducto() == null) {
			response.put("mensaje", "¡La marca que desea acutualizar no se encuentra registrada en la base de datos!");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		
		response.put("mensaje", "El Regimen ha sido registrado con éxito!");
		response.put("marca", marca);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
	
	@DeleteMapping(value = "/marcas/{id}")
	public MarcaProducto delete(@PathVariable("id") int id) {
		MarcaProducto marca = serviceMarca.findById(id);
		
		serviceMarca.deleteMarca(id);
		return marca;
	}

}
