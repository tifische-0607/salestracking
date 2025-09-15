"use client";

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { SalesOpportunity } from '@/types/sales';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SalesPieChartProps {
  opportunities: SalesOpportunity[];
}

const STAGE_COLORS: Record<SalesOpportunity['stage'], string> = {
  'New': '#3b82f6', // blue-500
  'Qualification': '#f59e0b', // amber-500
  'Proposal': '#8b5cf6', // violet-500
  'Negotiation': '#f97316', // orange-500
  'Closed Won': '#22c55e', // green-500
  'Closed Lost': '#ef4444', // red-500
};

const SalesPieChart: React.FC<SalesPieChartProps> = ({ opportunities }) => {
  const data = React.useMemo(() => {
    const stageCounts = opportunities.reduce((acc, opp) => {
      acc[opp.stage] = (acc[opp.stage] || 0) + 1;
      return acc;
    }, {} as Record<SalesOpportunity['stage'], number>);

    return Object.entries(stageCounts).map(([name, value]) => ({
      name: name as SalesOpportunity['stage'],
      value,
    }));
  }, [opportunities]);

  if (opportunities.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Opportunity Stages</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">No data to display. Add some opportunities first.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Opportunity Stages</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                  const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                  const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                  return (
                    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                      {`${(percent * 100).toFixed(0)}%`}
                    </text>
                  );
                }}
              >
                {data.map((entry) => (
                  <Cell key={`cell-${entry.name}`} fill={STAGE_COLORS[entry.name]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [value, 'Opportunities']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesPieChart;