'use client';

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Project } from './DashboardSummary'; // Reutilizamos a interface

interface StatusPieChartProps {
  projects: Project[];
}

interface ChartData {
  name: string;
  value: number;
  [key: string]: any; 
}

const COLORS: Record<string, string> = {
  'Em Andamento': '#3B82F6', 
  'Concluído': '#10B981',   
  'Planejamento': '#F59E0B',
  'Pausado': '#6B7280',   
};

export default function StatusPieChart({ projects }: StatusPieChartProps) {
  // A lógica de processamento agora roda diretamente com os dados recebidos via props
  const statusCounts = projects.reduce((acc: Record<string, number>, project: Project) => {
    const status = project.status || 'Sem Status';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const data: ChartData[] = Object.keys(statusCounts).map(status => ({
    name: status,
    value: statusCounts[status],
  }));

  if (data.length === 0) {
    return <div className="h-64 flex items-center justify-center bg-gray-100 rounded-lg">Não há dados para exibir.</div>;
  }

  return (
    <div style={{ width: '100%', height: 300 }}>
        {/* ... o JSX do gráfico continua exatamente o mesmo ... */}
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
                    label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[entry.name] || '#A1A1AA'} />
                    ))}
                </Pie>
                <Tooltip formatter={(value: number) => `${value} projeto(s)`} />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    </div>
  );
}