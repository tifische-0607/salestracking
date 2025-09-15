import React from "react";
import OpportunityCard from "./OpportunityCard";
import { SalesOpportunity } from "@/types/sales";

interface OpportunityListProps {
  opportunities: SalesOpportunity[];
  onUpdateStage: (id: string, newStage: SalesOpportunity['stage']) => void;
}

const OpportunityList: React.FC<OpportunityListProps> = ({ opportunities, onUpdateStage }) => {
  if (opportunities.length === 0) {
    return (
      <p className="p-4 text-center text-muted-foreground">No sales opportunities yet. Add one to get started!</p>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {opportunities.map((opportunity) => (
        <OpportunityCard
          key={opportunity.id}
          opportunity={opportunity}
          onUpdateStage={onUpdateStage}
        />
      ))}
    </div>
  );
};

export default OpportunityList;