import { Component, OnInit } from '@angular/core';
import { Factura } from 'src/app/models/factura';
import { FacturaService } from '../../services/facturas/factura.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DetailService } from '../../services/facturas/detail.service';

import swal from 'sweetalert2';

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

  swalWithBootstrapButtons = swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: true
  });

  constructor(
    private detailService: DetailService,
    private facturaService: FacturaService,
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
    this.facturaService.getFacturasPage(page).subscribe((response: any) => {
      this.facturas = response.content as Factura[];
      this.paginador = response;
    });
  }

  abrirDetalle(factura: Factura): void{
    this.facturaSeleccionada = factura;
    console.log(this.facturaSeleccionada.itemsFactura);
    this.detailService.abrirModal();
  }

  cancel(factura: Factura): void{
    this.swalWithBootstrapButtons.fire({
      title: '¿Está seguro?',
      text: `¿Seguro que desea anular la factura No. ${factura.noFactura}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Si, anular!',
      cancelButtonText: '¡No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        // aqui va el codigo de confirmación para anular factura
        this.facturaService.cancel(factura.idFactura).subscribe(
          response => {
            this.facturas = this.facturas.filter(fac => factura.noFactura !== fac.noFactura);
            this.swalWithBootstrapButtons.fire(
              `${response.mensaje}`,
              `La factura No. ${factura.noFactura} ha sido anulada con éxito`,
              'success'
            );
          }
        );

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === swal.DismissReason.cancel
      ) {
        this.swalWithBootstrapButtons.fire(
          'Proceso Cancelado',
          `La factura No. ${factura.noFactura} no fué anulada.`,
          'error'
        );
      }
    });
  }

}
