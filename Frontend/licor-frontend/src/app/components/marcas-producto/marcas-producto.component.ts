import { Component, OnInit } from '@angular/core';
import { MarcaProducto } from '../../models/marca-producto';
import { MarcaProductoService } from '../../services/marca-producto.service';

@Component({
  selector: 'app-marcas-producto',
  templateUrl: './marcas-producto.component.html',
  styleUrls: ['./marcas-producto.component.css'],
  providers: [MarcaProductoService]
})
export class MarcasProductoComponent implements OnInit {

  public title: string;
  public marcas: MarcaProducto[];

  constructor(
    private marcaService: MarcaProductoService
  ) {
    this.title = 'Listado de Marcas de Productos';
  }

  ngOnInit(): void {
    this.marcaService.getMarcas().subscribe(
      marcas => this.marcas = marcas,
      error => {
        if (error) {
          alert(error);
        }
      }
    );
  }

}
