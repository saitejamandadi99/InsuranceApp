import { ClaimStatus } from "../models/ClaimStatus";

export interface ClaimStatusHistoryResponseDto{
    historyId: number,
    previousStatus: ClaimStatus,
    newStatus: ClaimStatus,
    remarks: string,
    updatedBy: string,
    claimNumber: string,
    updatedDate: string
}