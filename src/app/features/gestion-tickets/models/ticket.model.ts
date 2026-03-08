export interface Ticket {
  id: string;
  ticketTitle: string;
  ticketDescription: string;
  statusType: string;
  priorityLevel: string;
  createdAt: string;
  assignedUserId: number;
}