import { ClaimStatus } from "../models/ClaimStatus";

export interface AdminRemarkRequestDto{
    claimStatus:ClaimStatus,
    adminRemarks:string
}