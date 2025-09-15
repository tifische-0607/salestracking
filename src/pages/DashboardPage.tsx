import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { SalesOpportunity } from '@/types/sales';
import SalesPieChart from '@/components/SalesPieChart';
import { MadeWithDyad } from '@/components/made-with-dyad';
import AccountManagerPieChart from '@/components/AccountManagerPieChart';

interface DashboardPageProps {
  opportunities: SalesOpportunity[];
}

const DashboardPage: React.FC<DashboardPageProps> = ({ opportunities }) => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Sales Dashboard</h1>
          <Button asChild variant="outline">
            <Link to="/opportunities">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Opportunities
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <SalesPieChart opportunities={opportunities} />
          <AccountManagerPieChart opportunities={opportunities} />
        </div>
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default DashboardPage;