import { TicketDTO } from '../dtos/ticket.dto';
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