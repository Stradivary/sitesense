export type RecordType = 'Consultative';
export type LeadSource = 'Website Potloc';

export interface Lead {
  TransactionID: string;
  Name: string;
  Email: string;
  Company: string;
  RecordType: RecordType;
  MobilePhone: string;
  LeadSource: LeadSource;
  SendEmail: string;
  Description: string;
}
