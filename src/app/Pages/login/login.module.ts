import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '@angular/router';
import { UiElementModule } from 'src/app/shared/modules/ui-element.module';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

const routes: Routes = [{ path: '', component: LoginComponent }];

const materialModules = [
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatDividerModule,
];
const modules = [UiElementModule, ...materialModules];
@NgModule({
  declarations: [LoginComponent],
  imports: [RouterModule.forChild(routes), ...modules],
  exports: [RouterModule],
})
export class LoginModule {}
