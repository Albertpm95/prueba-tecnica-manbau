import { Component, inject, signal, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaTicketsComponent } from './components/smart/lista-tickets/lista-tickets.component';
import { GestionTicketsFacade } from './facade/gestion-tickets.facade';
import { Router } from '@angular/router';
import { take } from 'rxjs/internal/operators/take';
import { finalize } from 'rxjs';

@Component({
  selector: 'page-gestion-tickets',
  standalone: true,
  imports: [CommonModule, ListaTicketsComponent],
  template: `
    <div>
      <h1 class="my-4"><b>Gestión de Tickets</b></h1>
      <button
        class="rounded border border-gray-300 px-4 py-2 my-4 text-sm font-semibold text-gray-700 hover:bg-gray-50 shadow-sm"
        (click)="nuevoTicket()"
      >
        Nuevo Ticket
      </button>
      @if (cargando()) {
        <p>Cargando...</p>
      } @else {
        <app-lista-tickets></app-lista-tickets>
      }
    </div>
  `,
  styles: [
    `
      div {
        padding: 1rem;
      }
    `,
  ],
})
export class GestionTicketsPage {
  private facade = inject(GestionTicketsFacade);
  private readonly router = inject(Router);
  public cargando = signal<boolean>(true);
  ngOnInit(): void {
    this.facade
      .loadCatalogos()
      .pipe(
        finalize(() => this.cargando.set(false)),
        take(1),
      )
      .subscribe();
  }
  public nuevoTicket(): void {
    this.router.navigate(['/gestion-tickets/detalle', 'nuevo']);
  }
}
