import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
   constructor(private route:ActivatedRoute){}
   nombreCategoria:any
   inputHome = "null"
  ngOnInit(): void {
    this.route.params.subscribe((parametros:any) =>{
      let {nombre} = parametros
     
      this.nombreCategoria = nombre

    })
  }
  
}
