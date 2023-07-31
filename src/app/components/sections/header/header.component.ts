import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private cs:CategoriaService,
              private authService:AuthService,
              private router:Router,
              ){}
 //eliminar cookies
 
  ngOnInit(): void {
    this.obtenerCategorias()
    
    if(this.usuarioLocal.length == 1){
      this.userLogged = true
    }
  }
  cargandoCerrarSesion = false
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
    this.cargandoCerrarSesion = true
    this.authService.logout().then(()=>{
      localStorage.removeItem('user')
      localStorage.removeItem('dataUser')
      localStorage.clear()

      setTimeout(()=>{
        this.cargandoCerrarSesion = false
        this.router.navigate(['login'])

      },1500)

    })
  }
  click(){
    Swal.fire("hola")
  }
  
}
