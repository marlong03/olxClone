import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  constructor(private http:HttpClient) { }
  urlRaiz = "https://olx-node-sx91.onrender.com/"
  obtenerArticulosDB(){
    return  this.http.get(this.urlRaiz +'articulo')
  }
  obtenerArticuloDB(id:number){
    return  this.http.get(this.urlRaiz +'articulo/'+id)
  }
  editarArticuloDB(articulo:any){
    return  this.http.put(this.urlRaiz +'articulo/update/'+articulo.idarticulo,articulo)
  }
  crearArticulo(articulo:any){
    return this.http.post(this.urlRaiz +'articulo/new',articulo)
  }
  
}
