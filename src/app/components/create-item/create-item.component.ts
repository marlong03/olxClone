import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticuloService } from 'src/app/services/articulo.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Storage, ref, uploadBytes, listAll , getDownloadURL,deleteObject} from '@angular/fire/storage'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss']
})
export class CreateItemComponent implements OnInit {
  constructor(private route:ActivatedRoute,
              private router:Router,
              private as:ArticuloService,
              private cs:CategoriaService,
              private storage:Storage){}
  ngOnInit(): void {
    //Traer Usuario
      this.usuario =  JSON.parse(localStorage.getItem('dataUser') || '[]')
      if(this.usuario.length == 0){
          this.router.navigate([''])
      }else{
        this.articuloNew.user_iduser = this.usuario[0]['iduser']
      }
    //Traer Categorias
      this.cs.obtenerCategoria().subscribe(categorias =>{
          this.categorias = categorias
          console.log(this.categorias);
      })
  }
    
    categorias:any
    usuario = []
    articuloNew:any = {
      idarticulo: 0,
      titulo: "",
      precio: "0",
      descripcion: "",
      fecha:"2022-01-01" , /* new Date(Date.now()).toLocaleDateString() */
      situacion:"Disponible" ,
      imagen: "",
      categoria_idcategoria:0,
      user_iduser:"",
      estado:""
    }

    estadoCargando = false
    imgVistaPrevia = 'assets/imgs/no-image.png'
    cargarImg(event:any){
      const file = event.target.files[0]
      console.log(file);
      this.estadoCargando = true
      if(file.size < 5000000){
       /*  this.eliminarImg(this.usuario.imagen) */
          const imgRef = ref(this.storage, 'images/'+ new Date().getTime())
          uploadBytes(imgRef, file).then((res:any) =>{
          this.imgVistaPrevia = 'https://firebasestorage.googleapis.com/v0/b/servicio1-bb772.appspot.com/o/images%2F'+ res.metadata.name+'?alt=media&token=0a8f8d75-9e57-4ebc-821f-827b2595bd16'
          this.articuloNew.imagen = this.imgVistaPrevia
          this.estadoCargando = false
              /* this.us.obtenerUsuario(this.usuarioEdit.iduser).subscribe(user => {
                  let listaUser:any = user
                  this.usuario = listaUser[0]
              }); */
          })
          .catch(err =>{
            this.estadoCargando = false
              console.log(err);
          })
        }
    }
  
    crearArticulo(){
      if(this.articuloNew.titulo != "" && 
        this.articuloNew.precio != "" &&
        this.articuloNew.categoria_idcategoria != 0 &&
        this.articuloNew.estado != "" &&
        this.articuloNew.imagen != ""){
          
          this.as.crearArticulo(this.articuloNew).subscribe(res =>{
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Has creado un nuevo articulo',
              showConfirmButton: false,
              timer: 1000
            }).then(()=>{
              this.router.navigate(['home'])
            })
            console.log(res);
            
          })
        }else{
          Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Todavia faltan datos por llenar',
            showConfirmButton: false,
            timer: 1000
          })

        }
      console.log(this.articuloNew);
      
    }

    categoriaSeleccionada: any = ""
    seleccionarCategoria(categoria:any) {
      this.articuloNew.categoria_idcategoria = categoria.idcategoria;
      this.categoriaSeleccionada = categoria.nombre
      console.log('Categoría seleccionada:', categoria.idcategoria);
    }

    estadoSeleccionado = ""
    seleccionarEstado(estado:any) {
      this.articuloNew.estado = estado;
      this.estadoSeleccionado = estado
      console.log('Categoría seleccionada:', estado);
    }
}
