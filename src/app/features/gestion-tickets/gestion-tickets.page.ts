import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaTicketsComponent } from './components/smart/lista-tickets/lista-tickets.component';
import { GestionTicketsFacade } from './facade/gestion-tickets.facade';

@Component({
  selector: 'app-gestion-tickets',
  standalone: true,
  imports: [CommonModule, ListaTicketsComponent],
  template: `
    <div>
      <h1>Gestión de Tickets</h1>
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
  ngOnInit(): void {
    this.facade.loadCatalogos()
  }
}