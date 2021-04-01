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

import com.aglayatech.licorstore.model.Producto;
import com.aglayatech.licorstore.service.IProductoService;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping(value = "/api")
public class ProductoApiController {
	
	@Autowired
	private IProductoService serviceProducto;
	
	@GetMapping(value = "/productos")
	public List<Producto> index(){
		return serviceProducto.findAll();
	}
	
	@GetMapping(value = "/productos/{id}")
	public ResponseEntity<?> findById(@PathVariable("id") int idproducto){
		
		Producto producto = null;
		Map<String, Object> response = new HashMap<>();
		
		try {
			producto = serviceProducto.findById(idproducto);
		} catch (DataAccessException e) {
			response.put("mensaje", "¡Ha ocurrido un error en la base de datos!");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		if(producto == null) {
			response.put("mensaje", "¡El producto buscado no se encuentra registrado en la base de datos!");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<Producto>(producto, HttpStatus.OK);
	}
	
	@PostMapping(value = "/productos")
	public ResponseEntity<?> create(@RequestBody Producto producto){
		
		Producto newProducto = null;
		Map<String, Object> response = new HashMap<>();
		
		try {
			newProducto = serviceProducto.save(producto);
		} catch (DataAccessException e) {
			response.put("mensaje", "¡Ha ocurrido un error en la base de datos!");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		if(newProducto == null) {
			response.put("mensaje", "¡El producto no pudo ser registrado!");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "¡Producto registrado con éxito!");
		response.put("producto", newProducto);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
	
	@PutMapping(value = "/productos")
	public ResponseEntity<?> update(@RequestBody Producto producto){
		
		Producto productoUpdated = null;
		Map<String, Object> response = new HashMap<>();
		
		if(producto == null) {
			response.put("mensaje", "¡El producto no existe en la base de datos!");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		
		try {
			productoUpdated = serviceProducto.save(producto);
		} catch (DataAccessException e) {
			response.put("mensaje", "¡Ha ocurrido un error en la base de datos!");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "¡El producto ha sido actualizado con éxito!");
		response.put("producto", productoUpdated);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
	
	@DeleteMapping(value = "/productos/{id}")
	public ResponseEntity<?> delete(@PathVariable("id") Integer idproducto) {
		
		Map<String, Object> response = new HashMap<>();
		
		try {
			serviceProducto.delete(idproducto);
		} catch (DataAccessException e) {
			response.put("mensaje", "¡Ha ocurrido un error en la base de datos!");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "¡El producto ha sido eliminado con éxito!");
		
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
	}

}
