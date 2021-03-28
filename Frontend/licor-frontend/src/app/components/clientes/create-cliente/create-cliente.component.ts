import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from '../../../services/cliente.service';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-cliente',
  templateUrl: './create-cliente.component.html',
  providers: [ClienteService]
})
export class CreateClienteComponent implements OnInit {

  public title: string;
  public cliente: Cliente;

  constructor(
    private serviceCliente: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.title = 'Registrar Nuevo Cliente';
    this.cliente = new Cliente();
  }

  ngOnInit(): void {
    this.cargarCliente();
  }

  cargarCliente(): void {
    // tslint:disable-next-line: deprecation
    this.activatedRoute.params.subscribe(params => {
      // tslint:disable-next-line: no-string-literal
      const id = params['id'];
      if (id) {
        // tslint:disable-next-line: deprecation
        this.serviceCliente.getCliente(id).subscribe(
          cliente => this.cliente = cliente
        );
      }
    });
  }

  create(): void {
    // tslint:disable-next-line: deprecation
    this.serviceCliente.create(this.cliente).subscribe(
      response => {
        this.router.navigate(['/clientes']);
        swal.fire('Cliente Registrado', `Cliente ${this.cliente.nombre} registrado con éxito!`, 'success');
      },
      error => { }
    );
  }

  update(): void{
    // tslint:disable-next-line: deprecation
    this.serviceCliente.update(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes']);
        swal.fire('Cliente Actualizado', `Cliente ${this.cliente.nombre} actualizado con éxito!`, 'success');
      }
    );
  }

}
