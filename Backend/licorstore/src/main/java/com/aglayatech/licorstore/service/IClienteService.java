package com.aglayatech.licorstore.service;

import java.util.List;

import com.aglayatech.licorstore.model.Cliente;

public interface IClienteService {
	
	public List<Cliente> findAll();
	
	public Cliente findById(Integer idcliente);
	
	public List<Cliente> findByName(String nombre);
	
	public Cliente findByNit(String nit);
	
	public Cliente save(Cliente cliente);
	
	public void delete(Integer idcliente);
	
}
