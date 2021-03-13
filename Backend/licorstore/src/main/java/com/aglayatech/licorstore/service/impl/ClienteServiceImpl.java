package com.aglayatech.licorstore.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.aglayatech.licorstore.model.Cliente;
import com.aglayatech.licorstore.repository.IClienteRepository;
import com.aglayatech.licorstore.service.IClienteService;

@Service
public class ClienteServiceImpl implements IClienteService {

	@Autowired
	private IClienteRepository repoCliente;
	
	@Override
	public List<Cliente> findAll() {
		return repoCliente.findAll(Sort.by(Direction.ASC, "nombre"));
	}
	
	@Override
	public Cliente findById(Integer idcliente) {
		Optional<Cliente> optional = repoCliente.findById(idcliente);
		if(optional.isPresent())
			return optional.get();
		else
			return null;
	}

	@Override
	public List<Cliente> findByName(String nombre) {
		return repoCliente.findByNombre(nombre);
	}

	@Override
	public Cliente findByNit(String nit) {
		return repoCliente.findByNit(nit);
	}

	@Override
	public Cliente create(Cliente cliente) {
		return repoCliente.save(cliente);
	}

	@Override
	public Cliente update(Cliente cliente) {
		return repoCliente.save(cliente);
	}

}
