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

  create(): void{
    // tslint:disable-next-line: deprecation
    this.tipoService.create(this.tipoProducto).subscribe(
      response => {
        this.router.navigate(['/tipos-producto']);
        swal.fire('Tipo Creado', `${response.mensaje}: ${response.tipoProducto.tipoProducto}`, 'success');
      }
    );
  }

  update(): void{
    // tslint:disable-next-line: deprecation
    this.tipoService.update(this.tipoProducto).subscribe(
      response => {
        this.router.navigate(['/tipos-producto']);
        swal.fire('Tipo Actualizado', `${response.mensaje}: ${response.tipoProducto.tipoProducto}`, 'success');
      }
    );
  }

}
