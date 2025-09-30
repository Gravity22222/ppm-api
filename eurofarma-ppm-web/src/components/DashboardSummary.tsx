'use client';

import KpiCard from './KpiCard';

// 1. A interface agora é exportada para ser usada pelo componente pai
export interface Project {
  status: string;
  responsible: string;
  // Adicione outros campos aqui se precisar no futuro
}

interface DashboardSummaryProps {
  projects: Project[]; // 2. Recebe os projetos como propriedade
}

export default function DashboardSummary({ projects }: DashboardSummaryProps) {
  // 3. Removemos todo o useEffect e useState. A lógica agora é direta.
  const totalProjects = projects.length;
  const concludedProjects = projects.filter(p => p.status === 'Concluído').length;
  const inProgressProjects = projects.filter(p => p.status === 'Em Andamento').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <KpiCard title="Total de Projetos" value={totalProjects} />
      <KpiCard title="Projetos Concluídos" value={concludedProjects} />
      <KpiCard title="Em Andamento" value={inProgressProjects} />
    </div>
  );
}