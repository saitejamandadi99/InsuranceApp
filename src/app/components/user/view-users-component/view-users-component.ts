import { AsyncPipe, DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PaginationResponseDto } from '../../../DTO/PaginationResponseDto';
import { UserResponseDto } from '../../../DTO/UserResponseDto';
import { SuccessResponseDto } from '../../../DTO/SuccessResponseDto';
import { UserServices } from '../../../services/user/user-services';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponseDto } from '../../../DTO/ErrorResponseDto';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-view-users-component',
  imports: [ReactiveFormsModule, DatePipe, RouterLink],
  templateUrl: './view-users-component.html',
  styleUrl: './view-users-component.css',
})
export class ViewUsersComponent implements  OnInit {
  users!:PaginationResponseDto<UserResponseDto>;

  filterForm:FormGroup= new FormGroup({
    search:new FormControl(''),
    sortBy:new FormControl('fullName'),
    sortDirection:new FormControl('asc'),
    pageNumber:new FormControl(1),
    pageSize:new FormControl(10)
  });

  loadUsers(){
    const filters = this.filterForm.value;
    this.userService.listUsers(filters.pageNumber!, filters.pageSize!, filters.sortBy!, filters.sortDirection!, filters.search!).subscribe({
      next:(response)=>{
        this.users=response.data;
        this.cdr.detectChanges();
      },error:(err:HttpErrorResponse)=>{
        const apiError = err.error as ErrorResponseDto;
        alert(apiError.Message);
      }
    })
  }

  searchUsers(){
    this.filterForm.patchValue({
      pageNumber:1,
    })
    this.loadUsers();
  }

  previousPage(){
    if(this.users && this.users.currentPage>1){
      this.filterForm.patchValue({
        pageNumber:this.users.currentPage -1
      });

      this.loadUsers();
    }
  }

  nextPage(){
    if(this.users && !this.users.isLastPage){
      this.filterForm.patchValue({
        pageNumber:this.users.currentPage+1
      });
      this.loadUsers();
    }
  }

  activateUser(id:number){
    this.userService.activateUser(id).subscribe({
      next:()=>{
        this.loadUsers();
      }
    })

  }

  
  deactivateUser(id:number){
    this.userService.deactivateUser(id).subscribe({
      next:()=>{
        this.loadUsers();
      }
    })

  }

  constructor(private userService:UserServices, private cdr:ChangeDetectorRef){}
  ngOnInit(): void {
   this.loadUsers();
  }

  
}
