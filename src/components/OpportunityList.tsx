import React from 'react';
import { SalesOpportunity } from '@/types/sales';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';

interface OpportunityListProps {
  opportunities: SalesOpportunity[];
  onUpdateStage: (id: string, newStage: SalesOpportunity['stage']) => void;
}

const stageColors: Record<SalesOpportunity['stage'], string> = {
  'New': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  'Qualification': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  'Proposal': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  'Negotiation': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  'Closed Won': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  'Closed Lost': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

const OpportunityList: React.FC<OpportunityListProps> = ({ opportunities, onUpdateStage }) => {
  if (opportunities.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No opportunities yet. Add one to get started!</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Account</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Close Date</TableHead>
            <TableHead>Stage</TableHead>
            <TableHead>Account Manager</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {opportunities.map((opp) => (
            <TableRow key={opp.id}>
              <TableCell className="font-medium">{opp.name}</TableCell>
              <TableCell>{opp.account}</TableCell>
              <TableCell>${opp.amount.toLocaleString()}</TableCell>
              <TableCell>{format(new Date(opp.closeDate), 'PPP')}</TableCell>
              <TableCell>
                <Select
                  value={opp.stage}
                  onValueChange={(newStage: SalesOpportunity['stage']) => onUpdateStage(opp.id, newStage)}
                >
                  <SelectTrigger className="w-[180px] focus:ring-0 border-none">
                    <SelectValue asChild>
                       <Badge className={`${stageColors[opp.stage]} hover:bg-opacity-80`}>{opp.stage}</Badge>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Qualification">Qualification</SelectItem>
                    <SelectItem value="Proposal">Proposal</SelectItem>
                    <SelectItem value="Negotiation">Negotiation</SelectItem>
                    <SelectItem value="Closed Won">Closed Won</SelectItem>
                    <SelectItem value="Closed Lost">Closed Lost</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>{opp.accountManager}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OpportunityList;