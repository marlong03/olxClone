import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private authService:AuthService,
              private us:UsuarioService,
              private route:Router){}
    loginUser:any = {
      email:'',
      password:''
    }
    cargandoInicioSesion = false
    login(loginUser:any){
      if(this.loginUser.email != '' && this.loginUser.password != ''){

      this.cargandoInicioSesion = true
      this.authService.login(loginUser.email,loginUser.password).then(res =>{

        console.log(res);
        if(res == true){
       this.us.obtenerUsuarioPorEmail(loginUser.email).subscribe(user =>{

         if(user){
            
            localStorage.setItem('dataUser',JSON.stringify(user))
            setTimeout(()=>{
              this.cargandoInicioSesion = false

              this.route.navigate(['home'])
            },1000)
          }
          
        })
      }else if(res == false){
        this.cargandoInicioSesion = false
        alert("Revisa por favor los datos ingresados")   
      }
       
      }).catch(()=>{
        alert("fuerraa")
      })
    }else{
      this.cargandoInicioSesion = false
      alert("valida los datos nuevamente por favor")

    }

    }
    resetPassword(){
      let email:string  = prompt('¿Olvidaste tu contraseña? Introduce un email registrado por favor') || ''
      if(email != '' && email.includes('@') && email.includes('.')){
        this.authService.resetPassword(email)
      }else{
        alert("Por favor introduce un correo valido")
      }
    }
}
