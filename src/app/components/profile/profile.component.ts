import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(private route:ActivatedRoute,
              private us:UsuarioService,
              private router:Router){}
  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      let {id} = params
      console.log(params);
      this.obtenerUsuario(id)
      if(this.usuarioLocal.length == 1){
        this.userLogged = true
        if(parseInt(this.usuarioLocal[0].iduser) == parseInt(id)){
          this.permiseEdit = true
        }else{
          this.permiseEdit = false
        }
      }else{
        this.userLogged = true
      }
      /* if(id != this.idEditPerfil){
        this.router.navigate(['home'])
      } */
     
    })
  }
  permiseEdit = false
  userLogged = false
  usuarioLocal = JSON.parse(localStorage.getItem('dataUser') || '[]')
  idEditPerfil = 0 ;
  usuario:any
  obtenerUsuario(id:any){
    this.us.obtenerUsuario(parseInt(id)).subscribe((usuario:any)=>{
      let listaUsuarios:any = usuario
      this.idEditPerfil = listaUsuarios[0].iduser
      console.log(listaUsuarios[0].iduser);
      
      if(listaUsuarios.length == 0){
        this.router.navigate(['home'])
    }else{

      this.usuario = listaUsuarios[0]
      this.idEditPerfil = listaUsuarios[0].iduser
    }
    })
    
  }
  
}
