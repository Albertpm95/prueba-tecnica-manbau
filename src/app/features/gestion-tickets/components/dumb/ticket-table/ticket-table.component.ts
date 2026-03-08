import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ticket } from '../../../models/ticket.model';

@Component({
  selector: 'app-ticket-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticket-table.component.html',
  styleUrls: ['./ticket-table.component.css']
})
export class TicketTableComponent {
  public tickets = input<Ticket[]>([]);
  public rowClick = output<Ticket>();

  public onRowClick(ticket: Ticket): void {
    this.rowClick.emit(ticket);
  }
}