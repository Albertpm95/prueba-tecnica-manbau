import { CommonModule } from '@angular/common';
import { Component, inject, computed } from '@angular/core';
import { PaginationComponent } from '@gestion-tickets/components/dumb/pagination/pagination.component';
import { TicketFilterComponent } from '@gestion-tickets/components/dumb/ticket-filter/ticket-filter.component';
import { TicketTableComponent } from '@gestion-tickets/components/dumb/ticket-table/ticket-table.component';
import { GestionTicketsFacade } from '@gestion-tickets/facade/gestion-tickets.facade';
import { TicketFilters } from '@gestion-tickets/models/ticket-filter';
import { Ticket } from '@gestion-tickets/models/ticket.model';
import { PaginationInfo } from '@shared-models/pagination';

@Component({
  selector: 'app-lista-tickets',
  standalone: true,
  imports: [CommonModule, TicketFilterComponent, TicketTableComponent, PaginationComponent],
  templateUrl: './lista-tickets.component.html',
  styleUrls: ['./lista-tickets.component.css'],
})
export class ListaTicketsComponent {
  public facade = inject(GestionTicketsFacade);

  public readonly displayedTickets = computed(() => this.facade.listState().currentPageItems);
  public readonly paginationInfo = computed(() => ({
    currentPage: this.facade.listState().currentPage,
    totalPages: this.facade.listState().totalPages,
  }));

  public onFilterChange(filters: TicketFilters): void {
    const ticketFilters: TicketFilters = {
      statusId: filters.statusId,
      priorityId: filters.priorityId,
      searchText: filters.searchText,
    };
    this.facade.setFilters(ticketFilters);
  }

  public onRowClick(ticket: Ticket): void {
    if (ticket.id == null) return;
    this.facade.abrirDetalles(ticket.id);
  }

  public onPaginationChange(change: Partial<PaginationInfo>): void {
    const pagination: Partial<PaginationInfo> = {
      currentPage: change.currentPage,
      pageSize: change.pageSize,
    };
    this.facade.setPagination(pagination);
  }
}
