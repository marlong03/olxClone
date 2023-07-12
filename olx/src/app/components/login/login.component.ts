import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private authService:AuthService,
              private us:UsuarioService){}
    loginUser:any = {
      email:'',
      password:''
    }
    login(loginUser:any){
      this.authService.login(loginUser.email,loginUser.password).then(res =>{
       /*  localStorage.setItem('userDates',JSON.stringify()) */
       console.log();
       this.us.obtenerUsuarioPorEmail(loginUser.email).subscribe(user =>{
          localStorage.setItem('dataUser',JSON.stringify(user))
       })
       
      })
    }
    resetPassword(){
      this.authService.resetPassword()
    }
}
