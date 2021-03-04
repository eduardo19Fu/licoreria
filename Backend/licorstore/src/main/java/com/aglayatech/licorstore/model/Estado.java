package com.aglayatech.licorstore.model;

import java.io.Serializable;

public class Estado implements Serializable {
	
	private Integer idEstado;
	private String estado;
	
	public Estado() {
		
	}

	public Integer getIdEstado() {
		return idEstado;
	}

	public void setIdEstado(Integer idEstado) {
		this.idEstado = idEstado;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}
	
	private static final long serialVersionUID = 1L;

}
