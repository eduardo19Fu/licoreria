package com.aglayatech.licorstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aglayatech.licorstore.model.Producto;

public interface IProductoRepository extends JpaRepository<Producto, Integer> {

}
