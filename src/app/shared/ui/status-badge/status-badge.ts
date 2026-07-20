import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-badge',
  standalone:true,
  imports: [NgClass],
  templateUrl: './status-badge.html',
  styleUrl: './status-badge.css',
})
export class StatusBadge {
  @Input({required:true})
  status!:string;

  get badgeClass():string{
    switch(this.status.toLowerCase()){
      case 'active':
      case 'approved':
      case 'completed':
      case 'success':
        return 'success';
      case 'pending':
      case 'pendingpayment':
        return 'warning';

      case 'inactive':
      case 'rejected':
      case 'failed':
      case 'expired':
        return 'danger';

      default:
        return 'secondary';
    }
  }
}
