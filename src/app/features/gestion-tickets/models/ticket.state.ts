import { TicketFilters } from "./ticket-filter";
import { Ticket } from "./ticket.model";

export interface TicketState {
  // Datos actuales y caché
  currentPageItems: Ticket[];
  cachedPagesItems: Map<number, { items: Ticket[]; lastAccess: number }>;

  // Paginación
  currentPage: number;
  totalPages: number;
  pageSize: number;

  // Filtros y Ordenación
  filters: Partial<TicketFilters>;
  sort: keyof Ticket; // Esto asegura que solo ordenes por propiedades reales del Ticket
  sortDirection: 'asc' | 'desc';

  // UI State
  mensajeError: string;
}