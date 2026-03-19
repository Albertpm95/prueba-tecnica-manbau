import { Component, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Validators } from '@angular/forms';
import { GestionTicketsFacade } from 'app/features/gestion-tickets/facade/gestion-tickets.facade';
import { FormularioEscrituraComponent } from 'app/shared/components/formulario/formulario-escritura.component';
import { ConfigFormulario } from 'app/shared/models/config-formulario';
import { UserDTOtoModel } from 'app/core/mappers/user.mapper';
import { Ticket } from 'app/features/gestion-tickets/models/ticket.model';
import { ToastrService } from 'app/core/services/toastr.service';
import { TicketDTO } from 'app/features/gestion-tickets/dtos/ticket.dto';
import { Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-detail-tickets',
  standalone: true,
  imports: [CommonModule, FormularioEscrituraComponent],
  templateUrl: './detail-tickets.component.html',
  styleUrls: ['./detail-tickets.component.css'],
})
export class DetailTicketsComponent {
  private facade = inject(GestionTicketsFacade);
  private toastrService = inject(ToastrService);
  private router = inject(Router);

  public readonly ticketDetails = this.facade.detallesTicketState;
  private updatedTicket: { values: Ticket; valid: boolean } | undefined;
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
          oculto: true,
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

  setValueForms($event: { values: Ticket; valid: boolean }) {
    console.log('Valores del formulario:', $event.values);
    console.log('¿El formulario es válido?', $event.valid);
    // Aquí puedes agregar lógica adicional para manejar los cambios en el formulario
    this.updatedTicket = $event;
  }
  guardarCambios() {
    if (this.updatedTicket && this.updatedTicket.valid) {
      if (this.updatedTicket.values.id) {
        this.facade
          .actualizarTicket(this.updatedTicket.values)
          .pipe(take(1))
          .subscribe((ticket: TicketDTO) => {
            this.toastrService.show('Ticket actualizado con éxito', 'success');
            //if (ticket?.id) this.facade.abrirDetalles(ticket.id);
            this.volverListado(true);
          });
      } else {
        delete this.updatedTicket.values.id; // Aseguramos que no se envíe un ID al crear
        this.facade
          .crearTicket(this.updatedTicket.values)
          .pipe(take(1))
          .subscribe((ticket: TicketDTO) => {
            this.toastrService.show('Ticket creado con éxito', 'success');
            //if (ticket?.id) this.facade.abrirDetalles(ticket.id);
            this.volverListado(true);
          });
      }
    }
  }

  public volverListado(actualizar?: boolean) {
    if (actualizar) {
      this.facade.buscarTickets();
    }
    this.router.navigate(['gestion-tickets']);
  }
}
