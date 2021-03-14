package com.aglayatech.licorstore.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aglayatech.licorstore.service.IProductoService;

@RestController
@RequestMapping(value = "/productos")
public class ProductoApiController {
	
	@Autowired
	private IProductoService serviceProducto;
	
	

}
