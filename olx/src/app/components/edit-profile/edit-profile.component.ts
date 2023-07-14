import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
                private storage:Storage){}

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
    })
  }

  usuario:any =  {}
  usuarioEdit:any =  {}
  editarUsuario(){
    console.log(this.usuarioEdit);
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

    this.eliminarImg(this.usuario.imagen)
    const file = event.target.files[0]
    this.estadoCargando = true
    const imgRef = ref(this.storage, 'images/'+ new Date().getTime())
    uploadBytes(imgRef, file).then(res =>{
     this.imgPreview = 'https://firebasestorage.googleapis.com/v0/b/psicologiaconleila.appspot.com/o/images%2F'+ res.metadata.name+'?alt=media&token=43d0ab7b-1189-40b2-9653-ead4cc2eebc9'
      this.estadoCargando = false
      this.usuarioEdit.imagen = this.imgPreview

  })
  .catch(err =>{
    this.estadoCargando = false
      console.log(err);
  })
  }


  eliminarImg(imgName: string) {
    this.estadoCargando = true
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
