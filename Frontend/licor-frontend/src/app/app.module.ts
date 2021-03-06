import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { routing, appRoutingProviders } from './app.routing';
import { ClientesComponent } from './components/clientes/clientes.component';
import { HomeComponent } from './components/home/home.component';
import { ProductosComponent } from './components/productos/productos.component';
import { TiposProductoComponent } from './components/tipos-producto/tipos-producto.component';
import { MarcasProductoComponent } from './components/marcas-producto/marcas-producto.component';
import { ErrorComponent } from './components/error/error.component';
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
import { DetailComponent } from './components/productos/detail/detail.component';
import { LoginComponent } from './components/login/login.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { CreateUsuarioComponent } from './components/usuarios/create-usuario/create-usuario.component';
import { UsuarioPaginatorComponent } from './components/paginator/usuarios/usuario-paginator.component';
import { TokenInterceptor } from './components/usuarios/interceptors/token.interceptor';
import { AuthInterceptor } from './components/usuarios/interceptors/auth.interceptor';
import { FacturasComponent } from './components/facturas/facturas.component';
import { CreateFacturaComponent } from './components/facturas/create-factura/create-factura.component';
import { FacturaPaginatorComponent } from './components/paginator/facturas/factura-paginator.component';
import { DetailFacturaComponent } from './components/facturas/detail/detail-factura.component';
import { DetailUsuarioComponent } from './components/usuarios/detail-usuario/detail-usuario.component';
import { ModalCreateComponent } from './components/clientes/modal-create/modal-create.component';
import { CorrelativosComponent } from './components/correlativos/correlativos.component';
import { CreateCorrelativoComponent } from './components/correlativos/create-correlativo/create-correlativo.component';
import { CorrelativoPaginatorComponent } from './components/paginator/correlativos/correlativo-paginator.component';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';



@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    HomeComponent,
    ProductosComponent,
    TiposProductoComponent,
    MarcasProductoComponent,
    ErrorComponent,
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
    ProductoPaginatorComponent,
    DetailComponent,
    LoginComponent,
    UsuariosComponent,
    CreateUsuarioComponent,
    UsuarioPaginatorComponent,
    FacturasComponent,
    CreateFacturaComponent,
    FacturaPaginatorComponent,
    DetailFacturaComponent,
    DetailUsuarioComponent,
    ModalCreateComponent,
    CorrelativosComponent,
    CreateCorrelativoComponent,
    CorrelativoPaginatorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // Importando el cliente http para realizar peticiones al backend
    routing,
    FormsModule,
    DataTablesModule,
    NoopAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [
    appRoutingProviders,
    { provide: LOCALE_ID, useValue: 'en-US' },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'GTQ'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
