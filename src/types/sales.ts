export interface SalesOpportunity {
  id: string;
  created_at: string;
  name: string;
  stage: 'New' | 'Qualification' | 'Proposal' | 'Negotiation' | 'Closed Won' | 'Closed Lost';
  amount: number;
  closedate: string;
  account: string;
  contact: string;
  accountmanager: string;
  currentstatus: {
    status: string;
    timestamp: string;
  };
}