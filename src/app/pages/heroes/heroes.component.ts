import { Component, OnInit } from '@angular/core';
import { HeroeModelo } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {
  heroes: HeroeModelo [] = [];
  cargando = false;

  heroe = new HeroeModelo();

  constructor( private heroesServie: HeroesService
    ) { }

  ngOnInit() {
    this.cargando = true;
    this.heroesServie.getHeroes()
    .subscribe( resp => {
      console.log(resp);
     this.heroes = resp;
     this.cargando = false;
    });
  }

  borrarHeroe( heroe: HeroeModelo){
    this.heroesServie.borrarHeroe( heroe.id ).subscribe();

  }

}
