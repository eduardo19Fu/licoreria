import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { Role } from 'src/app/models/role';

import swal from 'sweetalert2';

@Component({
  selector: 'app-create-usuario',
  templateUrl: './create-usuario.component.html',
  styles: [
  ]
})
export class CreateUsuarioComponent implements OnInit {

  title: string;
  public usuario: Usuario;
  role: Role;
  roles: Role[];
  filas: Role[] = [];

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute
  ) {
    this.title = 'Crear Usuario';
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    this.cargarUsuario();
    this.cargarRoles();
  }

  cargarUsuario(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      // tslint:disable-next-line: no-string-literal
      const id = params['id'];
      if (id) {
        this.usuarioService.getUsuario(id).subscribe(usuario => this.usuario = usuario);
        console.log(this.usuario);
      }
    });
  }

  create(): void {
    /*this.filas.forEach(fila => {
      this.usuario.roles.push(fila.role);
    });*/

    console.log(this.usuario);

    this.usuarioService.create(this.usuario).subscribe(
      response => {
        this.router.navigate(['/usuarios']);
        swal.fire('Usuario creado', `El usuario ${this.usuario.usuario} fue creado con éxito`, 'success');
      }
    );
  }

  update(): void {
    this.usuarioService.update(this.usuario).subscribe(
      response => {
        this.router.navigate(['/usuarios']);
        swal.fire('Usuario Actualizado', `El usuario ${this.usuario} fue actualizado con éxito`, 'success');
      }
    );
  }

  cargarRoles(): void {
    this.usuarioService.getRoles().subscribe(roles => this.roles = roles);
  }

  cargarRole(event): void {
    this.roles.forEach(role => {
      // tslint:disable-next-line: triple-equals
      if (role.idRole == event){
        this.filas.push(role);
      }
    });
  }

  eliminarFila(index: number): void{
    this.filas.splice(index, 1);
  }
}
