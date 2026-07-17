import { PaymentMode } from "../models/PaymentMode";

export interface PaymentRequestDto{
    policyId:number, 
    amount:number, 
    paymentMode:PaymentMode,
    transactionReference:string
}