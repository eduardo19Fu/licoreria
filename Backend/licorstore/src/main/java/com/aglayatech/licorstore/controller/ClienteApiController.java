package com.aglayatech.licorstore.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aglayatech.licorstore.model.Cliente;
import com.aglayatech.licorstore.service.IClienteService;

@RestController
@RequestMapping(value = "/clientes")
public class ClienteApiController {

	@Autowired
	private IClienteService serviceCliente;

	@GetMapping(value = "/index")
	public List<Cliente> index() {
		return serviceCliente.findAll();
	}

	@GetMapping(value = "/list/{name}")
	public List<Cliente> findByName(@PathVariable("name") String name) {
		return serviceCliente.findByName(name);
	}

	@GetMapping(value = "/cliente/{id}")
	public ResponseEntity<?> findById(@PathVariable("id") int id) {

		Cliente cliente = null;
		Map<String, Object> response = new HashMap<>();

		try {
			cliente = serviceCliente.findById(id);
		} catch (DataAccessException e) {
			response.put("mensaje", "¡Ha ocurrido un error en la base de datos!");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		if (cliente == null) {
			response.put("mensaje", "¡El cliente con id " + id + " no se encuentra registrado en la base de datos!");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<Cliente>(cliente, HttpStatus.OK);
	}

	@PostMapping(value = "/create")
	public ResponseEntity<?> create(@RequestBody Cliente cliente) {
		
		Cliente newCliente = null;
		Map<String, Object> response = new HashMap<>();
		
		try {
			newCliente = serviceCliente.create(cliente);
		} catch (DataAccessException e) {
			response.put("mensaje", "¡Ha ocurrido un error en la base de datos!");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		if(newCliente == null) {
			response.put("mensaje", "¡No se ha podido registrar el nuevo cliente!");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "¡Cliente registrado con éxito!");
		response.put("cliente", newCliente);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
	
	@PutMapping(value = "/update")
	public ResponseEntity<?> update(@RequestBody Cliente cliente) {
		return null;
	}

}
