import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatFormFieldAppearance } from '@angular/material/form-field';

@Component({
  selector: 'app-key-value',
  templateUrl: './key-value.component.html',
  styleUrls: ['./key-value.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class KeyValueComponent {
  @Input() key!: string;
  @Input() value!: string;
  @Input() icon!: string;
  @Input() appearance: MatFormFieldAppearance = 'outline';
  @Input() color: ThemePalette = 'primary';
}
