export interface Ticket {
  id?: number;
  ticketTitle: string;
  ticketDescription: string;
  statusType: number;
  priorityLevel: number;
  createdAt: number;
  assignedUserId: number;
}
