import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient) { }
  urlRaiz = "https://olx-node-sx91.onrender.com/"
  obtenerUsuario(id:number){
    return this.http.get(this.urlRaiz +'usuario/'+id)
  }
  obtenerUsuarioPorEmail(email:string){
    return this.http.get(this.urlRaiz +'usuario/email/'+email)
  }
  editarUsuario(usuario:any){
    return this.http.put(this.urlRaiz +'usuario/update/'+usuario.iduser,usuario)
  }
  cambiarPassword(id:any,password:any){
    return this.http.put(this.urlRaiz +'usuario/update/password/'+id,password)
  }

}
