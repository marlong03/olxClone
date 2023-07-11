import { Component,Input,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticuloService } from 'src/app/services/articulo.service';
@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss']
})
export class ListItemsComponent implements OnInit{
    constructor(private as:ArticuloService){}
 
    @Input() inputIdUserProfile: string = "";
    @Input() inputHome: string = "";
    @Input() valorDelPadre: string = "";
    page:number = 1
    tituloLista = ""
    listaArticulosPintar:any = []
    ngOnInit(){
      this.ListaAPintar()
      console.log(this.valorDelPadre);
      console.log(this.inputIdUserProfile);
      console.log(this.inputHome);
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
          //si estoy viendo mi perfil, que tenga opciones de edicion sobre los anuncios
        }
        else if(filtro == "category"){
          this.tituloLista = 'Categoria '+ this.valorDelPadre
          this.listaArticulosPintar = 
          this.listaArticulosPintar
              .filter((articulo:any) =>articulo.categoria_idcategoria.nombre == this.valorDelPadre)
              .sort((a:any,b:any)=>b.idarticulo - a.idarticulo);
        }
      })
    }
}
