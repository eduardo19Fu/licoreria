import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './components/clientes/clientes.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProductosComponent } from './components/productos/productos.component';
import { TiposProductoComponent } from './components/tipos-producto/tipos-producto.component';
import { MarcasProductoComponent } from './components/marcas-producto/marcas-producto.component';
import { ErrorComponent } from './components/error/error.component';
import { CreateProductComponent } from './components/productos/create-product/create-product.component';
import { CreateMarcaComponent } from './components/marcas-producto/create-marca/create-marca.component';
import { CreateTipoComponent } from './components/tipos-producto/create-tipo/create-tipo.component';
import { CreateClienteComponent } from './components/clientes/create-cliente/create-cliente.component';
import { DetailComponent } from './components/productos/detail/detail.component';

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'clientes', component: ClientesComponent},
    {path: 'clientes/create', component: CreateClienteComponent},
    {path: 'clientes/create/:id', component: CreateClienteComponent},
    {path: 'clientes/page/:page', component: ClientesComponent},
    {path: 'productos', component: ProductosComponent},
    {path: 'productos/page/:page', component: ProductosComponent},
    {path: 'productos/create', component: CreateProductComponent},
    {path: 'productos/create/:id', component: CreateProductComponent},
    {path: 'tipos-producto', component: TiposProductoComponent},
    {path: 'tipos-producto/create', component: CreateTipoComponent},
    {path: 'tipos-producto/create/:id', component: CreateTipoComponent},
    {path: 'tipos-producto/page/:page', component: TiposProductoComponent},
    {path: 'marcas-producto', component: MarcasProductoComponent},
    {path: 'marcas-producto/page/:page', component: MarcasProductoComponent},
    {path: 'marcas-producto/create', component: CreateMarcaComponent},
    {path: 'marcas-producto/create/:id', component: CreateMarcaComponent},
    {path: '**', component: ErrorComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
