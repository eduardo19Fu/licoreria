import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ProductoService, ClienteService]
})
export class HomeComponent implements OnInit {

  public title: string;
  public totalProductos: number;
  public totalClientes: number;

  public productos: Producto[];
  public clientes: Cliente[];

  constructor(
    private serviceProducto: ProductoService,
    private serviceCliente: ClienteService
  ) {
    this.title = 'Inicio';
   }

  ngOnInit(): void {
    this.getProductos();
    this.getClientes();
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
}
