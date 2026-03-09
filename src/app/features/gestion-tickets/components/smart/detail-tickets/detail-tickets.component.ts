import { Component, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Validators } from '@angular/forms';
import { GestionTicketsFacade } from 'app/features/gestion-tickets/facade/gestion-tickets.facade';
import { FormularioEscrituraComponent } from 'app/shared/components/formulario/formulario-escritura.component';
import { ConfigFormulario } from 'app/shared/models/config-formulario';
import { UserDTOtoModel } from 'app/shared/mappers/user.mapper';

@Component({
  selector: 'app-detail-tickets',
  standalone: true,
  imports: [CommonModule, FormularioEscrituraComponent],
  templateUrl: './detail-tickets.component.html',
  styleUrls: ['./detail-tickets.component.css'],
})
export class DetailTicketsComponent {
  private facade = inject(GestionTicketsFacade);

  public readonly ticketDetails = this.facade.detallesTicketState;

  public idTicket = input<number>();
  public configForm = computed<ConfigFormulario>(() => {
    const prioridades = this.facade.prioridades();
    const estados = this.facade.estados();
    const usuarios = this.facade.usuarios();
    return {
      controles: [
        {
          oculto: true,
          nombre: 'id',
          label: 'ID',
          tipo: 'input',
        },
        {
          nombre: 'ticketTitle',
          label: 'Título',
          tipo: 'input',
        },
        {
          nombre: 'ticketDescription',
          label: 'Descripción',
          tipo: 'textarea',
          validators: [Validators.maxLength(500)],
        },
        {
          nombre: 'priorityLevel',
          label: 'Prioridad',
          tipo: 'select',
          opciones: prioridades,
        },
        {
          nombre: 'assignedUserId',
          label: 'Asignado',
          tipo: 'select',
          opciones: usuarios.map((u) => ({ id: u.id, label: u.fullName })),
        },
        {
          nombre: 'statusType',
          label: 'Estado',
          tipo: 'select',
          opciones: estados,
        },
        {
          nombre: 'createdAt',
          label: 'Fecha de creación',
          tipo: 'input',
          readonly: true,
        },
      ],
      validators: [],
    };
  });
  ngOnInit(): void {
    this.facade.loadCatalogos().subscribe(() => {});
  }

  setValueForms($event: { values: any; valid: boolean }) {
    console.log('Valores del formulario:', $event.values);
    console.log('¿El formulario es válido?', $event.valid);
    // Aquí puedes agregar lógica adicional para manejar los cambios en el formulario
  }
  guardarCambios() {}
}
