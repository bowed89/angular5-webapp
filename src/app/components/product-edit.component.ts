import { Component } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'

import { ProductoService } from '../services/productos.service'
import { Producto } from '../models/producto'
import { GLOBAL } from '../services/global';
@Component({
    selector: 'product-edit',
    templateUrl: '../views/producto-add.html',
    providers: [ProductoService]
})

export class ProductEditComponent{
    public titulo: string
    public producto: Producto
    public filesToUpload
    public resultUpload
    public is_edit

    constructor(
        private _productoService: ProductoService,
        private _route: ActivatedRoute,
        private _router: Router
    ){
        this.titulo = 'Editar producto'
        this.is_edit = true
    }
    ngOnInit(){
        console.log(this.titulo)
        this.getProducto()
    }

    getProducto(){
        this._route.params.forEach((params: Params) => {
            let id = params['id'];
            
            this._productoService.getProducto(id).subscribe(
                response => {
                    if(response.code == 200){
                        this.producto = response.data; //lo carga los datos de los productos
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



    onSubmit(){
        console.log(this.producto);

        //Agrega el file cargado ...
        if(this.filesToUpload && this.filesToUpload.length >= 1){
            this._productoService.makeFileRequest(GLOBAL.url+'upload-file', [], this.filesToUpload).then((result) => {
                console.log(result);

                this.resultUpload = result;
                this.producto.imagen = this.resultUpload.filename;
                this.updateProduct();


            },(error) =>{
                console.log(error);
            });
        }else{
            this.updateProduct();
        }
    }

    updateProduct(){
            this._route.params.forEach((params: Params) => {
            let id = params['id'];
            this._productoService.editProducto(id, this.producto).subscribe(
                response => {
                    //si el code es 200 se subio con exito! y nos lleva a home
                    if(response.code == 200){
                        this._router.navigate(['/producto',id]);
                    }else{
                        console.log(response);
                    }
                },
                error => {
                    console.log(<any>error);
                }
            );
        });
    }

    //subir ficheros

    fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
        console.log(this.filesToUpload);
    }


}