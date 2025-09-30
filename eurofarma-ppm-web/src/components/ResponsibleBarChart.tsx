'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Project } from './DashboardSummary'; // Reutilizamos a interface

interface ResponsibleBarChartProps {
  projects: Project[];
}

interface ChartData {
  name: string;
  Projetos: number;
}

export default function ResponsibleBarChart({ projects }: ResponsibleBarChartProps) {
  // Lógica de processamento direto, sem fetch
  const responsibleCounts = projects.reduce((acc: Record<string, number>, project: Project) => {
    const responsible = project.responsible || 'Não atribuído';
    acc[responsible] = (acc[responsible] || 0) + 1;
    return acc;
  }, {});

  const data: ChartData[] = Object.keys(responsibleCounts).map(responsible => ({
    name: responsible,
    Projetos: responsibleCounts[responsible],
  }));

  if (data.length === 0) {
    return <div className="h-80 flex items-center justify-center bg-gray-100 rounded-lg">Não há dados para exibir.</div>;
  }

  return (
    <div style={{ width: '100%', height: 350 }}>
        {/* ... o JSX do gráfico continua exatamente o mesmo ... */}
        <ResponsiveContainer>
            <BarChart
              layout="vertical"
              data={data}
              margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" allowDecimals={false} />
              <YAxis dataKey="name" type="category" width={120} />
              <Tooltip cursor={{fill: 'rgba(239, 246, 255, 0.5)'}} formatter={(value: number) => `${value} projeto(s)`} />
              <Legend />
              <Bar dataKey="Projetos" fill="#3B82F6" />
            </BarChart>
        </ResponsiveContainer>
    </div>
  );
}