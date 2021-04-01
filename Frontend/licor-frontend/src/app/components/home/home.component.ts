import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from 'src/app/models/cliente';
import { MarcaProductoService } from '../../services/marca-producto.service';
import { MarcaProducto } from '../../models/marca-producto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ProductoService, ClienteService, MarcaProductoService]
})
export class HomeComponent implements OnInit {

  public title: string;
  public totalProductos: number;
  public totalClientes: number;
  public totalMarcas: number;

  public productos: Producto[];
  public clientes: Cliente[];
  public marcas: MarcaProducto[];

  constructor(
    private serviceProducto: ProductoService,
    private serviceCliente: ClienteService,
    private serviceMarca: MarcaProductoService
  ) {
    this.title = 'Inicio';
   }

  ngOnInit(): void {
    this.getProductos();
    this.getClientes();
    this.getMarcas();
  }

  getProductos(): void{
    // tslint:disable-next-line: deprecation
    this.serviceProducto.getProductos().subscribe(
      productos => {
        this.productos = productos;
        this.totalProductos = this.productos.length;
      }
    );
  }

  getClientes(): void{
    // tslint:disable-next-line: deprecation
    this.serviceCliente.getClientes().subscribe(
      clientes => {
        this.clientes = clientes;
        this.totalClientes = this.clientes.length;
      }
    );
  }

  getMarcas(): void{
    // tslint:disable-next-line: deprecation
    this.serviceMarca.getMarcas().subscribe(
      marcas => {
        this.marcas = marcas;
        this.totalMarcas = this.marcas.length;
      }
    );
  }
}
