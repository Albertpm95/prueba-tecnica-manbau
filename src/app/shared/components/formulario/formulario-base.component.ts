import { Component, input, OnInit, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { ConfigFormulario } from '../../models/config-formulario';

@Component({
  selector: 'app-formulario-base',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './formulario-base.component.html',
  styleUrls: ['./formulario-base.component.css']
})
export class FormularioBaseComponent {
  private fb = inject(FormBuilder);
  public isReadOnly: boolean = false; // Por defecto, el formulario es editable. FormularioLecturaComponent lo cambia a true.

  public config = input.required<ConfigFormulario>();

  // El formulario se "deriva" de la configuración. 
  // Si config() cambia, form() se recalcula solo.
  public form = computed(() => {
    const controls: { [key: string]: any } = {};

    this.config().controles.forEach(ctrl => {
      // Definimos valor inicial y estado disabled
      controls[ctrl.nombre] = [
        { value: '', disabled: ctrl.disabled || this.isReadOnly },
        ctrl.validators || []
      ];
    });

    return this.fb.group(controls, {
      validators: this.config().validators || []
    });
  });
}