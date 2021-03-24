import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { global } from './global';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private url: string;

  constructor(
    private http: HttpClient
  ) {
    this.url = global.url;
  }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.url + '/clientes');
  }
}
