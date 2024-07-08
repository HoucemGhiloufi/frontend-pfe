export interface EndorsementType {
    identifier: string;
    code: string;
    label: string;
  }
  export interface endorsementSubType {
    identifier: string;
    code: string;
    label: string;
  }
  export interface Endorsement {
    transactionType: string;
    treated: boolean;
    createdAt: Date;
    code: string;
    policyNumber: string;
    externalIdentifier: string;
    propositionNumber: string;
    effectiveDate: Date;
    endorsementType: EndorsementType;
    endorsementSubType: endorsementSubType; // Define as needed
    status: any; // Define as needed
  }
  