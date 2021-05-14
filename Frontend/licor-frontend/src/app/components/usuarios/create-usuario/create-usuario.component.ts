import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { Role } from 'src/app/models/role';

import swal from 'sweetalert2';
import { UsuarioAuxiliar } from '../../../models/auxiliar/usuario-auxiliar';

@Component({
  selector: 'app-create-usuario',
  templateUrl: './create-usuario.component.html',
  styles: [
  ]
})
export class CreateUsuarioComponent implements OnInit {

  title: string;
  usuario: Usuario;
  role: Role;
  roles: Role[];
  filas: Role[] = [];

  public usuarioAuxiliar: UsuarioAuxiliar;

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute
  ) {
    this.title = 'Crear Usuario';
    this.usuario = new Usuario();
    this.usuarioAuxiliar = new UsuarioAuxiliar();
  }

  ngOnInit(): void {
    this.cargarUsuario();
    this.cargarRoles();
  }

  cargarUsuario(): void {
    this.activatedRoute.params.subscribe(params => {
      // tslint:disable-next-line: no-string-literal
      const id = params['id'];
      if (id) {
        this.usuarioService.getUsuario(id).subscribe(usuario => {
          this.usuarioAuxiliar = usuario;
          this.filas = this.usuarioAuxiliar.roles;
        });
      }
    });
  }

  create(): void {
    this.usuarioAuxiliar.roles = this.filas;

    console.log(this.usuarioAuxiliar);

    this.usuarioService.create(this.usuarioAuxiliar).subscribe(
      response => {
        this.router.navigate(['/usuarios']);
        swal.fire('Usuario creado', `El usuario ${this.usuarioAuxiliar.usuario} fue creado con éxito`, 'success');
      }
    );
  }

  update(): void {
    this.usuarioService.update(this.usuarioAuxiliar).subscribe(
      response => {
        this.router.navigate(['/usuarios']);
        swal.fire('Usuario Actualizado', `El usuario ${this.usuarioAuxiliar.usuario} fue actualizado con éxito`, 'success');
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
