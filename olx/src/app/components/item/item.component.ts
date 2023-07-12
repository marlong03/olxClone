import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticuloService } from 'src/app/services/articulo.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  constructor(private as:ArticuloService,
              private route:ActivatedRoute,
              private router:Router){}
  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      let {id} = params
      console.log(id);
      this.obtenerItem(id)
      
    })
  }
  permiseEdit = false
  userLogged = false
  usuarioLocal = JSON.parse(localStorage.getItem('dataUser') || '[]')
  articulo:any
   obtenerItem(id:number){
    this.as.obtenerArticuloDB(id).subscribe((articulo)=>{
      
      let listaArticulos:any = articulo
      if(listaArticulos.length == 0){
          this.router.navigate([''])
      }else{
          this.articulo = listaArticulos[0]
          if(this.usuarioLocal.length == 1){
              this.userLogged = true
              if(parseInt(this.usuarioLocal[0].iduser) == this.articulo.user_iduser.id){
                  this.permiseEdit = true
              }else{
                  this.permiseEdit = false
              }
          } 
      }
    })
  }
}
