import { Component, OnInit } from '@angular/core';
import { MarcaProducto } from '../../../models/marca-producto';
import { MarcaProductoService } from '../../../services/marca-producto.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-create-marca',
  templateUrl: './create-marca.component.html',
  providers: [MarcaProductoService]
})
export class CreateMarcaComponent implements OnInit {

  public title: string;
  public marcaProducto: MarcaProducto;

  constructor(
    private marcaService: MarcaProductoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.title = 'Registrar nueva marca';
    this.marcaProducto = new MarcaProducto();
  }

  ngOnInit(): void {
    this.cargarMarca();
  }

  cargarMarca(): void{
    // tslint:disable-next-line: deprecation
    this.activatedRoute.params.subscribe(params => {
      // tslint:disable-next-line: no-string-literal
      const id = params['id'];
      if (id){
        // tslint:disable-next-line: deprecation
        this.marcaService.getMarca(id).subscribe(
          marca => this.marcaProducto = marca
        );
      }
    });
  }

  create(): void {
    // tslint:disable-next-line: deprecation
    this.marcaService.create(this.marcaProducto).subscribe(
      marca => {
        this.router.navigate(['/marcas-producto']);
        swal.fire('Marca Guardada', `Marca ${this.marcaProducto.marca} creado con éxito`, 'success');
      },
      error => {
        if (error) {
          swal.fire({
            icon: 'error',
            title: 'Error al Guardar',
            text: error,
            footer: ''
          });
        }
      }
    );
  }

  update(): void{
    // tslint:disable-next-line: deprecation
    this.marcaService.update(this.marcaProducto).subscribe(
      marca => {
        this.router.navigate(['/marcas-producto']);
        swal.fire('Marca Actualizada', `¡La marca ${this.marcaProducto.marca} fué actualizada con éxito!`, 'success');
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

}