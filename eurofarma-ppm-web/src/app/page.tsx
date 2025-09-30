'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import ProjectList from '@/components/ProjectList';
import StatusPieChart from '@/components/StatusPieChart';
import DashboardSummary from '@/components/DashboardSummary';
import ResponsibleBarChart from '@/components/ResponsibleBarChart';
import DashboardFilters from '@/components/DashboardFilters';

// 1. CORREÇÃO: Definimos a interface do objeto Project aqui na página principal.
// Isso garante que o TypeScript saiba quais propriedades um projeto tem.
interface Project {
  id: number;
  name: string;
  description: string;
  responsible: string;
  status: string;
}

export default function Home() {
  // 2. CORREÇÃO: Informamos ao useState que 'projects' será um array de 'Project'.
  const [projects, setProjects] = useState<Project[]>([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [activeFilters, setActiveFilters] = useState({
    responsible: 'Todos',
    status: 'Todos',
  });
  
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/login');
      return;
    }
    fetchAllProjects();
  }, [router]);
  
  const fetchAllProjects = async () => {
    setLoading(true);
    try {
      const response = await api('http://localhost:8080/api/projects');
      if (!response.ok) throw new Error('Falha ao carregar os dados.');
      const data = await response.json();
      setProjects(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDataChange = () => {
    fetchAllProjects();
  };
  
  const handleFilterChange = (newFilters: { responsible: string; status: string }) => {
    setActiveFilters(newFilters);
  };

  const filteredProjects = useMemo(() => {
    // Agora o TypeScript sabe que 'project' é do tipo Project e tem as propriedades 'responsible' e 'status'.
    return projects.filter(project => {
      const responsibleMatch = activeFilters.responsible === 'Todos' || project.responsible === activeFilters.responsible;
      const statusMatch = activeFilters.status === 'Todos' || project.status === activeFilters.status;
      return responsibleMatch && statusMatch;
    });
  }, [projects, activeFilters]);

  if (loading) {
    return <p className="text-center p-10 text-lg">Carregando painel...</p>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-12 bg-gray-100">
      <div className="w-full max-w-7xl">
        {error && <p className="text-center text-red-500">Erro ao carregar: {error}</p>}
        {!error && (
          <>
            <DashboardFilters projects={projects} onFilterChange={handleFilterChange} />
            <section className="mb-10 space-y-8">
              <DashboardSummary projects={filteredProjects} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="p-6 bg-white rounded-lg shadow-md">
                  <h2 className="text-2xl font-semibold text-gray-700 mb-4">Projetos por Status</h2>
                  <StatusPieChart projects={filteredProjects} />
                </div>
                <div className="p-6 bg-white rounded-lg shadow-md">
                  <h2 className="text-2xl font-semibold text-gray-700 mb-4">Projetos por Responsável</h2>
                  <ResponsibleBarChart projects={filteredProjects} />
                </div>
              </div>
            </section>
            <section>
                <ProjectList projects={filteredProjects} onDataChange={handleDataChange} />
            </section>
          </>
        )}
      </div>
    </main>
  );
}