import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
  providers: [ClienteService]
})
export class ClientesComponent implements OnInit {

  public title: string;
  public clientes: Cliente[];

  constructor(
    private clienteService: ClienteService
  ) {
    this.title = 'Listado de clientes';
  }

  ngOnInit(): void {
    // tslint:disable-next-line: deprecation
    this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes,
      error => { }
    );
  }

}
