import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  constructor(private http:HttpClient) { }

  obtenerArticulosDB(){
    return  this.http.get('http://localhost:3000/articulo')
  }
  obtenerArticuloDB(id:number){
    return  this.http.get('http://localhost:3000/articulo/'+id)
  }
  editarArticuloDB(articulo:any){
    return  this.http.put('http://localhost:3000/articulo/update/'+articulo.idarticulo,articulo)
  }
  
  
}
