package com.aglayatech.licorstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.aglayatech.licorstore.model.Usuario;

public interface IUsuarioRepository extends JpaRepository<Usuario, Integer> {
	
	public Usuario findByUsuario(String usuario);
	
	@Query("select u from Usuario u where u.usuario = ?1")
	public Usuario findByUsuario2(String usuario);

}
