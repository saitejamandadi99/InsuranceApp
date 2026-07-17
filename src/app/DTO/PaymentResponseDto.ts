import { PaymentMode } from "../models/PaymentMode";
import { PaymentStatus } from "../models/PaymentStatus";

export interface PaymentResponseDto{
    paymentId:number,
    policyNumber:string,
    amount:number, 
    paymentDate:string,
    paymentMode:PaymentMode, 
    transactionReference:string, 
    paymentStatus:PaymentStatus 

}