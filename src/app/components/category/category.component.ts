import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  constructor (private route:ActivatedRoute){}
  ngOnInit() {
    this.route.params.subscribe(parametros =>{
      let {nombre } = parametros
      this.onValueChanged(nombre)
    })
/*     this.onValueChanged('hogar') */
  }
  valorDelPadre: string = "";

  onValueChanged(value: string) {
    this.valorDelPadre = value;
    console.log(this.valorDelPadre);
    
  }
}
