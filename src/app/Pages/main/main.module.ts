import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { Routes, RouterModule } from '@angular/router';
import { UiElementModule } from 'src/app/shared/modules/ui-element.module';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

import { LeftPaneComponent } from './components/left-pane/left-pane.component';
import { RightPaneComponent } from './components/right-pane/right-pane.component';

const routes: Routes = [{ path: '', component: MainComponent }];

const materialModules = [
  MatTableModule,
  MatPaginatorModule,
  MatCardModule,
  MatListModule,
  MatDividerModule,
];

@NgModule({
  declarations: [MainComponent, LeftPaneComponent, RightPaneComponent],
  imports: [UiElementModule, ...materialModules, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainModule {}
