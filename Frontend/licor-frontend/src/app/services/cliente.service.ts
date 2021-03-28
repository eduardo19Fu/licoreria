import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from './global';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private url: string;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient
  ) {
    this.url = global.url;
  }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.url}/clientes`);
  }

  create(cliente: Cliente): Observable<Cliente>{
    const params = JSON.stringify(cliente);
    return this.http.post<Cliente>(`${this.url}/clientes`, params, { headers: this.headers });
  }

  getCliente(id: number): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.url}/clientes/${id}`, { headers: this.headers });
  }

  update(cliente: Cliente): Observable<Cliente>{
    const params = JSON.stringify(cliente);
    return this.http.put<Cliente>(`${this.url}/clientes`, params, { headers: this.headers });
  }

  delete(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.url}/clientes/${id}`, { headers: this.headers });
  }
}
