import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { getAuth, sendPasswordResetEmail} from 'firebase/auth'

import { AngularFirestore , AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Router } from "@angular/router";
import { User } from '../models/user';

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
  resetPassword(){
  /*   console.log(this.userData); */
      console.log("holasds");
      
    sendPasswordResetEmail(this.auth,"marlongyes@gmail.com").then(() =>{
      alert("SE HA ENVIADO RESET PASSWORD")
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
        if(user){
          this.router.navigate(['home']);
        }
      })
    }).catch((err:any)=>{
      alert("MENSAJE ERROR")
    })
  }

  register(email:string,password:string){
    
    return this.afAuth.createUserWithEmailAndPassword(email,password)
    .then((result:any) =>{
        console.log("se registro algo");
        result.user?.sendEmailVerification()
        this.setUserData(result.user)
        alert("MENSAJE SUCCESS")
        
      }).catch((err:any)=>{
        alert("MENSAJE ERROR")
      })
  }
  logout(){
    return this.afAuth.signOut()
    .then(()=>{
      alert("MENSAJE SUCCESS")
      setTimeout(()=>{

        localStorage.removeItem('user')
        this.router.navigate(['login'])
      },1500)
    }).catch(()=>{
      alert("MENSAJE ERROR")

    })
  }
}
