import { Component, OnInit, Input } from '@angular/core';
import { Factura } from 'src/app/models/factura';
import { FacturaService } from '../../services/facturas/factura.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DetailService } from '../../services/facturas/detail.service';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {

  public title: string;

  public facturas: Factura[];

  paginador: any;

  facturaSeleccionada: Factura;

  constructor(
    private detailService: DetailService,
    private serviceFactura: FacturaService,
    private activatedRoute: ActivatedRoute,
    public auth: AuthService
  ) {
    this.title = 'Facturas';
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');

      if (!page){
        page = 0;
      }

      this.getFacturas(page);
    });
  }

  getFacturas(page: number): void {
    this.serviceFactura.getFacturasPage(page).subscribe((response: any) => {
      this.facturas = response.content as Factura[];
      this.paginador = response;
    });
  }

  abrirDetalle(factura: Factura): void{
    this.facturaSeleccionada = factura;
    this.detailService.abrirModal();
  }

}
