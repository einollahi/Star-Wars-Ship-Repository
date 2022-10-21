import { Component } from '@angular/core';
import { IStarShip } from 'src/app/shared/interfaces/starship.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  selectedStarship!: IStarShip;

  selectRow(starship: IStarShip): void {
    this.selectedStarship = starship;
  }
}
