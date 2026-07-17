import { ProductType } from "../models/ProductType";

export interface ProductRequestDto{
    productName:string,
    productType:ProductType,
    description:string
}