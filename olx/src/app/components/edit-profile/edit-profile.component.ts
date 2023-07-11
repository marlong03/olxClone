import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit{
  constructor( private route:ActivatedRoute,
                private us:UsuarioService){}

  ngOnInit(): void {
    this.route.params.subscribe(parametros =>{
      let {id} = parametros
      this.us.obtenerUsuario(id).subscribe(user =>{
        let listaUser:any = user
        this.usuario = listaUser[0]
        const { iduser,nombre, apellido, ubicacion,email , imagen,telefono } = this.usuario;
        this.usuarioEdit = { iduser,nombre, apellido, ubicacion,email , imagen,telefono } ;
      })
    })
  }

  usuario:any =  {}
  usuarioEdit:any =  {}
  editarUsuario(){
    console.log(this.usuarioEdit);
    this.us.editarUsuario(this.usuarioEdit).subscribe(res =>{
      this.us.obtenerUsuario(this.usuarioEdit.iduser)
    });
  }
  passwordAnterior = ''
  passwordNueva = ''
  cambiarPassword(){
    if(this.passwordAnterior == this.usuario.password){
      
      this.us.cambiarPassword(this.usuario.iduser,{password:this.passwordNueva}).subscribe((res:any) =>{
        console.log(res.status);
        
        alert("Nueva contraseña actualizada")
      })
      alert("Nueva contraseña actualizada")
      this.us.obtenerUsuario(this.usuario.iduser)
      this.passwordAnterior = ''
      this.passwordNueva = ''
    }else{
      alert("ups la contraseña anterior es incorrecta")
    }
  }
}
