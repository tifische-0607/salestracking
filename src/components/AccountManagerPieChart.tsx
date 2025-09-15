import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { SalesOpportunity } from '@/types/sales';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AccountManagerPieChartProps {
  opportunities: SalesOpportunity[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const AccountManagerPieChart: React.FC<AccountManagerPieChartProps> = ({ opportunities }) => {
  const data = React.useMemo(() => {
    const managerCounts = opportunities.reduce((acc, opp) => {
      const manager = opp.accountmanager || 'Unassigned';
      acc[manager] = (acc[manager] || 0) + 1;
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
          <p className="text-muted-foreground">No data to display.</p>
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
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number, name: string) => [`${value} opportunities`, name]}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default AccountManagerPieChart;