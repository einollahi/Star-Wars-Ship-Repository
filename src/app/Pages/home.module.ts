import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { NavbarComponent } from '../layout/navbar/navbar.component';

const modules = [CommonModule];
const materialModules = [
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatProgressBarModule,
];

@NgModule({
  declarations: [NavbarComponent],
  imports: [HomeRoutingModule, ...modules, ...materialModules],
  exports: [RouterModule],
  providers: [],
})
export class HomeModule {}
