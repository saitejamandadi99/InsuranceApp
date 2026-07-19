import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

import { ClaimStatusHistoryResponseDto } from '../../../DTO/ClaimStatusHistoryResponseDto';
import { ErrorResponseDto } from '../../../DTO/ErrorResponseDto';

import { ClaimStatusServices } from '../../../services/ClaimStatus/claim-status-services';

import { PageHeader } from '../../../shared/ui/page-header/page-header';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner/loading-spinner';
import { EmptyState } from '../../../shared/ui/empty-state/empty-state';
import { StatusBadge } from '../../../shared/ui/status-badge/status-badge';

@Component({
  selector: 'app-view-my-claim-status-history-component',
  imports: [
    DatePipe,
    PageHeader,
    LoadingSpinner,
    EmptyState,
    StatusBadge
  ],
  templateUrl: './view-my-claim-status-history-component.html',
  styleUrl: './view-my-claim-status-history-component.css',
})
export class ViewMyClaimStatusHistoryComponent implements OnInit {

  histories: ClaimStatusHistoryResponseDto[] = [];

  isLoading = false;

  constructor(
    private historyService: ClaimStatusServices,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadMyHistory();
  }

  loadMyHistory() {

    this.isLoading = true;

    this.historyService.getMyClaimStatusHistory().subscribe({

      next: (response) => {

        this.histories = response.data ?? [];
        this.isLoading = false;
        this.cdr.detectChanges();

      },

      error: (err: HttpErrorResponse) => {

        this.isLoading = false;

        const apiError = err.error as ErrorResponseDto;

        alert(apiError.Message);

      }

    });

  }

}