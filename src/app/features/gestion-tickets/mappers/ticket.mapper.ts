import { TicketDTO } from '@gestion-tickets/dtos/ticket.dto';
import { TicketFilters } from '@gestion-tickets/models/ticket-filter';
import { Ticket } from '@gestion-tickets/models/ticket.model';

export function mapTicketDtoToModel(dto: TicketDTO): Ticket {
  return {
    id: dto.id,
    ticketTitle: dto.ticket_title,
    ticketDescription: dto.ticket_description,
    statusType: dto.status_type_id,
    priorityLevel: dto.priority_level_id,
    createdAt: dto.created_at,
    assignedUserId: dto.assigned_user_id,
  };
}
export function mapTicketModelToDto(model: Partial<Ticket>): Partial<TicketDTO> {
  return {
    id: model.id,
    ticket_title: model.ticketTitle,
    ticket_description: model.ticketDescription,
    status_type_id: model.statusType,
    priority_level_id: model.priorityLevel,
    created_at: model.createdAt,
    assigned_user_id: model.assignedUserId,
  };
}
export function mapTicketFiltersModelToDto(filter: Partial<TicketFilters>): Partial<TicketDTO> {
  const dto: any = {
    'ticket_title:contains': filter.searchText, // Usando el operador de v1
    status_type_id: filter.statusId,
    priority_level: filter.priorityId,
  };

  // Filtramos: solo mantenemos lo que tiene un valor real
  return Object.fromEntries(
    Object.entries(dto).filter(
      ([_, value]) => value !== undefined && value !== null && value !== '',
    ),
  ) as Partial<TicketDTO>;
}
