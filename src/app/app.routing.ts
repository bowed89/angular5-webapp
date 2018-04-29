import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Componentes
import { HomeComponent } from './components/home.component';
import { ErrorComponent } from './components/error.component';
import { ProductListComponent } from './components/product-list.component';
import { ProductoAddComponent } from './components/producto-add.component';
import { ProductDetailComponent } from './components/product-detail.component';
import { ProductEditComponent } from './components/product-edit.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'productos', component: ProductListComponent },
    { path: 'crear-producto', component: ProductoAddComponent },
    { path: 'producto/:id', component: ProductDetailComponent },
    { path: 'editar-producto/:id', component: ProductEditComponent },
    { path: '**', component: ErrorComponent } //error, siempre va al final 
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);