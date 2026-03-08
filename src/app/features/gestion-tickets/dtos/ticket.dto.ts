export interface TicketDTO {
  id: string;
  ticket_title: string;
  ticket_description: string;
  status_type: string;
  priority_level: string;
  created_at: string;
  assigned_user_id: number;
}