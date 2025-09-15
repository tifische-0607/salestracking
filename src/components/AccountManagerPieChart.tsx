"use client";

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { SalesOpportunity } from '@/types/sales';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AccountManagerPieChartProps {
  opportunities: SalesOpportunity[];
}

// Simple function to generate a consistent color from a string
const stringToColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = hash % 360;
  return `hsl(${h}, 70%, 50%)`;
};

const AccountManagerPieChart: React.FC<AccountManagerPieChartProps> = ({ opportunities }) => {
  const data = React.useMemo(() => {
    const managerCounts = opportunities.reduce((acc, opp) => {
      if (opp.accountManager) {
        acc[opp.accountManager] = (acc[opp.accountManager] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(managerCounts).map(([name, value]) => ({
      name,
      value,
    }));
  }, [opportunities]);

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Opportunities by Account Manager</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">No account manager data available.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Opportunities by Account Manager</CardTitle>
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
                  <Cell key={`cell-${entry.name}`} fill={stringToColor(entry.name)} />
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

export default AccountManagerPieChart;