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
import { ViewPlansComponent } from './components/policyplan/view-plans-component/view-plans-component';
import { AddPlanComponent } from './components/policyplan/add-plan-component/add-plan-component';
import { EditPlanComponent } from './components/policyplan/edit-plan-component/edit-plan-component';
import { ViewPoliciesComponent } from './components/policy/view-policies-component/view-policies-component';
import { ViewMyPoliciesComponent } from './components/policy/view-my-policies-component/view-my-policies-component';
import { IssuePolicyComponent } from './components/policy/issue-policy-component/issue-policy-component';
import { PurchasePolicyComponent } from './components/policy/purchase-policy-component/purchase-policy-component';
import { RaiseClaimComponent } from './components/claim/raise-claim-component/raise-claim-component';
import { ViewMyClaimsComponent } from './components/claim/view-my-claims-component/view-my-claims-component';
import { ViewClaimDetailsComponent } from './components/claim/view-claim-details-component/view-claim-details-component';
import { ViewClaimsComponent } from './components/claim/view-claims-component/view-claims-component';
import { OfficerClaimReviewComponent } from './components/claim/officer-claim-review-component/officer-claim-review-component';
import { AdminClaimReviewComponent } from './components/claim/admin-claim-review-component/admin-claim-review-component';
import { MakePaymentComponent } from './components/payment/make-payment-component/make-payment-component';
import { ViewMyPaymentsComponent } from './components/payment/view-my-payments-component/view-my-payments-component';
import { ViewPaymentsComponent } from './components/payment/view-payments-component/view-payments-component';
import { PaymentDetailsComponent } from './components/payment/payment-details-component/payment-details-component';
import { allGuardsGuard } from './guards/all-guards-guard';
import { ViewClaimStatusHistoryComponent } from './components/history/view-claim-status-history-component/view-claim-status-history-component';
import { ViewMyClaimStatusHistoryComponent } from './components/history/view-my-claim-status-history-component/view-my-claim-status-history-component';
import { ViewMyDocumentsComponent } from './components/document/view-my-documents-component/view-my-documents-component';
import { ViewDocumentsComponent } from './components/document/view-documents-component/view-documents-component';
import { DocumentDetailsComponent } from './components/document/document-details-component/document-details-component';
import { AdminDashboardComponent } from './components/dashboards/admin-dashboard-component/admin-dashboard-component';
import { OfficerDashboardComponent } from './components/dashboards/officer-dashboard-component/officer-dashboard-component';
import { CustomerDashboardComponent } from './components/dashboards/customer-dashboard-component/customer-dashboard-component';
export const routes: Routes = [
    {path:'login', component:LoginComponent},
    {path:'register', component:RegisterComponent},

    { path: 'admindashboard', component: AdminDashboardComponent, canActivate: [adminGuardsGuard] },
    { path: 'officerdashboard', component: OfficerDashboardComponent, canActivate: [officerGuardsGuard] },
    { path: 'customerdashboard', component: CustomerDashboardComponent, canActivate: [customerGuardsGuard] },

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

    { path: 'viewplans', component: ViewPlansComponent, canActivate: [adminOfficerGuardsGuard] },
    { path: 'addplan', component: AddPlanComponent, canActivate: [adminGuardsGuard] },
    { path: 'editplan/:id', component: EditPlanComponent, canActivate: [adminGuardsGuard] },

    { path: 'viewpolicies', component: ViewPoliciesComponent, canActivate: [adminOfficerGuardsGuard] },
    { path: 'issuepolicy', component: IssuePolicyComponent, canActivate: [adminOfficerGuardsGuard] },
    { path: 'mypolicies', component: ViewMyPoliciesComponent, canActivate: [customerGuardsGuard] },
    { path: 'purchasepolicy', component: PurchasePolicyComponent, canActivate: [customerGuardsGuard] },

    { path: 'raiseclaim/:policyId', component: RaiseClaimComponent, canActivate: [customerGuardsGuard] },
    { path: 'myclaims', component: ViewMyClaimsComponent, canActivate: [customerGuardsGuard] },
    { path: 'viewclaimdetails/:claimId', component: ViewClaimDetailsComponent, canActivate: [customerGuardsGuard] },
    { path: 'viewclaims', component: ViewClaimsComponent, canActivate: [adminOfficerGuardsGuard] },
    { path: 'officerreview/:claimId', component: OfficerClaimReviewComponent, canActivate: [officerGuardsGuard] },
    { path: 'adminreview/:claimId', component: AdminClaimReviewComponent, canActivate: [adminGuardsGuard] },
    { path: 'claimstatushistory', component: ViewClaimStatusHistoryComponent, canActivate: [adminOfficerGuardsGuard] },
    { path: 'myclaimstatushistory', component: ViewMyClaimStatusHistoryComponent, canActivate: [customerGuardsGuard] },

    { path: 'makepayment/:policyId', component: MakePaymentComponent, canActivate: [customerGuardsGuard] },
    { path: 'recordpayment/:policyId', component: MakePaymentComponent, canActivate: [adminOfficerGuardsGuard] },
    { path: 'mypayments', component: ViewMyPaymentsComponent, canActivate: [customerGuardsGuard] },
    { path: 'viewpayments', component: ViewPaymentsComponent, canActivate: [adminOfficerGuardsGuard] },
    { path: 'paymentdetails/:paymentId', component: PaymentDetailsComponent, canActivate:[allGuardsGuard] },

    { path: 'mydocuments', component: ViewMyDocumentsComponent, canActivate: [customerGuardsGuard] },
    { path: 'viewdocuments', component: ViewDocumentsComponent, canActivate: [adminOfficerGuardsGuard] },
    { path: 'documentdetails/:documentId', component: DocumentDetailsComponent, canActivate: [allGuardsGuard] },
];
