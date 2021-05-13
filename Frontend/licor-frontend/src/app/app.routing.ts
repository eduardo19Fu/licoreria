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
import { LoginComponent } from './components/login/login.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { CreateUsuarioComponent } from './components/usuarios/create-usuario/create-usuario.component';
import { AuthGuard } from './components/usuarios/guards/auth.guard';
import { RoleGuard } from './components/usuarios/guards/role.guard';

const GUARDS = {
    GUARD1: 'ROLE_ADMIN',
    GUARD2: 'ROLE_COBRADOR'
};

const appRoutes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'clientes', component: ClientesComponent, canActivate: [AuthGuard]},
    {path: 'clientes/create', component: CreateClienteComponent, canActivate: [AuthGuard]},
    {path: 'clientes/create/:id', component: CreateClienteComponent, canActivate: [AuthGuard]},
    {path: 'clientes/page/:page', component: ClientesComponent, canActivate: [AuthGuard]},
    {path: 'productos', component: ProductosComponent, canActivate: [AuthGuard]},
    {path: 'productos/page/:page', component: ProductosComponent, canActivate: [AuthGuard]},
    {path: 'productos/create', component: CreateProductComponent, canActivate: [AuthGuard, RoleGuard], data: {role: ['ROLE_ADMIN', 'ROLE_INVENTARIO']}},
    {path: 'productos/create/:id', component: CreateProductComponent, canActivate: [AuthGuard]},
    {path: 'tipos-producto', component: TiposProductoComponent, canActivate: [AuthGuard]},
    {path: 'tipos-producto/create', component: CreateTipoComponent, canActivate: [AuthGuard]},
    {path: 'tipos-producto/create/:id', component: CreateTipoComponent, canActivate: [AuthGuard]},
    {path: 'tipos-producto/page/:page', component: TiposProductoComponent, canActivate: [AuthGuard]},
    {path: 'marcas-producto', component: MarcasProductoComponent, canActivate: [AuthGuard]},
    {path: 'marcas-producto/page/:page', component: MarcasProductoComponent, canActivate: [AuthGuard]},
    {path: 'marcas-producto/create', component: CreateMarcaComponent, canActivate: [AuthGuard]},
    {path: 'marcas-producto/create/:id', component: CreateMarcaComponent, canActivate: [AuthGuard]},
    {path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard]},
    {path: 'usuarios/page/:page', component: UsuariosComponent, canActivate: [AuthGuard]},
    {path: 'usuarios/create', component: CreateUsuarioComponent, canActivate: [AuthGuard]},
    {path: 'usuarios/create/:id', component: CreateUsuarioComponent, canActivate: [AuthGuard, RoleGuard], data: {role: ['ROLE_ADMIN']}},
    {path: '**', component: ErrorComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
