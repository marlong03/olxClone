import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private cs:CategoriaService){}

  ngOnInit(): void {
    this.obtenerCategorias()
  }

  @Output() valueChanged = new EventEmitter<string>();
  mostrarQuitarFiltro = false
  sendValue(value:string) {
    if(value == "null"){
      this.mostrarQuitarFiltro = false
    }else{
      this.mostrarQuitarFiltro = true
    }
    this.valueChanged.emit(value);
  }


  
  categorias:any 
  obtenerCategorias(){
    this.cs.obtenerCategoria().subscribe((categoria:any)=>{
      let listaCategorias = categoria
      this.categorias = listaCategorias
    })
  }
  seleccionarCategoria(id:number){
  }
}
