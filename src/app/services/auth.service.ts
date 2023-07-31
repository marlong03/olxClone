import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { getAuth, sendPasswordResetEmail} from 'firebase/auth'

import { AngularFirestore , AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Router } from "@angular/router";
import { User } from '../models/user';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData:any
  auth = getAuth()
  constructor(
    private afs:AngularFirestore,
    private afAuth:AngularFireAuth,
    private router:Router,
    private cs:CookieService
  ){ 
    this.afAuth.authState.subscribe((user:any) =>{
      if(user){
        this.userData = user;
        localStorage.setItem('user',JSON.stringify(this.userData))
        JSON.parse(localStorage.getItem('user')!)
        
      }else{
          localStorage.setItem('user','null')
          JSON.parse(localStorage.getItem('user')!)
        }

    })
  }
  resetPassword(email:string){
    sendPasswordResetEmail(this.auth,email).then(() =>{

    })
    .catch(err =>{
      Swal.fire("Ups! Lo sentimos no te encontramos, Registrate por favor",'','error')
    })
  }
  setUserData(user:any){
    const userRef:AngularFirestoreDocument<any> = this.afs.doc(
      `user/${user.uid}`
    );
    const userData : User = {
      uid:user.uid,
      email:user.email,
      displayName:user.displayName,
      photoURL:user.photoURL,
      emailVerified:user.emailVerified
    }
    return userRef.set(userData,{
      merge:true
    });
  }

  login(email:string,password:string){
    return this.afAuth.signInWithEmailAndPassword(email,password)
    .then((result:any) =>{
      this.setUserData(result.user)
      this.afAuth.authState.subscribe( (user:any)=>{
        return user
      })
      return true
    }).catch((err:any)=>{
      return false
    })
  }

  register(email:string,password:string){
    
    return this.afAuth.createUserWithEmailAndPassword(email,password)
    .then((result:any) =>{
        console.log("se registro algo");
        result.user?.sendEmailVerification()
        this.setUserData(result.user)
       /*  alert("MENSAJE SUCCESS") */
       Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Se creo tu usuario correctamente',
        showConfirmButton: false,
        timer: 1000
      }).then(()=>{
        this.router.navigate(['login'])
      })
      }).catch((err:any)=>{
       /*  alert("MENSAJE ERROR") */
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Lo sentimos no fue posible crear el usuario',
          showConfirmButton: false,
          timer: 1000
        }).then(()=>{
          this.router.navigate(['register'])
      })
      })
  }
  logout(){
    return this.afAuth.signOut()
    .then(()=>{
      this.cs.deleteAll()
      Swal.fire({
        position: 'top-start',
        icon: 'success',
        title: '¡Vuelve pronto! 😁',
        showConfirmButton: false,
        timer: 2000
      }).then(()=>{
        this.router.navigate(['login'])
    })
    }).catch(()=>{
      /* alert("MENSAJE ERROR") */
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Lo sentimos no fue posible crear el usuario',
        showConfirmButton: false,
        timer: 1000
      }).then(()=>{
        this.router.navigate(['register'])
    })

    })
  }
}
