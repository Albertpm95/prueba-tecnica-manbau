export interface TicketDTO {
  id?: number;
  ticket_title: string;
  ticket_description: string;
  status_type_id: number;
  priority_level_id: number;
  created_at: number;
  assigned_user_id: number;
}
