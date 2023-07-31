import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticuloService } from 'src/app/services/articulo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edir-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {
  constructor(private route:ActivatedRoute,
              private as:ArticuloService,
              private router:Router){}
  ngOnInit(): void {
      this.route.params.subscribe(parametros =>{
          let {id} = parametros
          this.as.obtenerArticuloDB(id).subscribe( (articulo:any) =>{
            console.log(articulo);
            let listaArticulos:any = articulo
            this.articulo =  listaArticulos[0]
            const { idarticulo, titulo, precio, fecha, situacion, descripcion, imagen, estado } = this.articulo;
            this.articuloEdit = { idarticulo, titulo, precio, fecha, situacion, descripcion, imagen, estado };
            console.log(this.articuloEdit);
            this.creadorArticulo = listaArticulos[0].user_iduser.id 
          if(parseInt(this.articulo.user_iduser.id) != this.idEditPerfil){
            this.router.navigate(['home'])
          }
          })
        /*   if(this.creadorArticulo != this.idEditPerfil){
            this.router.navigate(['home'])
          } */
          
          
          
         
          

      })
     
     
  }
  usuarioLocal = JSON.parse(localStorage.getItem('dataUser') || '[]')
  idEditPerfil = this.usuarioLocal[0].iduser;
    creadorArticulo = 0
    articulo:any = {}
    articuloEdit:any = {
      idarticulo: this.articulo.idarticulo,
      titulo: this.articulo.titulo,
      precio: this.articulo.precio,
      descripcion: this.articulo.descripcion,
      fecha: "2023-01-01",
      situacion: this.articulo.situacion,
      imagen: this.articulo.imagen,
      categoria_idcategoria:1,
      user_iduser:1,
      estado:this.articulo.estado
      //faltan foraneas
    }
   /*  {
      "idarticulo": 5,
      "titulo": "caja misteriosa editada",
      "precio": "5000",
      "descripcion": "esta es una caja misteriosa",
      "fecha": "2023-07-06T05:00:00.000Z",
      "situacion": "disponible",
      "imagen": "https://img.freepik.com/vector-gratis/etiqueta-engomada-caja-vacia-abierta-sobre-fondo-blanco_1308-68243.jpg?w=2000",
      "categoria_idcategoria":5,
      "user_iduser": 3,
      "estado": "nuevo"
    } */
    editarArticulo(){
      this.articuloEdit.fecha = "2023-01-01"
      this.articuloEdit.categoria_idcategoria=1,
      this.articuloEdit.user_iduser=this.idEditPerfil,
      console.log(this.articuloEdit);
      
      this.as.editarArticuloDB(this.articuloEdit).subscribe(res =>{
        console.log(res);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Has actualizado el artículo',
          showConfirmButton: false,
          timer: 1000
        }).then(()=>{
          this.router.navigate(['/item/'+this.articuloEdit.idarticulo])
        })
        this.as.obtenerArticuloDB(this.articulo.idarticulo)

        
      })
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Has actualizado el artículo',
        showConfirmButton: false,
        timer: 1000
      }).then(()=>{
        this.router.navigate(['/item/'+this.articuloEdit.idarticulo])
      })
      this.as.obtenerArticuloDB(this.articulo.idarticulo)
      

    }
    eliminarArticulo(){
      Swal.fire({
        title: '¿Seguro quieres eliminar el artículo?',
        showCancelButton: true,
        confirmButtonText: 'Eliminar articulo',
      }).then((result) => {
        if (result.isConfirmed) {
          this.as.eliminarArticulo(this.articulo.idarticulo).subscribe(()=>{
            Swal.fire('Has eliminado el artículo', '', 'success').then(()=>{
              this.router.navigate(['home'])
            })
           })
        } 
      })
    }
}
