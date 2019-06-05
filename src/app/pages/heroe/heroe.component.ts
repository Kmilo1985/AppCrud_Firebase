import { Component, OnInit } from '@angular/core';
import { HeroeModelo } from 'src/app/models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModelo();

  constructor(private heroesService: HeroesService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id'); //leer id de el URL  PARA ESO SE USA ESTE METODO

    console.log(id);

    if (id !== 'nuevo') {
        this.heroesService.getHeroe( id )
        .subscribe( (resp: HeroeModelo) => {
          this.heroe = resp;
          this.heroe.id = id
          // console.log( resp);
        });
    }
  }

  guardar( form: NgForm) {

      if( form.invalid) {
        console.log('formulario no valido');
        return ;
      }

      Swal.fire({
        title:'espere',
        text:'guardando infomacion',
        allowOutsideClick: false
      });
      Swal.showLoading();

      let peticion: Observable<any>;

      if ( this.heroe.id) {

        peticion = this.heroesService.actualizarHeroe(this.heroe);


      } else {
        peticion = this.heroesService.crearHeroe( this.heroe );

      }

      peticion.subscribe( resp => {

        Swal.fire({
          title: this.heroe.nombre,
          text: 'Heroe actualizado satisfactoriamente',
        });
        Swal.showLoading();


      });
  }



}
