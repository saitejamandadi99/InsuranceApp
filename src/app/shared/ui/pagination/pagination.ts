import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css'
})
export class Pagination {

  @Input() currentPage = 1;
  @Input() totalPages = 1;
  @Input() totalRecords = 0;
  @Input() pageSize = 10;

  @Output()
  pageChange = new EventEmitter<'previous' | 'next'>();

  previousPage() {
    this.pageChange.emit('previous');
  }

  nextPage() {
    this.pageChange.emit('next');
  }

  getStartRecord(): number {
    if (this.totalRecords === 0) {
      return 0;
    }

    return ((this.currentPage - 1) * this.pageSize) + 1;
  }

  getEndRecord(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalRecords);
  }

}