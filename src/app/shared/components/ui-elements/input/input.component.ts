/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-unused-vars */

import {
  Component,
  Injector,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: InputComponent },
  ],
})
export class InputComponent implements OnInit, ControlValueAccessor {
  @Input() appearance: MatFormFieldAppearance = 'outline';
  @Input() formControl!: FormControl;
  @Input() formControlName!: string;
  @Input() color: ThemePalette = 'primary';
  @Input() type = 'text';
  @Input() label = '';
  @Input() labelPosition: 'before' | 'after' = 'after';
  @Input() hint!: string;
  @Input() placeholder!: string;
  @Input() icon!: string;

  @Input() required!: boolean;
  @Input() readonly!: boolean | string;
  @Input() tooltip = '';
  @Input() tooltipPosition: TooltipPosition = 'below';
  @Input() set disabled(value: boolean) {
    value ? this.formControl.disable() : this.formControl.enable();
  }

  constructor(private injector: Injector) {}

  ngOnInit(): void {
    if (!this.formControl)
      this.formControl = this.injector
        ?.get(ControlContainer)
        ?.control?.get(this.formControlName) as FormControl;
  }

  public registerOnChange(fn: any): void {}

  public registerOnTouched(fn: any): void {}

  public writeValue(value: any): void {}

  public setDisabledState(value: boolean): void {}

  public onBlur() {
    const value = this.formControl.value?.trim();
    this.formControl.setValue(value);
  }

  public getErrorMessage() {
    if (this.formControl.hasError('required'))
      return this.label
        ? `${this.label} field is required.`
        : 'this field is required';

    if (this.formControl.hasError('invalidMsg'))
      return this.formControl?.errors?.['invalidMsg'];

    if (this.formControl.hasError('pattern'))
      return 'the Pattern is not correct';
  }
}
