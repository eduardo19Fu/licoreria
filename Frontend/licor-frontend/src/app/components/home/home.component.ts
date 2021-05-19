import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from 'src/app/models/cliente';
import { MarcaProductoService } from '../../services/marca-producto.service';
import { MarcaProducto } from '../../models/marca-producto';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { FacturaService } from '../../services/facturas/factura.service';

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
  public totalUsuarios: number;
  public totalFacturas: number;

  productos: Producto[];
  clientes: Cliente[];
  marcas: MarcaProducto[];
  usuarios: Usuario[];

  constructor(
    private serviceProducto: ProductoService,
    private serviceCliente: ClienteService,
    private serviceMarca: MarcaProductoService,
    private serviceUsuario: UsuarioService,
    private serviceFactura: FacturaService
  ) {
    this.title = 'Inicio';
   }

  ngOnInit(): void {
    this.getProductos();
    this.getClientes();
    this.getMarcas();
    this.getUsuarios();
    this.getFacturas();
  }

  getProductos(): void{
    this.serviceProducto.getProductos().subscribe(productos => this.totalProductos = productos.length);
  }

  getClientes(): void{
    this.serviceCliente.getClientes().subscribe(clientes => this.totalClientes = clientes.length);
  }

  getMarcas(): void{
    this.serviceMarca.getMarcas().subscribe(marcas => this.totalMarcas = marcas.length);
  }

  getUsuarios(): void{
    this.serviceUsuario.getUsuarios().subscribe(usuarios => this.totalUsuarios = usuarios.length);
  }

  getFacturas(): void{
    this.serviceFactura.getFacturas().subscribe(facturas => this.totalFacturas = facturas.length);
  }
}
