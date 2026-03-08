import { Component, output, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormularioBaseComponent } from './formulario-base.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario-escritura',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './formulario-base.component.html',
  styleUrls: ['./formulario-base.component.css']
})
export class FormularioEscrituraComponent extends FormularioBaseComponent {
  formValueChange = output<{ values: any; valid: boolean }>();

  ngAfterViewInit(): void {

    this.form().valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(values => {
      this.formValueChange.emit({ values, valid: this.form().valid });
    });
  }
}