import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn:'root'
})
export class permisosGuard  implements CanActivate  {
  constructor(private route:Router,
              ){}
              
  canActivate(){
    if(this.hasUser()){
        return true
    }
      this.route.navigate(['/home'])
      return false
  }
  user = JSON.parse(localStorage.getItem('dataUser') || '[]')
  hasUser(){
    if(this.user.length == 1){
      return true
    } 
    return false
  }
}
