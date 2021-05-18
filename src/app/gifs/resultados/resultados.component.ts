import { Component, OnInit } from '@angular/core';
import { GifsService } from '../service/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
})
export class ResultadosComponent implements OnInit {

  constructor(private gifsService:GifsService) { }

  get resultados(){
    return this.gifsService.resultados;
  }

  ngOnInit(): void {
  }

}
