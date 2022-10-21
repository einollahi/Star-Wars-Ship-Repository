import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  public getLoadingStatus(): Observable<boolean> {
    return this.loading.asObservable();
  }

  public enable(): void {
    this.loading.next(true);
  }

  public disable(): void {
    this.loading.next(false);
  }
}
