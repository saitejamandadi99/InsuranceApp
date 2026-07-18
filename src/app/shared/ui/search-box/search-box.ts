import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-box',
  standalone:true,
  imports: [ReactiveFormsModule  , NgIf],
  templateUrl: './search-box.html',
  styleUrl: './search-box.css',
})
export class SearchBox {
  @Input({required:true})
  searchControl!:FormControl;

  @Input()
  placeholder:string="Search...";

  @Output()
  clear = new EventEmitter<void>();
  
  clearSearch(){
    this.searchControl.setValue('');
    this.clear.emit();
  }
}
