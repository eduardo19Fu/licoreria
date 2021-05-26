import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { DetailUsuarioService } from '../../../services/usuarios/detail-usuario.service';

@Component({
  selector: 'app-detail-usuario',
  templateUrl: './detail-usuario.component.html',
  styleUrls: ['./detail-usuario.component.css']
})
export class DetailUsuarioComponent implements OnInit {

  title: string;

  @Input() usuario: Usuario;

  constructor(
    public detailUsuarioService: DetailUsuarioService
  ) {
    this.title = 'Detalle de Usuario';
  }

  ngOnInit(): void {
    console.log(this.usuario.roles);
  }

  cerrarModal(): void{
    this.detailUsuarioService.cerrarModal();
  }

}
