import { Component, OnInit } from '@angular/core';
import { FacturaService } from '../../../services/facturas/factura.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { FormControl } from '@angular/forms';

import { AuthService } from '../../../services/auth.service';
import { ClienteService } from '../../../services/cliente.service';
import { ClienteCreateService } from '../../../services/facturas/cliente-create.service';
import { UsuarioService } from '../../../services/usuarios/usuario.service';
import { CorrelativoService } from '../../../services/correlativos/correlativo.service';
import { ProductoService } from '../../../services/producto.service';

import { Producto } from 'src/app/models/producto';
import { Cliente } from 'src/app/models/cliente';
import { UsuarioAuxiliar } from 'src/app/models/auxiliar/usuario-auxiliar';
import { Factura } from 'src/app/models/factura';
import { Correlativo } from 'src/app/models/correlativo';

import swal from 'sweetalert2';

@Component({
  selector: 'app-create-factura',
  templateUrl: './create-factura.component.html',
  styleUrls: ['./create-factura.component.css']
})
export class CreateFacturaComponent implements OnInit {

  title: string;
  nitIngresado: string;

  producto: Producto;
  cliente: Cliente;
  usuario: UsuarioAuxiliar;
  factura: Factura;
  correlativo: Correlativo;

  autocompleteControl = new FormControl();
  productos: string[] = ['One', 'Two', 'Three'];
  productosFiltrados: Observable<string[]>;

  constructor(
    private facturaService: FacturaService,
    private productoService: ProductoService,
    private clienteService: ClienteService,
    private usuarioService: UsuarioService,
    private clienteCreateService: ClienteCreateService,
    private correlativoService: CorrelativoService,
    private router: Router,
    public authService: AuthService
  ) {
    this.title = 'Crear Factura';
    this.cliente = new Cliente();
    this.usuario = new UsuarioAuxiliar();
    this.factura = new Factura();
    this.correlativo = new Correlativo();
  }

  ngOnInit(): void {
    this.usuarioService.getUsuario(this.authService.usuario.idUsuario).subscribe(
      usuario => {
        this.usuario = usuario;
        this.cargarCorrelativo();
      }
    );

    this.productosFiltrados = this.autocompleteControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.productos.filter(option => option.toLowerCase().includes(filterValue));
  }

  getProductoCode(codigo: string): void{
    this.productoService.getProductoByCode(codigo).subscribe(
      producto => this.producto = producto
    );
  }

  buscarCliente(): void{
    const nit = ((document.getElementById('buscar') as HTMLInputElement)).value;

    this.clienteService.getClienteByNit(nit).subscribe(
      cliente => {
        this.cliente = cliente;
      },
      error => {
        if (error.status === 400){
          swal.fire(`Error: ${error.status}`, 'Petición Equivocada', 'error');
        }
        if (error.status === 404){
          this.nitIngresado = nit;
          this.clienteCreateService.abrirModal();
        }
      }
    );
  }

  cargarCliente(event): void{
    this.cliente = event;
  }

  cargarCorrelativo(): void{
    this.correlativoService.getCorrelativoPorUsuario(this.usuario.idUsuario).subscribe(
      correlativo => {
        this.correlativo = correlativo;
      },
      error => {
        swal.fire('Error al cargar correlativo', error.error, 'error');
      }
    );
  }

}
