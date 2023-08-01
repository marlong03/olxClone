import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Storage, ref, uploadBytes, listAll , getDownloadURL,deleteObject} from '@angular/fire/storage'
import Swal from 'sweetalert2';
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
      console.log(parametros);
      
      this.us.obtenerUsuario(id).subscribe(user =>{
        console.log("Se obtuvo un usuario");
        
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
     /*  if(id != this.idEditPerfil){
        this.router.navigate(['home'])
      } */
      console.log(id);
      console.log(this.idEditPerfil);
      if(parseInt(id) != this.idEditPerfil){
        this.router.navigate(['home'])
      }
      
    })
  }
  usuarioLocal = JSON.parse(localStorage.getItem('dataUser') || '[]')
  idEditPerfil = this.usuarioLocal[0].iduser;
  usuario:any =  {}
  usuarioEdit:any =  {}
  paises = ["bogotá","bucaramanga","rio negro","medellin","la vega","tunja","villavicencio","valledupar","cartagena","santa marta"]
  editarUsuario(){
    console.log(this.usuarioEdit);
    
    this.us.editarUsuario(this.usuarioEdit).subscribe(res =>{
      this.us.obtenerUsuario(this.usuarioEdit.iduser).subscribe(()=>{
     
      })

      
    });
    //
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Has actualizado tu perfil',
      showConfirmButton: false,
      timer: 1000
    }).then(()=>{
      this.router.navigate(['/profile/'+this.idEditPerfil])
    })
  }

  


  estadoCargando = false
  imgPreview = ''
  cambiarFotoPerfil(event:any){
    this.eliminarImg(this.usuario.imagen)
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
              this.editarUsuario()
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
      //
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'No pudimos cargar tu imagen, pesa demaciado',
        showConfirmButton: false,
        timer: 1000
      })
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
