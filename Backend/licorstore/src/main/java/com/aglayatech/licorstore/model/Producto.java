package com.aglayatech.licorstore.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "productos")
public class Producto implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idProducto;

	private String codProducto;
	private String nombre;
	private Double precioCompra;
	private Double precioVenta;
	private float porcentajeGanancia;
	private String imagen;

	@Temporal(TemporalType.DATE)
	private Date fechaVencimiento;

	@Temporal(TemporalType.DATE)
	private Date fechaIngreso;

	@Temporal(TemporalType.TIMESTAMP)
	private Date fechaRegistro;

	private int stock;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "id_marca_producto")
	@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
	private MarcaProducto marcaProducto;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "id_tipo_producto")
	@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
	private TipoProducto tipoProducto;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "id_estado")
	@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
	private Estado estado;

	public Producto() {
		this.imagen = null;
	}
	
	@PrePersist
	public void configFechaRegistro() {
		this.fechaRegistro = new Date();
	}

	public Integer getIdProducto() {
		return idProducto;
	}

	public void setIdProducto(Integer idProducto) {
		this.idProducto = idProducto;
	}

	public String getCodProducto() {
		return codProducto;
	}

	public void setCodProducto(String codProducto) {
		this.codProducto = codProducto;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public Double getPrecioCompra() {
		return precioCompra;
	}

	public void setPrecioCompra(Double precioCompra) {
		this.precioCompra = precioCompra;
	}

	public Double getPrecioVenta() {
		return precioVenta;
	}

	public void setPrecioVenta(Double precioVenta) {
		this.precioVenta = precioVenta;
	}

	public float getPorcentajeGanancia() {
		return porcentajeGanancia;
	}

	public void setPorcentajeGanancia(float porcentajeGanancia) {
		this.porcentajeGanancia = porcentajeGanancia;
	}

	public Date getFechaVencimiento() {
		return fechaVencimiento;
	}

	public void setFechaVencimiento(Date fechaVencimiento) {
		this.fechaVencimiento = fechaVencimiento;
	}

	public int getStock() {
		return stock;
	}

	public void setStock(int stock) {
		this.stock = stock;
	}

	public MarcaProducto getMarcaProducto() {
		return marcaProducto;
	}

	public void setMarcaProducto(MarcaProducto marcaProducto) {
		this.marcaProducto = marcaProducto;
	}

	public TipoProducto getTipoProducto() {
		return tipoProducto;
	}

	public void setTipoProducto(TipoProducto tipoProducto) {
		this.tipoProducto = tipoProducto;
	}

	public Estado getEstado() {
		return estado;
	}

	public void setEstado(Estado estado) {
		this.estado = estado;
	}

	public String getImagen() {
		return imagen;
	}

	public void setImagen(String imagen) {
		this.imagen = imagen;
	}

	public Date getFechaIngreso() {
		return fechaIngreso;
	}

	public void setFechaIngreso(Date fechaIngreso) {
		this.fechaIngreso = fechaIngreso;
	}

	public Date getFechaRegistro() {
		return fechaRegistro;
	}

	public void setFechaRegistro(Date fechaRegistro) {
		this.fechaRegistro = fechaRegistro;
	}

	@Override
	public String toString() {
		return "Producto [idProducto=" + idProducto + ", codProducto=" + codProducto + ", nombre=" + nombre
				+ ", precioCompra=" + precioCompra + ", precioVenta=" + precioVenta + ", porcentajeGanancia="
				+ porcentajeGanancia + ", imagen=" + imagen + ", fechaVencimiento=" + fechaVencimiento
				+ ", fechaIngreso=" + fechaIngreso + ", fechaRegistro=" + fechaRegistro + ", stock=" + stock
				+ ", marcaProducto=" + marcaProducto + ", tipoProducto=" + tipoProducto + ", estado=" + estado + "]";
	}

	private static final long serialVersionUID = 1L;

}
