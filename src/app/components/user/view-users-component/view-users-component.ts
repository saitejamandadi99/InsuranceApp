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
import { Router, RouterLink } from '@angular/router';
import { PageHeader } from '../../../shared/ui/page-header/page-header';
import { FilterCard } from '../../../shared/ui/filter-card/filter-card';
import { SearchBox } from '../../../shared/ui/search-box/search-box';
import { StatusBadge } from '../../../shared/ui/status-badge/status-badge';
import { ActionButtons } from '../../../shared/ui/action-buttons/action-buttons';
import { Pagination } from '../../../shared/ui/pagination/pagination';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner/loading-spinner';
import { EmptyState } from '../../../shared/ui/empty-state/empty-state';
@Component({
  selector: 'app-view-users-component',
  imports: [ReactiveFormsModule, DatePipe, PageHeader, FilterCard, SearchBox, StatusBadge, ActionButtons, Pagination, LoadingSpinner,EmptyState],
  templateUrl: './view-users-component.html',
  styleUrl: './view-users-component.css',
})
export class ViewUsersComponent implements  OnInit {
  users!:PaginationResponseDto<UserResponseDto>;
  isLoading=false;

  filterForm:FormGroup= new FormGroup({
    search:new FormControl(''),
    sortBy:new FormControl('fullName'),
    sortDirection:new FormControl('asc'),
    pageNumber:new FormControl(1),
    pageSize:new FormControl(10)
  });

  resetFilters(){
    this.filterForm.reset({
      search:'',
      sortBy:'fullName',
      sortDirection:'asc',
      pageNumber:1,
      pageSize:10
    });

    this.loadUsers();
  }

  loadUsers(){
    this.isLoading=true;
    const filters = this.filterForm.value;
    this.userService.listUsers(filters.pageNumber!, filters.pageSize!, filters.sortBy!, filters.sortDirection!, filters.search!).subscribe({
      next:(response)=>{
        this.users=response.data;
        this.isLoading=false;
        this.cdr.detectChanges();
      },error:(err:HttpErrorResponse)=>{
        this.isLoading=false;
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

  clearSearch(){
    this.filterForm.patchValue({
      search:'',
      pageNumber:1
    });

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

  navigateToAddUser() {
    this.router.navigate(['/adduser']);
  }

  get searchControl(): FormControl {
  return this.filterForm.get('search') as FormControl;
}

  constructor(private userService:UserServices, private cdr:ChangeDetectorRef, private router:Router){}
  ngOnInit(): void {
   this.loadUsers();
  }

  
}
