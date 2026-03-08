import { TicketDTO } from '../dtos/ticket.dto';
import { TicketFilters } from '../models/ticket-filter';
import { Ticket } from '../models/ticket.model';

export function mapTicketDtoToModel(dto: TicketDTO): Ticket {
  return {
      id: dto.id,
      ticketTitle: dto.ticket_title,
      ticketDescription: dto.ticket_description,
      statusType: dto.status_type,
      priorityLevel: dto.priority_level,
      createdAt: dto.created_at,
      assignedUserId: dto.assigned_user_id
  };
}
export function mapTicketFiltersModelToDto(filter: Partial<TicketFilters>): Partial<TicketDTO> {
  const dto: any = {
    'ticket_title:contains': filter.searchText, // Usando el operador de v1
    'status_type': filter.statusId,
    'priority_level': filter.priorityId,
  };

  // Filtramos: solo mantenemos lo que tiene un valor real
  return Object.fromEntries(
    Object.entries(dto).filter(([_, value]) => value !== undefined && value !== null && value !== '')
  ) as Partial<TicketDTO>;
}