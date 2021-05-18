import { Component, OnInit } from '@angular/core';
import { GifsService } from 'src/app/gifs/service/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {

  constructor(private gifsService:GifsService) { }

  get historial(){
    return this.gifsService.historial;
  }

  buscar(item:string):void{
    this.gifsService.buscarGifs(item);

  }

  ngOnInit(): void {
  }

}
