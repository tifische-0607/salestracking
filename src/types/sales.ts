export interface SalesOpportunity {
  id: string;
  name: string;
  stage: 'New' | 'Qualification' | 'Proposal' | 'Negotiation' | 'Closed Won' | 'Closed Lost';
  amount: number;
  closeDate: string; // Using string for simplicity, can be Date object
  account: string;
  contact: string;
}