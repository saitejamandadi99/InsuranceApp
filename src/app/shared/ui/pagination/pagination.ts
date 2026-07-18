import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone:true,
  imports: [],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
})
export class Pagination {
  @Input({required:true})
  currentPage!:number;

  @Input({required:true})
  totalPages!:number;

  @Input({required:true})
  totalRecords!:number;
  @Input()
  pageSize:number= 10;
  @Output()
  pageChange=new EventEmitter<number>();

  previousPage(){
    if(this.currentPage>1){
      this.pageChange.emit(this.currentPage-1);
    }
  }

  
  nextPage(){
    if(this.currentPage<this.totalPages){
      this.pageChange.emit(this.currentPage+1);
    }
  }

  getStartRecord(){
    if(this.totalRecords === 0){
      return 0;
    }
    return (this.currentPage-1) * this.pageSize+1;
  }

  getEndRecord(){
    if(this.totalRecords === 0){
      return 0;
    }
    let end = this.currentPage * this.pageSize;
    if(end> this.totalRecords){
      end= this.totalRecords;
    }

    return end;
  }


}
