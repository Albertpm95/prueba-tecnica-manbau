import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ticket } from '@gestion-tickets/models/ticket.model';
import { CatalogoLabelPipe } from '@shared-pipes/catalogo-label.pipe';

@Component({
  selector: 'app-ticket-table',
  standalone: true,
  imports: [CommonModule, CatalogoLabelPipe],
  templateUrl: './ticket-table.component.html',
  styleUrls: ['./ticket-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketTableComponent {
  public tickets = input<Ticket[]>([]);
  public rowClick = output<Ticket>();

  public onRowClick(ticket: Ticket): void {
    this.rowClick.emit(ticket);
  }
}
