import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaTicketsComponent } from './components/smart/lista-tickets/lista-tickets.component';
import { GestionTicketsFacade } from './facade/gestion-tickets.facade';
import { Router } from '@angular/router';

@Component({
  selector: 'page-gestion-tickets',
  standalone: true,
  imports: [CommonModule, ListaTicketsComponent],
  template: `
    <div>
      <h1>Gestión de Tickets</h1>
      <button
        class="rounded border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 shadow-sm"
        (click)="nuevoTicket()"
      >
        Nuevo Ticket
      </button>
      <app-lista-tickets></app-lista-tickets>
    </div>
  `,
  styles: [
    `
      div {
        padding: 1rem;
      }
    `,
  ],
  providers: [GestionTicketsFacade],
})
export class GestionTicketsPage {
  private facade = inject(GestionTicketsFacade);
  private readonly router = inject(Router);
  ngOnInit(): void {
    this.facade.loadCatalogos();
  }
  public nuevoTicket(): void {
    this.router.navigate(['detalle']);
  }
}
