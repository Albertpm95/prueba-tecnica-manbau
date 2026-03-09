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
      <button (click)="nuevoTicket()">Nuevo Ticket</button>
      <app-lista-tickets></app-lista-tickets>
    </div>
  `,
  styles: [`
    div {
      padding: 1rem;
    }
  `],
  providers: [GestionTicketsFacade]
})
export class GestionTicketsPage {
  private facade = inject(GestionTicketsFacade);
  private readonly router = inject(Router)
  ngOnInit(): void {
    this.facade.loadCatalogos()
  }
  public nuevoTicket(): void {
    this.router.navigate(['/gestion-tickets/detalle']);
  }
}