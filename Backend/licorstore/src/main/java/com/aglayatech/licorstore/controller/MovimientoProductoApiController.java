package com.aglayatech.licorstore.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aglayatech.licorstore.model.MovimientoProducto;
import com.aglayatech.licorstore.model.Producto;
import com.aglayatech.licorstore.service.IMovimientoProductoService;
import com.aglayatech.licorstore.service.IProductoService;

@CrossOrigin({ "http://localhost:4200" })
@RestController
@RequestMapping(value = "/api")
public class MovimientoProductoApiController {

	@Autowired
	private IMovimientoProductoService serviceMove;
	
	@Autowired
	private IProductoService serviceProducto;

	@GetMapping(value = "/movimientos")
	public List<MovimientoProducto> index() {
		return this.serviceMove.findAll();
	}
	
	@GetMapping(value = "/movimientos/{idproducto}/{page}")
	public Page<MovimientoProducto> getByProducto(@PathVariable("idproducto") Integer idProducto, @PathVariable("page") Integer page){
		Producto producto = serviceProducto.findById(idProducto);
		return serviceMove.findProductoMoves(producto, PageRequest.of(page, 4));
	}

	@Secured({"ROLE_ADMIN", "ROLE_INVENTARIO"})
	@PostMapping(value = "/movimientos")
	public ResponseEntity<?> create(@RequestBody MovimientoProducto movimientoProducto, BindingResult result) {
		
		MovimientoProducto newMovimiento = null;
		// Producto producto = null;
		Map<String, Object> response = new HashMap<>();
		
		if(result.hasErrors()) {
			// tratamiento de errores
			List<String> errors = result.getFieldErrors().stream()
					.map(err -> "El campo '".concat(err.getField().concat("' ")).concat(err.getDefaultMessage()))
					.collect(Collectors.toList());
	
			response.put("errors", errors);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}
		
		try {
			newMovimiento = serviceMove.save(movimientoProducto);
			// producto = serviceProducto.findById(newMovimiento.getProducto().getIdProducto());
			
			newMovimiento.calcularStock();
			serviceProducto.save(newMovimiento.getProducto());
		} catch (DataAccessException e) {
			response.put("mensaje", "¡Error en la Base de Datos!");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "¡El movimiento ha sido creado con éxito!");
		response.put("movimientoProducto", newMovimiento);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
		
	}

}
