import { Injectable } from '@angular/core';
import { HeroeModelo } from '../models/heroe.model';
import { HttpClient } from '@angular/common/http';
import { map, delay } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://appheroes-cd765.firebaseio.com';

  constructor( private http: HttpClient) { }

  // eliminar heroe
  borrarHeroe( id: string){

    return this.http.delete(`${ this.url}/heroes/${ id }.json`);

  }


  // edito el heroe listado
  getHeroe( id: string ){
    console.log( id );
    return this.http.get(`${ this.url}/heroes/${ id }.json`);
  }

  // metodo create
  crearHeroe( heroe: HeroeModelo){

    return this.http.post(`${ this.url }/heroes.json`, heroe)
    .pipe(
      map( (resp: any) => {
        heroe.id = resp.name;
        return heroe;
      })
    );
  }

  // metodo create
  actualizarHeroe( heroe: HeroeModelo){

    const heroeTemp = {
      ...heroe
    };
    delete heroeTemp.id;

    return this.http.put(`${ this. url }/heroes/${ heroe.id }.json`, heroe);
  }

  getHeroes() {
    return this.http.get(`${ this.url }/heroes.json`)
    .pipe(
      map( this.crearArreglo ),
      delay(1500)
    );

  }

  crearArreglo( heroesObj: object) {

    const heroes: HeroeModelo[] = [];

    console.log(heroesObj);

    if (heroesObj === null) { return []}

    Object.keys( heroesObj ).forEach( key =>
    {
      const heroe: HeroeModelo = heroesObj[key];
      heroe.id = key;
      heroes.push(heroe);
    });
    return heroes;
  }



}
