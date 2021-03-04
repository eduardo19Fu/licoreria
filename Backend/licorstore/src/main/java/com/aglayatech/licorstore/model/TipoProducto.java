package com.aglayatech.licorstore.model;

import java.io.Serializable;
import java.util.Date;

public class TipoProducto implements Serializable {

	private Integer idTipoProducto;
	private String tipoProducto;
	private Date fechaRegistro;
	private Integer idUsuario = null;

	public TipoProducto() {
		// Constructor
	}

	public Integer getIdTipoProducto() {
		return idTipoProducto;
	}

	public void setIdTipoProducto(Integer idTipoProducto) {
		this.idTipoProducto = idTipoProducto;
	}

	public String getTipoProducto() {
		return tipoProducto;
	}

	public void setTipoProducto(String tipoProducto) {
		this.tipoProducto = tipoProducto;
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
