import { Component, input, output, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { GestionTicketsFacade } from '../../../facade/gestion-tickets.facade';
import { TicketFilters } from '../../../models/ticket-filter';

@Component({
  selector: 'app-ticket-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ticket-filter.component.html',
  styleUrls: ['./ticket-filter.component.css']
})
export class TicketFilterComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  public readonly facade = inject(GestionTicketsFacade);
  public filterChange = output<TicketFilters>();

  public filterForm: FormGroup = this.fb.group({
    statusId: [''],
    priorityId: [''],
    searchText: ['']
  });

  ngOnInit(): void {
    this.facade.loadCatalogos();
  }

  constructor() {
    this.filterForm.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(values => {
      this.emitFilterChange(values);
    });
  }

  private emitFilterChange(values: any): void {
    const filters: TicketFilters = {
      statusId: values.statusId ? +values.statusId : undefined,
      priorityId: values.priorityId ? +values.priorityId : undefined,
      searchText: values.searchText.length >= 3 ? values.searchText : undefined
    };
    this.filterChange.emit(filters);
  }
}