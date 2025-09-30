'use client';

import { useMemo } from 'react';

// Reutilizamos a interface do projeto que já temos
interface Project {
  status: string;
  responsible: string;
}

interface DashboardFiltersProps {
  projects: Project[]; // Recebe todos os projetos para extrair as opções de filtro
  onFilterChange: (filters: { responsible: string; status: string }) => void; // Função para notificar o pai sobre a mudança
}

export default function DashboardFilters({ projects, onFilterChange }: DashboardFiltersProps) {
  // Usamos useMemo para calcular as opções dos filtros apenas uma vez, otimizando a performance.
  const responsibleOptions = useMemo(() => {
    const responsibles = projects.map(p => p.responsible).filter(Boolean); // Filtra nulos ou vazios
    return ['Todos', ...Array.from(new Set(responsibles))]; // Cria uma lista de nomes únicos
  }, [projects]);

  const statusOptions = useMemo(() => {
    const statuses = projects.map(p => p.status).filter(Boolean);
    return ['Todos', ...Array.from(new Set(statuses))];
  }, [projects]);

  const handleResponsibleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const responsible = e.target.value;
    const statusSelect = document.getElementById('status-filter') as HTMLSelectElement;
    onFilterChange({ responsible, status: statusSelect.value });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value;
    const responsibleSelect = document.getElementById('responsible-filter') as HTMLSelectElement;
    onFilterChange({ responsible: responsibleSelect.value, status });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-8 flex items-center space-x-4">
      <span className="font-semibold text-gray-700">Filtrar por:</span>
      <div>
        <label htmlFor="responsible-filter" className="sr-only">Responsável</label>
        <select
          id="responsible-filter"
          onChange={handleResponsibleChange}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          {responsibleOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="status-filter" className="sr-only">Status</label>
        <select
          id="status-filter"
          onChange={handleStatusChange}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          {statusOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
    </div>
  );
}