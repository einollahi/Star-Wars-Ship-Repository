import { IStarShip } from './../interfaces/starship.interface';

export interface StarShipsDto {
  count: number;
  next: string | null;
  previous: string | null;
  results: IStarShip[];
}
