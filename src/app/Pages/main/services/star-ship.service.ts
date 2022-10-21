import {
  concatMap,
  flatMap,
  forkJoin,
  map,
  mergeMap,
  Observable,
  of,
  tap,
} from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from './../../../core/services/http.service';
import { StarShipsDto } from 'src/app/shared/dto/starships.dto';
import { FilmDto } from 'src/app/shared/dto/film.dto';

@Injectable({ providedIn: 'root' })
export class StarshipService {
  constructor(private httpService: HttpService) {}

  public getStarships(params = {}): Observable<StarShipsDto> {
    return this.httpService.get<StarShipsDto>('/starships', params);
  }

  public getFilm(id: string): Observable<FilmDto> {
    return this.httpService.get<FilmDto>('/films' + id);
  }

  public getFilms(ids: string[]): Observable<FilmDto[]> {
    const filmApiRequests = ids.map((id) => this.getFilm(id));

    return forkJoin(filmApiRequests);
  }
}
