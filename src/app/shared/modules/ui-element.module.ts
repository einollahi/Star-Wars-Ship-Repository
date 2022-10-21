import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';

import { InputComponent } from '../components/ui-elements/input/input.component';
import { KeyValueComponent } from '../components/ui-elements/key-value/key-value.component';

const materialModules = [
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatCheckboxModule,
  MatTooltipModule,
  MatAutocompleteModule,
  MatSelectModule,
];

const module = [CommonModule, ReactiveFormsModule, materialModules];

const components = [InputComponent, KeyValueComponent];

@NgModule({
  declarations: [components],
  imports: [module],
  exports: [module, components],
  providers: [],
})
export class UiElementModule {}
