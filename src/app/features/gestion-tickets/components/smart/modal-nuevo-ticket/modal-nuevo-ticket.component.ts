import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormularioEscrituraComponent } from 'shared/components/formulario/formulario-escritura.component';
import { GestionTicketsFacade } from 'features/gestion-tickets/facade/gestion-tickets.facade';
import { ConfigFormulario } from 'shared/models/config-formulario';

@Component({
    selector: 'app-modal-nuevo-ticket',
    standalone: true,
    imports: [CommonModule, FormularioEscrituraComponent],
    templateUrl: './modal-nuevo-ticket.component.html',
    styleUrls: ['./modal-nuevo-ticket.component.css']
})
export class ModalNuevoTicketComponent {
    private readonly facade = inject(GestionTicketsFacade);

    public readonly configForm: ConfigFormulario = {
        controles: [
            {
                nombre: 'ticket_title',
                label: 'Título',
                tipo: 'input',
                    
            },
            {
                nombre: 'ticket_description',
                label: 'Descripción',
                tipo: 'textarea',
                validators: [Validators.maxLength(500)]
            },
            {
                nombre: 'priority_level',
                label: 'Prioridad',
                tipo: 'select',
                opciones: this.facade.prioridades()
            },
            {
                nombre: 'assigned_user_id',
                label: 'Asignado',
                tipo: 'select',
                opciones: []
            }
        ],
        validators: []
    };
 
}
