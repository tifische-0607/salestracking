import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SalesOpportunity } from "@/types/sales";
import { Badge } from "@/components/ui/badge";
import { DollarSign, CalendarDays, Building, UserRound, MoreVertical, UserCog } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface OpportunityCardProps {
  opportunity: SalesOpportunity;
  onUpdateStage: (id: string, newStage: SalesOpportunity['stage']) => void;
}

const stageColors: Record<SalesOpportunity['stage'], string> = {
  'New': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  'Qualification': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  'Proposal': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  'Negotiation': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  'Closed Won': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  'Closed Lost': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity, onUpdateStage }) => {
  const stages: SalesOpportunity['stage'][] = ['New', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'];

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{opportunity.name}</CardTitle>
          <div className="flex items-center space-x-2">
            <Badge className={stageColors[opportunity.stage]}>{opportunity.stage}</Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Change Stage</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {stages.map((stage) => (
                  <DropdownMenuItem
                    key={stage}
                    onClick={() => onUpdateStage(opportunity.id, stage)}
                    disabled={opportunity.stage === stage}
                  >
                    {stage}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <CardDescription className="flex items-center text-sm text-muted-foreground mt-1">
          <Building className="h-4 w-4 mr-1" /> {opportunity.account}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-2 text-sm">
        <div className="flex items-center">
          <UserRound className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>Contact: {opportunity.contact}</span>
        </div>
        {opportunity.accountManager && (
          <div className="flex items-center">
            <UserCog className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>Account Manager: {opportunity.accountManager}</span>
          </div>
        )}
        <div className="flex items-center">
          <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>Amount: ${opportunity.amount.toLocaleString()}</span>
        </div>
        <div className="flex items-center">
          <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>Close Date: {opportunity.closeDate}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default OpportunityCard;