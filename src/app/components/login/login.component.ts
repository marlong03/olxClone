import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
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
        //
     
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Revisa por favor los datos ingresados',
        showConfirmButton: false,
        timer: 1000
      })
      }
       
      }).catch(()=>{
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'Lo sentimos, no fue posible iniciar sesíon',
          showConfirmButton: false,
          timer: 1000
        })
      })
    }else{
      this.cargandoInicioSesion = false
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Revisa por favor los datos ingresados',
        showConfirmButton: false,
        timer: 1000
      })
      

    }

    }
    async resetPassword(){
      
        const { value: email } = await Swal.fire({
          title: 'Por favor introduce un correo registrado',
          input: 'email',
          inputLabel: 'Correo registrado',
          inputPlaceholder: 'Correo registrado'
        })
        
        if (email) {
          this.authService.resetPassword(email)
          Swal.fire(`Hemos enviado cambio de contraseña al correo: ${email}`)
        }
    }
}
