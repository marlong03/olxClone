import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private authService:AuthService,
              private us:UsuarioService,
              private router:Router){}
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
         
        }).catch(err=>{
          
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Lo sentimos no fue posible crear tu usuario',
            showConfirmButton: false,
            timer: 1000
          }).then(()=>{
            this.router.navigate(['register'])
        })

        })
        console.log(x);
      })
      return true
    }else{
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Lo sentimos no fue posible crear tu usuario',
        showConfirmButton: false,
        timer: 1000
      }).then(()=>{
        this.router.navigate(['register'])
    })
      return false
    }
    
    
    
   })
      
   /*  }) */
   /*  .catch(()=>{
      return false
    
    }) */
  }
  paises = ["bogotá","bucaramanga","rio negro","medellin","la vega","tunja","villavicencio","valledupar","cartagena","santa marta"]
  datesUserDB:any = {
    "iduser": 0,
    "nombre": "",
    "apellido": "",
    "ubicacion": "Ubicación",
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
