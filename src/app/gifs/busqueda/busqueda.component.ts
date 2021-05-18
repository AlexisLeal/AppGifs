import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../service/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
})
export class BusquedaComponent implements OnInit {

  constructor(private gifsService:GifsService) { }

  ngOnInit(): void {
  }

  //OTRA FORMA DE HACER POR QUE TAMBIEN SE PUEDE CON EL NGMODEL pero con ese solo manipulamos el valor y aqui estamos mas libres
  //Lo que hace le ViewChild va a buscar al html va a buscar un elemento que tenga una referencia local es la que esta en '' y lo va asignar
  // a una variable de typeScrip en este caso llamada txtBuscar
  @ViewChild('txtBuscar')txtBuscar!:ElementRef<HTMLInputElement>;
  //El signo de ! en la variable txtBuscar se le conoce como no nullall assertion operator o un operador para segurarese que el objeto no es nulo 


  Buscar():void{
    const valor:string = this.txtBuscar.nativeElement.value;

    //console.log(valor); 
    //validar los vacios 
    if(valor.trim().length === 0){
      return;
    }

    this.gifsService.buscarGifs(valor);

    this.txtBuscar.nativeElement.value = "";


  }
}
