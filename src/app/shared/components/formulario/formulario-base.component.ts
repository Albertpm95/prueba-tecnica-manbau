import { Component, input, OnInit, inject, computed, effect } from '@angular/core';
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
  public values = input<unknown>()

  // El formulario se "deriva" de la configuración. 
  // Si config() cambia, form() se recalcula solo.
  public form = computed(() => {
    const controls: { [key: string]: any } = {};

    console.log('Creando formulario')

    this.config().controles.forEach(ctrl => {
      // Definimos valor inicial y estado disabled
      controls[ctrl.nombre] = [
        { value: ctrl.value || null, disabled: ctrl.disabled || this.isReadOnly },
        ctrl.validators || []
      ];
    });

    return this.fb.group(controls, {
      validators: this.config().validators || []
    });
  });


  constructor() {
    effect(() => {
      const data = this.values();
      const currentForm = this.form();

      if (data && currentForm) {
        // patchValue es ideal porque no rompe si faltan campos en el objeto
        currentForm.patchValue(data, { emitEvent: false });
        console.log('Formulario actualizado con:', data);
      }
    });
  }

}