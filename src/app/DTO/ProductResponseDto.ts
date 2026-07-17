import { ActiveStatus } from "../models/ActiveStatus";
import { ProductType } from "../models/ProductType";

export interface ProductResponseDto{
    productId:number, 
    productName:string,
    productType:ProductType,
    description:string,
    activeStatus:ActiveStatus,
    createdDate:string,
    updatedDate:string
}