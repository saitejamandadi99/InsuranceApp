import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login-component/login-component';
import { RegisterComponent } from './components/register/register-component/register-component';
import { ViewUsersComponent } from './components/user/view-users-component/view-users-component';
import { adminGuardsGuard } from './guards/admin-guards-guard';
import { AddUserComponent } from './components/user/add-user-component/add-user-component';
import { ViewMyProfileComponent } from './components/customer/view-my-profile-component/view-my-profile-component';
import { customerGuardsGuard } from './guards/customer-guards-guard';
import { AddCustomerProfileComponent } from './components/customer/add-customer-profile-component/add-customer-profile-component';
import { EditCustomerProfileComponent } from './components/customer/edit-customer-profile-component/edit-customer-profile-component';
import { ViewCustomersComponent } from './components/customer/view-customers-component/view-customers-component';
import { CustomerDetailsComponent } from './components/customer/customer-details-component/customer-details-component';
import { officerGuardsGuard } from './guards/officer-guards-guard';
import { adminOfficerGuardsGuard } from './guards/admin-officer-guards-guard';
import { ViewProductsComponent } from './components/product/view-products-component/view-products-component';
import { AddProductComponent } from './components/product/add-product-component/add-product-component';
import { EditProductComponent } from './components/product/edit-product-component/edit-product-component';

export const routes: Routes = [
    {path:'login', component:LoginComponent},
    {path:'register', component:RegisterComponent},

    {path:'viewusers', component:ViewUsersComponent, canActivate:[adminGuardsGuard]},
    {path:'adduser', component:AddUserComponent, canActivate:[adminGuardsGuard]}, 


    {path:'viewcustomers', component:ViewCustomersComponent, canActivate:[adminOfficerGuardsGuard]},
    {path:'customerdetails/:id', component:CustomerDetailsComponent, canActivate:[adminOfficerGuardsGuard]},
    {path:'myprofile', component:ViewMyProfileComponent, canActivate:[customerGuardsGuard]},
    {path:'createprofile', component:AddCustomerProfileComponent, canActivate:[customerGuardsGuard]},
    {path:'editprofile', component:EditCustomerProfileComponent, canActivate:[customerGuardsGuard]},
    
    { path: 'viewproducts', component: ViewProductsComponent, canActivate: [adminOfficerGuardsGuard] },
    { path: 'addproduct', component: AddProductComponent, canActivate: [adminGuardsGuard] },
    { path: 'editproduct/:id', component: EditProductComponent, canActivate: [adminGuardsGuard] },

];
