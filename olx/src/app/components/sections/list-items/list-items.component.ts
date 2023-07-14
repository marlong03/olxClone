import { Component,Input,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticuloService } from 'src/app/services/articulo.service';
import { CategoriaService } from 'src/app/services/categoria.service';
@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss']
})
export class ListItemsComponent implements OnInit{
    constructor(private as:ArticuloService,
                private router:Router,
                private cs:CategoriaService){}
 
    @Input() inputIdUserProfile: string = "";
    @Input() inputHome: string = "";
    @Input() valorDelPadre: string = "";
    page:number = 1
    tituloLista = ""
    listaArticulosPintar:any = []
    ngOnInit(){
        this.ListaAPintar()
    }
    ngOnChanges(changes: any) {
      if (changes.valorDelPadre) {
          this.ListaAPintar()
      }
    }
    ListaAPintar(){
      if(this.inputHome == "null"){
          this.traerListaArticulos("null")
      }
      else if(this.inputIdUserProfile != ""){
          this.traerListaArticulos("profile")
      }
      else if(this.valorDelPadre != ""){
          this.traerListaArticulos("category")
      }
    }
    traerListaArticulos(filtro:string){
        this.as.obtenerArticulosDB().subscribe( (articulos) => {
            this.listaArticulosPintar = articulos
            if(filtro == "null"){
                this.tituloLista = 'Ultimos anuncios'
                this.listaArticulosPintar = articulos
            }else if(filtro == "profile"){
                this.tituloLista = 'Anuncios'
                this.listaArticulosPintar = 
                this.listaArticulosPintar
                    .filter((articulo:any) => articulo.user_iduser.id == this.inputIdUserProfile)
                    .sort((a:any,b:any)=> b.idarticulo - a.idarticulo);
            }
            else if(filtro == "category"){
                let categoryExist = false
                this.cs.validarExistenciaCategoria(this.valorDelPadre).subscribe(res =>{
                    if(res == false){
                        this.router.navigate([''])
                    }else{
                        this.tituloLista = 'Categoria '+ this.valorDelPadre
                        this.listaArticulosPintar = 
                        this.listaArticulosPintar
                          .filter((articulo:any) =>articulo.categoria_idcategoria.nombre == this.valorDelPadre)
                          .sort((a:any,b:any)=>b.idarticulo - a.idarticulo);
                    }
                })
                
            }
        })
    }
}
