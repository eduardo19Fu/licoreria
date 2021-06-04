import { Component, OnInit } from '@angular/core';
import { Correlativo } from 'src/app/models/correlativo';
import { CorrelativoService } from '../../services/correlativos/correlativo.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-correlativos',
  templateUrl: './correlativos.component.html',
  styles: [
  ]
})
export class CorrelativosComponent implements OnInit {

  title: string;

  paginador: any;

  correlativos: Correlativo[];

  constructor(
    private correlativoService: CorrelativoService,
    public authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    this.title = 'Listado de Correlativos';
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let page = +params.get('page');

      if (!page){
        page = 0;
      }

      this.getCorrelativosPaginados(page);
    });
  }

  getCorrelativosPaginados(page: number): void{
    this.correlativoService.getCorrelativosPage(page).subscribe(
      response => {
        this.correlativos = response.content as Correlativo[];
        this.paginador = response;
      }
    );
  }

}
