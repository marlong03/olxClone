import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private cs:CategoriaService,
              private authService:AuthService,
              private router:Router){}

  ngOnInit(): void {
    this.obtenerCategorias()
   

    if(this.usuarioLocal.length == 1){
      this.userLogged = true
    }
  }
  userLogged = false
  usuarioLocal = JSON.parse(localStorage.getItem('dataUser') || '[]')
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
  logout(){
    
  }
  cerrarSesion(){
    this.authService.logout();
    this.router.navigate(['/login'])
    localStorage.removeItem('dataUser')
  }
  
}
