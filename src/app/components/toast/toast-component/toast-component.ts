import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastServices } from '../../../services/toast/toast-services';
import { Toast } from '../../../models/Toast';
import { NgClass, NgFor } from '@angular/common';
import { ToastType } from '../../../models/ToastType';

@Component({
  selector: 'app-toast-component',
  standalone:true,
  imports: [NgClass, NgFor],
  templateUrl: './toast-component.html',
  styleUrl: './toast-component.css',
})
export class ToastComponent implements OnInit {
  toasts:Toast[] = [];
  constructor(private toastService : ToastServices, private cdr:ChangeDetectorRef){}
  ngOnInit(): void {
      this.toastService.toasts$.subscribe(data=>{
        this.toasts = [...data];
        console.log(this.toasts);
        
        this.cdr.detectChanges();
      });
  }

  ToastType=ToastType;

  removeToast(id:number){
    console.log('X clicked, removing id:', id);
    this.toastService.remove(id);
  }

}
