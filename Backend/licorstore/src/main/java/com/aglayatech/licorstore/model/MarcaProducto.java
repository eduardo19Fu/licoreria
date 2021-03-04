package com.aglayatech.licorstore.model;

import java.io.Serializable;
import java.util.Date;

public class MarcaProducto implements Serializable {

	private Integer idMarcaProducto;
	private String marca;
	private Date fechaRegistro;
	private Integer idUsuario = null;

	public MarcaProducto() {
		// Constructor;
	}

	public Integer getIdMarcaProducto() {
		return idMarcaProducto;
	}

	public void setIdMarcaProducto(Integer idMarcaProducto) {
		this.idMarcaProducto = idMarcaProducto;
	}

	public String getMarca() {
		return marca;
	}

	public void setMarca(String marca) {
		this.marca = marca;
	}

	public Date getFechaRegistro() {
		return fechaRegistro;
	}

	public void setFechaRegistro(Date fechaRegistro) {
		this.fechaRegistro = fechaRegistro;
	}

	public Integer getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(Integer idUsuario) {
		this.idUsuario = idUsuario;
	}
	
	private static final long serialVersionUID = 1L;

}
