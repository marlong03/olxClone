import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http:HttpClient) { }
  urlRaiz = "https://olx-node-sx91.onrender.com/"
  obtenerCategoria(){
    return this.http.get(this.urlRaiz +'categoria')
  }
  obtenerCategoriaById(id:number){
    return this.http.get(this.urlRaiz +'categoria/'+id)
  }
  //validar si la categoria colocada en url existe y si no existe devolver al home
  validarExistenciaCategoria(nombre:string){
    return this.http.get(this.urlRaiz +'categoria/nombre/'+nombre);
  }
}
