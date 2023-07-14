import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticuloService } from 'src/app/services/articulo.service';

@Component({
  selector: 'app-edir-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {
  constructor(private route:ActivatedRoute,
              private as:ArticuloService){}
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
            
          })
      })
  }
    
    articulo:any = {}
    articuloEdit:any = {
      idarticulo: this.articulo.idarticulo,
      titulo: this.articulo.titulo,
      precio: this.articulo.precio,
      descripcion: this.articulo.descripcion,
      fecha: this.articulo.fecha,
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
      this.as.editarArticuloDB(this.articuloEdit).subscribe(res =>{
        console.log(res);
        alert("se logro actualizar el articulo")
        this.as.obtenerArticuloDB(this.articulo.idarticulo)

        
      })
      

    }
}
