package com.aglayatech.licorstore.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "marcas_producto")
public class MarcaProducto implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idMarcaProducto;
	private String marca;
	
	@Temporal(TemporalType.DATE)
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

	@Override
	public String toString() {
		return "IMarcaProductoRepository [idMarcaProducto=" + idMarcaProducto + ", marca=" + marca + ", fechaRegistro="
				+ fechaRegistro + ", idUsuario=" + idUsuario + "]";
	}

	private static final long serialVersionUID = 1L;

}
