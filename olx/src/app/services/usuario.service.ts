import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient) { }

  obtenerUsuario(id:number){
    return this.http.get('http://localhost:3000/usuario/'+id)
  }
  editarUsuario(usuario:any){
    return this.http.put('http://localhost:3000/usuario/update/'+usuario.iduser,usuario)
  }
  cambiarPassword(id:any,password:any){
    return this.http.put('http://localhost:3000/usuario/update/password/'+id,password)
  }

}
