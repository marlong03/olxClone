import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(private route:ActivatedRoute,
              private us:UsuarioService){}
  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      let {id} = params
      console.log(id);
      this.obtenerUsuario(id)
       
    })
  }
  idEditPerfil = 1;
  usuario:any
  obtenerUsuario(id:number){
    this.us.obtenerUsuario(id).subscribe((usuario:any)=>{
      let listaUsuarios:any = usuario
      this.usuario = listaUsuarios[0]
      console.log(this.usuario);
    })
    
  }
  
}
