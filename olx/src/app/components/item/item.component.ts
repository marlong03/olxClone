import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticuloService } from 'src/app/services/articulo.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  constructor(private as:ArticuloService,
              private route:ActivatedRoute){}
  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      let {id} = params
      console.log(id);
      this.obtenerItem(id)
    })
  }
  articulo:any
   obtenerItem(id:number){
    this.as.obtenerArticuloDB(id).subscribe((articulo)=>{
      let listaArticulos:any = articulo
      this.articulo = listaArticulos[0]
      console.log(this.articulo);
    })
  }
  
}
