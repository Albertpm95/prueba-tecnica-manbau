import { Component, output, OnInit } from '@angular/core';
import { FormularioBaseComponent } from './formulario-base.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { toObservable } from '@angular/core/rxjs-interop';
import { switchMap, debounceTime, distinctUntilChanged, map } from 'rxjs';
import { Ticket } from 'app/features/gestion-tickets/models/ticket.model';

@Component({
  selector: 'app-formulario-escritura',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './formulario-base.component.html',
  styleUrls: ['./formulario-base.component.css'],
})
export class FormularioEscrituraComponent extends FormularioBaseComponent {
  formValueChange = output<{ values: Ticket; valid: boolean }>();

  // 1. Convertimos el Signal del form en un Observable
  private form$ = toObservable(this.form);

  // 2. Escuchamos los cambios de forma continua
  private changesSubscription = this.form$
    .pipe(
      // Cada vez que 'form' cambie, nos suscribimos a su valueChanges
      switchMap((currentForm: FormGroup) =>
        currentForm.valueChanges.pipe(
          debounceTime(300),
          distinctUntilChanged((p, c) => JSON.stringify(p) === JSON.stringify(c)),
          // Mapeamos para incluir la validez del formulario actual
          map((values) => ({ values, valid: currentForm.valid })),
        ),
      ),
    )
    .subscribe((result: { values: Ticket; valid: boolean }) => {
      console.log('Formulario actualizado:', result);
      this.formValueChange.emit(result);
    });
}
