export interface Ticket {
  id?: string; // String porque el json-server lo crea como string.
  ticketTitle: string;
  ticketDescription: string;
  statusType: number;
  priorityLevel: number;
  createdAt: number;
  assignedUserId: number;
}
