import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { routing, appRoutingProviders } from './app.routing';
import { ClientesComponent } from './components/clientes/clientes.component';
import { HomeComponent } from './components/home/home.component';
import { ProductosComponent } from './components/productos/productos.component';
import { TiposProductoComponent } from './components/tipos-producto/tipos-producto.component';
import { MarcasProductoComponent } from './components/marcas-producto/marcas-producto.component';
import { ErrorComponent } from './components/error/error.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CreateProductComponent } from './components/productos/create-product/create-product.component';
import { CreateMarcaComponent } from './components/marcas-producto/create-marca/create-marca.component';
import { CreateTipoComponent } from './components/tipos-producto/create-tipo/create-tipo.component';
import { CreateClienteComponent } from './components/clientes/create-cliente/create-cliente.component';

import { DataTablesModule } from 'angular-datatables';
import { PaginatorComponent } from './components/paginator/marcas/paginator.component';
import { TipoPaginatorComponent } from './components/paginator/tipos/tipo-paginator.component';
import { ClientePaginatorComponent } from './components/paginator/clientes/cliente-paginator.component';
import { ProductoPaginatorComponent } from './components/paginator/productos/producto-paginator.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    HomeComponent,
    ProductosComponent,
    TiposProductoComponent,
    MarcasProductoComponent,
    ErrorComponent,
    VentasComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    CreateProductComponent,
    CreateMarcaComponent,
    CreateTipoComponent,
    CreateClienteComponent,
    PaginatorComponent,
    TipoPaginatorComponent,
    ClientePaginatorComponent,
    ProductoPaginatorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // Importando el cliente http para realizar peticiones al backend
    routing,
    FormsModule,
    DataTablesModule,
    NoopAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    appRoutingProviders,
    {provide: LOCALE_ID, useValue: 'en-US' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
