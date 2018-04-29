import { Component } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'

import { ProductoService } from '../services/productos.service'
import { Producto } from '../models/producto'
import { Response } from '@angular/http/src/static_response';

@Component({
    selector: 'product-detail',
    templateUrl: '../views/product-detail.html',
    providers: [ProductoService]
})

export class ProductDetailComponent{
    public producto: Producto;
    constructor(
        private _productoService: ProductoService,
        private _route: ActivatedRoute,
        private _router: Router
    ){}

    ngOnInit(){
        console.log('product-detail.component cargado ...');
        this.getProducto();
    }

    getProducto(){
        this._route.params.forEach((params: Params) => {
            let id = params['id'];
            
            this._productoService.getProducto(id).subscribe(
                response => {
                    if(response.code == 200){
                        this.producto = response.data; //crea un objeto
                    }else{
                        this._router.navigate(['/productos']);
                    }
                },
                error => {
                    console.log(<any>error);
                }
            )
        });
    }
}