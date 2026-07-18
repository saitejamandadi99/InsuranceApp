import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone:true,
  imports: [NgIf],
  templateUrl: './empty-state.html',
  styleUrl: './empty-state.css',
})
export class EmptyState {
  @Input()
  icon:string = 'bi bi-inbox';

  @Input({required:true})
  title!:string;

  @Input()
  message:string= '';

  @Input()
  buttonText:string='';

  @Output()
  buttonClick = new EventEmitter<void>();

  onButtonClick(){
    this.buttonClick.emit();
  }
}
