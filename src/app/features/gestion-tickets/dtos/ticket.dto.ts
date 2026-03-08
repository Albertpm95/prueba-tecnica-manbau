export interface TicketDTO {
  id: number;
  ticket_title: string;
  ticket_description: string;
  status_type_id: string;
  priority_level: string;
  created_at: number;
  assigned_user_id: number;
}