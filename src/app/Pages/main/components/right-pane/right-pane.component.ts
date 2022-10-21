import { Component, Input, ViewEncapsulation } from '@angular/core';
import { IStarShip } from 'src/app/shared/interfaces/starship.interface';
import { StarshipService } from '../../services/star-ship.service';
import { FilmDto } from './../../../../shared/dto/film.dto';

@Component({
  selector: 'app-right-pane',
  templateUrl: './right-pane.component.html',
  styleUrls: ['./right-pane.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RightPaneComponent {
  @Input('starship') set selectStarship(_starship: IStarShip) {
    this.starship = _starship;
    this.starshipKeys = Object.keys(_starship) as (keyof IStarShip)[];

    const film_ids = _starship.films.map((el) =>
      el.split('https://swapi.dev/api/films').join('')
    );

    this.starshipService.getFilms(film_ids).subscribe((films: FilmDto[]) => {
      this.films = films;
    });
  }

  starship!: IStarShip;
  starshipKeys!: (keyof IStarShip)[];
  films!: FilmDto[];

  constructor(private starshipService: StarshipService) {}

  public getStarshipValue(key: keyof IStarShip) {
    return this.starship[key] as string;
  }
}
