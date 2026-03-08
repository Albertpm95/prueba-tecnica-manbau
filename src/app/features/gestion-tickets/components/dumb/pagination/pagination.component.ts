import { Component, input, output, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PaginationInfo } from '../../../models/pagination';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  private readonly fb = inject(FormBuilder);

  public currentPage = input<number>(1);
  public totalPages = input<number>(1);
  public paginationChange = output<Omit<PaginationInfo, 'totalPages'>>();

  public pageSizeControl = new FormControl(10); 

  public previousPage(): void {
    if (this.currentPage() > 1) {
      this.emitChange(this.currentPage() - 1, this.pageSizeControl.value || 10);
    }
  }

  public nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.emitChange(this.currentPage() + 1, this.pageSizeControl.value || 10);
    }
  }

  public onPageSizeChange(size: number): void {
    this.emitChange(1, size); // Reset to page 1
  }

  private emitChange(currentPage: number, pageSize: number): void {
    this.paginationChange.emit({ currentPage, pageSize });
  }
}