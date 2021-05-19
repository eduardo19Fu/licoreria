import { Component, OnInit, Input } from '@angular/core';
import { Factura } from 'src/app/models/factura';
import { DetailService } from '../../../services/facturas/detail.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'detalle-factura',
  templateUrl: './detail-factura.component.html',
  styleUrls: ['./detail-factura.component.css']
})
export class DetailFacturaComponent implements OnInit {

  title: string;

  @Input() factura: Factura;

  constructor(
    public detailService: DetailService
  ) {
    this.title = 'Detalle de Factura';
  }

  ngOnInit(): void {
  }

  cerrarModal(): void{
    this.detailService.cerrarModal();
  }

}
