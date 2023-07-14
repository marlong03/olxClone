import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticuloService } from 'src/app/services/articulo.service';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss']
})
export class CreateItemComponent implements OnInit {
  constructor(private route:ActivatedRoute,
              private router:Router,
              private as:ArticuloService,
              private cs:CategoriaService){}
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
      fecha: new Date().getTime(),
      situacion:"Disponible" ,
      imagen: "https://innovationmarketing.files.wordpress.com/2019/10/vender-nuevos-productos.jpg",
      categoria_idcategoria:0,
      user_iduser:"",
      estado:""
    }
  
    crearArticulo(){
      if(this.articuloNew.titulo != "" && 
        this.articuloNew.precio != "" &&
        this.articuloNew.categoria_idcategoria != 0 &&
        this.articuloNew.estado != ""){
          
          this.as.crearArticulo(this.articuloNew).subscribe(res =>{
            alert("se haa creado un nuevo articulo")
            console.log(res);
            
          })
        }else{
          alert("Todavia faltan datos por llenar")
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
