import { Component, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Validators } from '@angular/forms';
import { GestionTicketsFacade } from 'app/features/gestion-tickets/facade/gestion-tickets.facade';
import { FormularioEscrituraComponent } from 'app/shared/components/formulario/formulario-escritura.component';
import { ConfigFormulario } from 'app/shared/models/config-formulario';
import { Ticket } from 'app/features/gestion-tickets/models/ticket.model';
import { ToastrService } from 'app/core/services/toastr.service';
import { TicketDTO } from 'app/features/gestion-tickets/dtos/ticket.dto';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-detail-tickets',
  standalone: true,
  imports: [CommonModule, FormularioEscrituraComponent],
  templateUrl: './detail-tickets.component.html',
  styleUrls: ['./detail-tickets.component.css'],
})
export class DetailTicketsComponent {
  private readonly facade = inject(GestionTicketsFacade);
  private toastrService = inject(ToastrService);
  private router = inject(Router);

  private updatedTicket: { values: Ticket; valid: boolean } | undefined;
  public idTicket = input<number>();
  public configForm = computed<ConfigFormulario>(() => {
    const prioridades = this.facade.prioridades();
    const estados = this.facade.estados();
    const usuarios = this.facade.usuarios();
    const ticket = this.facade.detallesTicketState();
    return {
      controles: [
        {
          oculto: true,
          nombre: 'id',
          label: 'ID',
          tipo: 'input',
          value: ticket?.id,
        },
        {
          nombre: 'ticketTitle',
          label: 'Título',
          tipo: 'input',
          value: ticket?.ticketTitle,
        },
        {
          nombre: 'ticketDescription',
          label: 'Descripción',
          tipo: 'textarea',
          validators: [Validators.maxLength(500)],
          value: ticket?.ticketDescription,
        },
        {
          nombre: 'priorityLevel',
          label: 'Prioridad',
          tipo: 'select',
          opciones: prioridades,
          value: ticket?.priorityLevel,
        },
        {
          nombre: 'assignedUserId',
          label: 'Asignado',
          tipo: 'select',
          opciones: usuarios.map((u) => ({ id: u.id, label: u.fullName })),
          value: ticket?.assignedUserId,
        },
        {
          nombre: 'statusType',
          label: 'Estado',
          tipo: 'select',
          opciones: estados,
          value: ticket?.statusType,
        },
        {
          oculto: true,
          nombre: 'createdAt',
          label: 'Fecha de creación',
          tipo: 'input',
          readonly: true,
          value: ticket?.createdAt,
        },
      ],
      validators: [],
    };
  });
  ngOnInit(): void {
    this.facade.loadCatalogos().subscribe();
  }

  public setValueForms($event: { values: Ticket; valid: boolean }) {
    this.updatedTicket = $event;
  }
  public guardarCambios() {
    if (this.updatedTicket && this.updatedTicket.valid) {
      if (this.updatedTicket.values.id) {
        this.facade
          .actualizarTicket(this.updatedTicket.values)
          .pipe(take(1))
          .subscribe((ticket: TicketDTO) => {
            this.toastrService.show('Ticket actualizado con éxito', 'success');
            console.log('Ticket actualizado: ', ticket);
            //if (ticket?.id) this.facade.abrirDetalles(ticket.id);
            this.volverListado(true);
          });
      } else {
        delete this.updatedTicket.values.id;
        this.facade
          .crearTicket(this.updatedTicket.values)
          .pipe(take(1))
          .subscribe((ticket: TicketDTO) => {
            this.toastrService.show('Ticket creado con éxito', 'success');
            //if (ticket?.id) this.facade.abrirDetalles(ticket.id);
            console.log('Ticket creado: ', ticket);
            this.volverListado(true);
          });
      }
    }
  }

  public volverListado(nuevaBusqueda?: boolean) {
    if (nuevaBusqueda) {
      this.facade.buscarTickets(nuevaBusqueda);
    }
    this.router.navigate(['gestion-tickets']);
  }
}
