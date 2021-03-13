import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './components/clientes/clientes.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProductosComponent } from './components/productos/productos.component';
import { TiposProductoComponent } from './components/tipos-producto/tipos-producto.component';
import { MarcasProductoComponent } from './components/marcas-producto/marcas-producto.component';
import { ErrorComponent } from './components/error/error.component';

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'clientes', component: ClientesComponent},
    {path: 'productos', component: ProductosComponent},
    {path: 'tipos-producto', component: TiposProductoComponent},
    {path: 'marcas-producto', component: MarcasProductoComponent},
    {path: '**', component: ErrorComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);