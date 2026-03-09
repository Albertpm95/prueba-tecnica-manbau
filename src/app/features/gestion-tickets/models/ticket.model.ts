export interface Ticket {
  id?: number;
  ticketTitle: string;
  ticketDescription: string;
  statusType: string;
  priorityLevel: string;
  createdAt: number;
  assignedUserId: number;
}
