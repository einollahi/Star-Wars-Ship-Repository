import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
// import { MatTableDataSource } from '@angular/material/table';
import { IStarShip } from 'src/app/shared/interfaces/starship.interface';
import { StarshipService } from '../../services/star-ship.service';

@Component({
  selector: 'app-left-pane',
  templateUrl: './left-pane.component.html',
  styleUrls: ['./left-pane.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LeftPaneComponent implements OnInit {
  starships: IStarShip[] = [];
  totalCount!: number;
  currentPage = 1;
  limit = 10;
  pageIndex = 0;

  @Output() select: EventEmitter<IStarShip> = new EventEmitter<IStarShip>();
  constructor(private starshipService: StarshipService) {}

  ngOnInit(): void {
    this.fetchStarshipData();
  }

  private fetchStarshipData(page?: number): void {
    const param: { page?: number } = {};

    if (page) param.page = page;

    this.starshipService.getStarships(param).subscribe((res) => {
      this.totalCount = res.count;
      this.starships = res.results;
      this.onSelect(this.starships[0]);
    });
  }

  public onSelect(starship: IStarShip): void {
    this.select.emit(starship);
  }

  public changePagination(event: PageEvent) {
    this.fetchStarshipData(event.pageIndex + 1);
  }
}
