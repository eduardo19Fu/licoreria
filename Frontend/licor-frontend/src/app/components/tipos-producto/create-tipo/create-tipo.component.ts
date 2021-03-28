import { Component, OnInit } from '@angular/core';
import { TipoProducto } from '../../../models/tipo-producto';
import { TipoProductoService } from '../../../services/tipo-producto.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-create-tipo',
  templateUrl: './create-tipo.component.html',
  providers: [TipoProductoService]
})
export class CreateTipoComponent implements OnInit {

  public title: string;
  public tipoProducto: TipoProducto;

  constructor(
    private tipoService: TipoProductoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.title = 'Registrar Tipo de Producto';
    this.tipoProducto = new TipoProducto();
  }

  ngOnInit(): void {
    this.cargarTipoProducto();
  }

  cargarTipoProducto(): void{
    // tslint:disable-next-line: deprecation
    this.activatedRoute.params.subscribe(params => {
      // tslint:disable-next-line: no-string-literal
      const id = params['id'];
      if (id){
        // tslint:disable-next-line: deprecation
        this.tipoService.getTipoProducto(id).subscribe(
          tipoProducto => this.tipoProducto = tipoProducto
        );
      }
    });
  }

  public create(): void{
    // tslint:disable-next-line: deprecation
    this.tipoService.create(this.tipoProducto).subscribe(
      response => {
        this.router.navigate(['/tipos-producto']);
        swal.fire('Tipo Creado', `Tipo ${this.tipoProducto.tipoProducto} registrado con éxito!`, 'success');
      },
      error => {
        if (error) {
          swal.fire({
            icon: 'error',
            title: 'Ha ocurrido un error!',
            text: error,
            footer: ''
          });
        }
      }
    );
  }

  update(): void{
    // tslint:disable-next-line: deprecation
    this.tipoService.update(this.tipoProducto).subscribe(
      tipoProducto => {
        this.router.navigate(['/tipos-producto']);
        swal.fire('Tipo Actualizado', `¡El tipo de producto ${this.tipoProducto} ha sido actualizado con éxito!`, 'success');
      },
      error => {}
    );
  }

}
