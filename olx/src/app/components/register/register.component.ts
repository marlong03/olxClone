import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private authService:AuthService,
              private us:UsuarioService){}
  registerUser:any = {
    email:'',
    password:''
  }
  register(){
   /*  .then(()=>{ */
   this.us.obtenerUsuarioPorEmail(this.datesUserDB.email).subscribe((x:any)=>{
    if(x.length == 0){
      this.us.crearUsuario(this.datesUserDB).subscribe((x)=>{
        this.authService.register(this.datesUserDB.email,this.datesUserDB.password).then((res)=>{
          console.log(res);
          alert("se creo tu usuario correctamente")
        }).catch(err=>{
          alert("no se pudo crear el usuario para autenticar")
        })
        console.log(x);
      })
      return true
    }else{
      alert("lo sentimos no fue posible crear el usuario")
      return false
    }
    
    
    
   })
      
   /*  }) */
   /*  .catch(()=>{
      return false
    
    }) */
  }
  paises = ["bogotá","bucaramanga","rio negro","medellin","la vega"]
  datesUserDB:any = {
    "iduser": 0,
    "nombre": "",
    "apellido": "",
    "ubicacion": "",
    "email": "",
    "password": "",
    "imagen": "assets/imgs/default-avatar.jpg",
    "telefono": ""
  }
  registerDB(){
    console.log(this.datesUserDB);
    this.register()
   
  
    
  }
  
}
