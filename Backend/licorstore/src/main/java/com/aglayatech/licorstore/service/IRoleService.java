package com.aglayatech.licorstore.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.aglayatech.licorstore.model.Role;

public interface IRoleService {
	
	public List<Role> findAll();
	
	public Page<Role> findAll(Pageable pageable);
	
	public Role findById(Integer id);
	
	public Role save(Role role);

}
