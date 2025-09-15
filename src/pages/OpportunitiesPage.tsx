import React, { useState } from "react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SalesOpportunity } from "@/types/sales";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

const OpportunitiesPage = () => {
  const [opportunities, setOpportunities] = useState<SalesOpportunity[]>([]);

  // Placeholder for adding a new opportunity - will be implemented later
  const addOpportunity = () => {
    // For now, just a console log. We'll add a form later.
    console.log("Add new opportunity clicked!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-4xl shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-3xl text-center">Sales Opportunities</CardTitle>
          <Button onClick={addOpportunity} className="flex items-center space-x-2">
            <PlusCircle className="h-4 w-4" />
            <span>Add Opportunity</span>
          </Button>
        </CardHeader>
        <CardContent className="p-4">
          {opportunities.length === 0 ? (
            <p className="text-center text-muted-foreground">No sales opportunities yet. Click "Add Opportunity" to create one!</p>
          ) : (
            <div>
              {/* Opportunity list will go here */}
              <p>Displaying {opportunities.length} opportunities.</p>
            </div>
          )}
        </CardContent>
      </Card>
      <MadeWithDyad />
    </div>
  );
};

export default OpportunitiesPage;