import { PolicyStatus } from "../models/PolicyStatus";

export interface PolicyResponseDto{
    policyId:number, 
    policyNumber:string, 
    customerId:number, 
    customerName:string, 
    planId:number, 
    planName:string, 
    startDate:string,
    endDate:string,
    policyStatus:PolicyStatus,
    totalPremiumPaid:number
}