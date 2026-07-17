import { ActiveStatus } from "../models/ActiveStatus"
import { PremiumType } from "../models/PremiumType"
import { ProductType } from "../models/ProductType"

export interface PolicyPlanResponseDto{
    planId: number,
    productName: string
    productType: ProductType,
    planName: string,
    coverageAmount: number,
    premiumAmount: number,
    premiumType: PremiumType,
    duration: number,
    termsAndConditions: string,
    activeStatus: ActiveStatus,
    createdDate: string,
    updatedDate: string
}