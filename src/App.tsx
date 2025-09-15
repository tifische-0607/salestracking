import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import OpportunitiesPage from "./pages/OpportunitiesPage";
import DashboardPage from "./pages/DashboardPage";
import { SalesOpportunity } from "./types/sales";

const queryClient = new QueryClient();

const App = () => {
  const [opportunities, setOpportunities] = useState<SalesOpportunity[]>(() => {
    try {
      const savedOpportunities = localStorage.getItem("salesOpportunities");
      return savedOpportunities ? JSON.parse(savedOpportunities) : [];
    } catch (error) {
      console.error("Error parsing opportunities from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("salesOpportunities", JSON.stringify(opportunities));
  }, [opportunities]);

  const addOpportunity = (newOpportunityData: Omit<SalesOpportunity, "id">) => {
    const newOpportunity: SalesOpportunity = {
      id: crypto.randomUUID(),
      ...newOpportunityData,
    };
    setOpportunities((prevOpportunities) => [...prevOpportunities, newOpportunity]);
  };

  const updateOpportunityStage = (id: string, newStage: SalesOpportunity['stage']) => {
    setOpportunities((prevOpportunities) =>
      prevOpportunities.map((opportunity) =>
        opportunity.id === id ? { ...opportunity, stage: newStage } : opportunity
      )
    );
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route 
              path="/opportunities" 
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