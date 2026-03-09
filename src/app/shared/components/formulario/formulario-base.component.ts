import { Component, input, inject, computed, effect, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormControl } from '@angular/forms';
import { ConfigFormulario } from '../../models/config-formulario';
import { toSignal } from '@angular/core/rxjs-interop';
import { Subject, switchMap, startWith } from 'rxjs';

@Component({
  selector: 'app-formulario-base',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario-base.component.html',
})
export class FormularioBaseComponent {
  private fb = inject(FormBuilder);

  public config = input.required<ConfigFormulario>();
  public values = input<unknown>();
  public isReadOnly = input<boolean>(false);

  public form = computed(() => {
    const controls: { [key: string]: any } = {};
    this.config().controles.forEach((ctrl) => {
      controls[ctrl.nombre] = [
        { value: ctrl.value ?? null, disabled: ctrl.disabled || this.isReadOnly() },
        ctrl.validators || [],
      ];
    });
    return this.fb.group(controls, { validators: this.config().validators || [] });
  });
}
