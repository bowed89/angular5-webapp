import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductoService } from '../services/productos.service';
import { Producto } from '../models/producto';
@Component({
    selector: 'product-list',
    templateUrl: '../views/product-list.html',
    providers: [ProductoService]  //se esta inyectando el servicio ProductoService
})
export class ProductListComponent{
    public titulo: string;
    public producto: Producto[]
    public confirmado

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _productoService: ProductoService
    ){
        this.titulo = 'Listado de productos'
        this.confirmado = null
    }

    ngOnInit(){
        console.log('product-list.component.ts  ... Cargado')
        this.getProductos()
    }

    getProductos(){
        this._productoService.getProductos().subscribe(
            result => {
                if(result.code != 200){
                    console.log(result);
                }else{
                     this.producto = result.data;

                }
            },
            error => {
                console.log(<any>error);
            }
        )
    }



    borrarConfirm(id){
        this.confirmado = id 
    }

    cancelarConfirm(){
        this.confirmado = null
    }

    onDeleteProducto(id){
        this._productoService.deleteProducto(id).subscribe(
            response => {
                if(response.code == 200){
                    this.getProductos()
                }else{
                    alert('Error al borrar producto')
                }
            },
            error => {
                console.log(<any>error)
            }
        )
    }
}