import { Component, OnInit } from '@angular/core';
import { TipoProducto } from '../../models/tipo-producto';
import { TipoProductoService } from '../../services/tipo-producto.service';

@Component({
  selector: 'app-tipos-producto',
  templateUrl: './tipos-producto.component.html',
  styleUrls: ['./tipos-producto.component.css'],
  providers: [TipoProductoService]
})
export class TiposProductoComponent implements OnInit {

  public title: string;
  public tipos: TipoProducto[];

  constructor(
    private tipoService: TipoProductoService
  ) {
    this.title = 'Tipos de Productos';
  }

  ngOnInit(): void {
    this.tipoService.getTiposProducto().subscribe(
      tiposProducto => this.tipos = tiposProducto,
      error => {
        if (error) {
          alert(error);
        }
      }
    );
  }

}
