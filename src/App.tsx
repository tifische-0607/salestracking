import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import OpportunitiesPage from "@/pages/OpportunitiesPage";
import DashboardPage from "@/pages/DashboardPage";
import { SalesOpportunity } from "@/types/sales";
import { supabase } from "@/lib/supabase";
import { showError, showSuccess } from "@/utils/toast";

const queryClient = new QueryClient();

const App = () => {
  const [opportunities, setOpportunities] = useState<SalesOpportunity[]>([]);

  useEffect(() => {
    const fetchOpportunities = async () => {
      const { data, error } = await supabase
        .from('opportunities')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching opportunities:", error);
        showError("Could not fetch opportunities.");
      } else {
        setOpportunities(data as SalesOpportunity[]);
      }
    };

    fetchOpportunities();
  }, []);

  const addOpportunity = async (newOpportunityData: Omit<SalesOpportunity, "id" | "created_at">) => {
    const { data, error } = await supabase
      .from('opportunities')
      .insert([newOpportunityData])
      .select();

    if (error) {
      console.error("Error adding opportunity:", error);
      showError("Failed to add opportunity.");
    } else if (data) {
      setOpportunities((prevOpportunities) => [data[0] as SalesOpportunity, ...prevOpportunities]);
      showSuccess("Opportunity added successfully!");
    }
  };

  const updateOpportunityStage = async (id: string, newStage: SalesOpportunity['stage']) => {
    const updatedStatus = {
      status: `Stage updated to ${newStage}`,
      timestamp: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('opportunities')
      .update({ stage: newStage, currentStatus: updatedStatus })
      .eq('id', id)
      .select();

    if (error) {
      console.error("Error updating opportunity stage:", error);
      showError("Failed to update stage.");
    } else if (data) {
      setOpportunities((prevOpportunities) =>
        prevOpportunities.map((opportunity) =>
          opportunity.id === id ? (data[0] as SalesOpportunity) : opportunity
        )
      );
      showSuccess("Opportunity stage updated!");
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={
                <OpportunitiesPage 
                  opportunities={opportunities} 
                  addOpportunity={addOpportunity} 
                  updateOpportunityStage={updateOpportunityStage} 
                />
              } 
            />
            <Route 
              path="/dashboard" 
              element={<DashboardPage opportunities={opportunities} />} 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;