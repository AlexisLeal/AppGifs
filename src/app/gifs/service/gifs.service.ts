import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  // Lo que hace el providedIn: 'root' eleva a un nivel global el servicio y ya no es necesario declaro en el module 
  providedIn: 'root'
})
export class GifsService {

  constructor(private httpclient:HttpClient) {
     //Nota cuando recargamos la pagina vuelve entrar al constructor 


    //Aqui es el lugar correcto para ejecurar el local storage y solo se ejecuta una vez 
    //CHECAR BIEN LA LOGICA SOLO SE EJECUTA UNA VEZ

    this._historial = JSON.parse(localStorage.getItem("Historial")!) || [];
    // el parse regresa el parametro a como estaba antes del stringify 
    // el ! le decimos que confie en nosotros llamado aserción no nula

   
    this.resultados = JSON.parse(localStorage.getItem("Resultados")!) || [];
   }
  private _apiKye:string = "ykfGt9Q0RcsZLjIlVNk5nsuG0hcX7XLE";

  private servicioURL:string = "https://api.giphy.com/v1/gifs";

  private _historial:string[] = [];
 
  public resultados:Gif [] = [];

  /*
   se pone a si [...this._historial] para romper la relacion pero para que ? si no nosotros hacemmos una mofificacion a  la propiedad
   get historial() posiblemente pueda moficiar el arreglo ORIGINAL por que por de default esta por referencia y por eso le ponemoos 
   el [...] para hacer solo una copia 
  */
  get historial(){
   // this._historial = this._historial.splice(0,10);
    return[...this._historial];
  }
  buscarGifs(query:string){

    query = query.trim().toLowerCase();
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      

      this._historial = this._historial.splice(0,10);

      //Vamos almacenarlo en el localStorage del navegador osea en la cache del servidor 
      //SI TENIA INFORMACION LA ELIMINA Y PONE THIS._HISTORIAL ACTUALIZADO 
      localStorage.setItem('Historial',JSON.stringify(this._historial));
      //JSON.stringify(this._historial) Para convertir el arreglo en string 

    }
    //es la forma de crear parametros para un URL 
    const parametros = new HttpParams()
    .set('api_key',this._apiKye)
    .set('limit','10')
    .set('q',query);

    // this.httpclient.get<SearchGifsResponse>( `https://api.giphy.com/v1/gifs/search?api_key=${this._apiKye}&q=${query}&limit=10`)
    //el params es una palabra reservada del lenguaje y le decimos que es de tipo parametros que le declaramos arriba 
    
    this.httpclient.get<SearchGifsResponse>( `${this.servicioURL}/search`,{params:parametros})
          .subscribe((resp) =>{
            console.log(resp.data);
            this.resultados = resp.data
            //CHECAR MUY BIEN LA INTERFACE 

            //ALMACENAMOS LOS ULTIMOS RESULTADOS EN EL NAVEGADOR 
    localStorage.setItem('Resultados',JSON.stringify(this.resultados));
           
            //  resp.data[0].images.downsized_medium recuerda que la data es un arrglo 
          });
          //en el get con la interface que pusimos le dice hey la respues luce como la interface que pusiste pero no lo mapea 
          //hay que utlizar el `` para poner le interpolacion de string 

    // el this.httpclient.get hace la consulta a la url que le estamos pasando       
    //El subcribe se va ejecutar cuando tengamos la resolucion del get
    //La palabra resp es una palabra que hicimos noosotros pero pudimos crear cualquier otra, hace referencia a la respuesta que obtenemos 
    //Ponemos de tipo any para poder utlizar la data 
    //Estas peticiones retorna observables y con eso podemos añadir funciones y mucho mas cosas 

    //el get es de tipo generico por eso le ponemos la interface que creamos gracias ala pagina app.quicktype.io

    console.log(this._historial);
    //Luego cuando termina la funcion y vuelve de nuevo el arreglo se sobreescribre 

  }
}
