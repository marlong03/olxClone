import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Storage, ref, uploadBytes, listAll , getDownloadURL,deleteObject} from '@angular/fire/storage'
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit{
  constructor( private route:ActivatedRoute,
                private us:UsuarioService,
                private storage:Storage,
                private router:Router){}

  ngOnInit(): void {
    this.route.params.subscribe(parametros =>{
      let {id} = parametros
      this.us.obtenerUsuario(id).subscribe(user =>{
        let listaUser:any = user
        this.usuario = listaUser[0]
        const { iduser,nombre, apellido, ubicacion,email , imagen,telefono } = this.usuario;
        this.usuarioEdit = { iduser,nombre, apellido, ubicacion,email , imagen,telefono } ;
        this.imgPreview = this.usuarioEdit.imagen
      })
 // https://firebasestorage.googleapis.com/v0/b/servicio1-bb772.appspot.com/o/images%2Favatar.jpg
      /* var enlace = 'https://firebasestorage.googleapis.com/v0/b/servicio1-bb772.appspot.com/o/images%2F'++'?alt=media&token=f9966959-bb3f-4636-8eeb-de87626e36c2';
      var nombreFoto = enlace.substring(enlace.lastIndexOf('%2F') + 3, enlace.lastIndexOf('?alt'));
      console.log(nombreFoto); */
      if(id != this.idEditPerfil){
        this.router.navigate(['home'])
      }
    })
  }
  usuarioLocal = JSON.parse(localStorage.getItem('dataUser') || '[]')
  idEditPerfil = this.usuarioLocal[0].iduser;
  usuario:any =  {}
  usuarioEdit:any =  {}
  editarUsuario(){
    console.log(this.usuarioEdit);
    this.eliminarImg(this.usuario.imagen)
    this.us.editarUsuario(this.usuarioEdit).subscribe(res =>{
      this.us.obtenerUsuario(this.usuarioEdit.iduser)

      
    });
  }

  passwordAnterior = ''
  passwordNueva = ''
  cambiarPassword(){
    if(this.passwordAnterior == this.usuario.password){
      this.us.cambiarPassword(this.usuario.iduser,{password:this.passwordNueva}).subscribe((res:any) =>{
        alert("Nueva contraseña actualizada")
      })
      alert("Nueva contraseña actualizada")
      this.us.obtenerUsuario(this.usuario.iduser)
      this.passwordAnterior = ''
      this.passwordNueva = ''
    }else{
      alert("ups la contraseña anterior es incorrecta")
    }
  }


  estadoCargando = false
  imgPreview = ''
  cambiarFotoPerfil(event:any){
    const file = event.target.files[0]
    console.log(file);
    this.estadoCargando = true
    if(file.size < 5000000){
      const imgRef = ref(this.storage, 'images/'+ new Date().getTime())
      uploadBytes(imgRef, file).then(res =>{
        this.imgPreview = 'https://firebasestorage.googleapis.com/v0/b/servicio1-bb772.appspot.com/o/images%2F'+res.metadata.name+'?alt=media&token=f9966959-bb3f-4636-8eeb-de87626e36c2';
            this.estadoCargando = false
            this.usuarioEdit.imagen = this.imgPreview
            this.us.obtenerUsuario(this.usuarioEdit.iduser).subscribe(user => {
                let listaUser:any = user
                this.usuario = listaUser[0]
            });
        })
        .catch(err =>{
          this.estadoCargando = false
            console.log(err);
            this.us.obtenerUsuario(this.usuarioEdit.iduser)
        })
    }else{
      alert("Ups, Al parecer la imagen que intentas cargar pesa demasiado")
    }
  }


  eliminarImg(imgUrl: string) {
    this.estadoCargando = true
    let imgName = imgUrl.substring(imgUrl.lastIndexOf('%2F') + 3, imgUrl.lastIndexOf('?alt'));
    let imgPath = 'images/'+imgName
    const imgRef = ref(this.storage, imgPath);
    deleteObject(imgRef)
      .then(() => {
        console.log('Imagen eliminada con éxito:', imgPath);
        this.estadoCargando = false
      })
      .catch(err => {
        this.estadoCargando = false
        console.error('Error al eliminar la imagen:', imgPath, err);
      });
  }
}
//falta que se actualicen los componentes solos
