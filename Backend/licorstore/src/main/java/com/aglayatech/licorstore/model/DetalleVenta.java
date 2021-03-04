package com.aglayatech.licorstore.model;

import java.io.Serializable;

public class DetalleVenta implements Serializable {

	private Integer idDetalle;
	private Double subTotal;

	private Producto idProducto;

	private Venta idVenta;

	public DetalleVenta() {
		// constructor
	}

	public Integer getIdDetalle() {
		return idDetalle;
	}

	public void setIdDetalle(Integer idDetalle) {
		this.idDetalle = idDetalle;
	}

	public Double getSubTotal() {
		return subTotal;
	}

	public void setSubTotal(Double subTotal) {
		this.subTotal = subTotal;
	}

	public Producto getIdProducto() {
		return idProducto;
	}

	public void setIdProducto(Producto idProducto) {
		this.idProducto = idProducto;
	}

	public Venta getIdVenta() {
		return idVenta;
	}

	public void setIdVenta(Venta idVenta) {
		this.idVenta = idVenta;
	}

	private static final long serialVersionUID = 1L;

}
