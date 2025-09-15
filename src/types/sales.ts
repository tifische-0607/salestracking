export interface SalesOpportunity {
  id: string;
  created_at: string;
  name: string;
  stage: 'New' | 'Qualification' | 'Proposal' | 'Negotiation' | 'Closed Won' | 'Closed Lost';
  amount: number;
  closeDate: string;
  account: string;
  contact: string;
  accountManager: string;
  currentStatus: {
    status: string;
    timestamp: string;
  };
}