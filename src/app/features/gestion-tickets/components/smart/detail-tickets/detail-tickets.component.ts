import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioEscrituraComponent } from 'shared/components/formulario/formulario-escritura.component';
import { GestionTicketsFacade } from 'features/gestion-tickets/facade/gestion-tickets.facade';
import { ConfigFormulario } from 'shared/models/config-formulario';
import { Validators } from '@angular/forms';

@Component({
    selector: 'app-detail-tickets',
    standalone: true,
    imports: [CommonModule, FormularioEscrituraComponent],
    templateUrl: './detail-tickets.component.html',
    styleUrls: ['./detail-tickets.component.css']
})
export class DetailTicketsComponent {
    private facade = inject(GestionTicketsFacade);

    public readonly ticketDetails = this.facade.detallesTicketState

    public idTicket = input<number>();
    public configForm: ConfigFormulario | undefined

    ngOnInit(): void {
        console.log('ID del ticket recibido:', this.idTicket())
        this.configForm = this.crearConfiguracionFormularioEdicion()
        const id = this.idTicket();
        if (id) {
            this.facade.abrirDetalles(id)
        }
        console.log('Configuracion del form: ', this.configForm)

    }

    private crearConfiguracionFormularioEdicion(): ConfigFormulario {
        console.log('Creando configuración del formulario de edición')
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
                    opciones: this.facade.prioridades(),
                },
                {
                    nombre: 'assignedUserId',
                    label: 'Asignado',
                    tipo: 'select',
                    opciones: [],
                },
                {
                    nombre: 'statusType',
                    label: 'Estado',
                    tipo: 'select',
                    opciones: this.facade.estados(),

                },
                {
                    nombre: 'createdAt',
                    label: 'Fecha de creación',
                    tipo: 'input',
                    readonly: true
                }
            ],
            validators: []
        };
    }
}
