import { ClaimStatus } from "../models/ClaimStatus";

export interface OfficerRemarkRequestDto{
    claimStatus:ClaimStatus,
    officerRemarks:string
}