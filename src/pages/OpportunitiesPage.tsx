import React, { useState } from "react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SalesOpportunity } from "@/types/sales";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import OpportunityForm from "@/components/OpportunityForm";
import OpportunityList from "@/components/OpportunityList";

const OpportunitiesPage = () => {
  const [opportunities, setOpportunities] = useState<SalesOpportunity[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const addOpportunity = (newOpportunityData: Omit<SalesOpportunity, "id">) => {
    const newOpportunity: SalesOpportunity = {
      id: crypto.randomUUID(),
      ...newOpportunityData,
    };
    setOpportunities((prevOpportunities) => [...prevOpportunities, newOpportunity]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-6xl shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-3xl">Sales Opportunities</CardTitle>
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center space-x-2">
                <PlusCircle className="h-4 w-4" />
                <span>Add Opportunity</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Sales Opportunity</DialogTitle>
              </DialogHeader>
              <OpportunityForm onAddOpportunity={addOpportunity} onClose={() => setIsFormOpen(false)} />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="p-4">
          <OpportunityList opportunities={opportunities} />
        </CardContent>
      </Card>
      <MadeWithDyad />
    </div>
  );
};

export default OpportunitiesPage;