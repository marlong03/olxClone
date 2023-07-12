import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private authService:AuthService){}
  registerUser:any = {
    email:'',
    password:''
  }
  register(registerUser:any){
    this.authService.register(registerUser.email,registerUser.password)
  }
  
}
