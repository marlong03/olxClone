import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http:HttpClient) { }

  obtenerCategoria(){
    return this.http.get('http://localhost:3000/categoria')
  }
  obtenerCategoriaById(id:number){
    return this.http.get('http://localhost:3000/categoria/'+id)
  }
  //validar si la categoria colocada en url existe y si no existe devolver al home
  validarExistenciaCategoria(nombre:string){
    return this.http.get('http://localhost:3000/categoria/nombre/'+nombre);
  }
}
