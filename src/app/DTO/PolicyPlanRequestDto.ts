import { PremiumType } from "../models/PremiumType";

export interface PolicyPlanRequestDto{
    productId:number, 
    planName:string,
    coverageAmount:number,
    premiumAmount:number,
    premiumType:PremiumType,
    duration:number, 
    termsAndConditions:string
}