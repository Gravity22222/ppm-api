'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/lib/api'; // Importe nosso helper
import Modal from '@/components/Modal';
import ProjectForm from '@/components/ProjectForm';

// ... (interface Project continua a mesma)
interface Project {
  id: number;
  name: string;
  description: string;
  responsible: string;
  status: string;
  startDate: string;
  endDate: string;
}

export default function ProjectDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const fetchProject = async () => {
    try {
      // SUBSTITUIÇÃO AQUI
      const response = await api(`http://localhost:8080/api/projects/${id}`);
      
      if (response.status === 404) throw new Error('Projeto não encontrado');
      if (!response.ok) throw new Error('Falha ao buscar dados do projeto');
      
      const data = await response.json();
      setProject(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        router.push('/login');
        return;
    }
    if (id) {
      fetchProject();
    }
  }, [id, router]);

  const handleEditSuccess = () => {
    setIsModalOpen(false);
    setLoading(true);
    fetchProject();
  };

  // ... (o resto do JSX continua o mesmo)
  if (loading) return <div className="text-center p-10">Carregando...</div>;
  if (error) return <div className="text-center p-10 text-red-500">Erro: {error}</div>;
  if (!project) return <div className="text-center p-10">Projeto não encontrado.</div>;
  
  return (
    <>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Editar Projeto">
        <ProjectForm onSuccess={handleEditSuccess} projectToEdit={project} />
      </Modal>

      <main className="flex min-h-screen flex-col items-center p-8 md:p-24 bg-gray-50">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl font-bold text-blue-900">{project.name}</h1>
              <span className="bg-blue-100 text-blue-800 py-1 px-4 rounded-full text-sm font-medium mt-2 inline-block">{project.status}</span>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Editar
            </button>
          </div>
          <p className="text-lg text-gray-600 mt-2 mb-6">{project.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-6">
              <div>
                  <h3 className="font-semibold text-gray-500">Responsável</h3>
                  <p className="text-lg text-gray-800">{project.responsible}</p>
              </div>
              <div>
                  <h3 className="font-semibold text-gray-500">Data de Início</h3>
                  <p className="text-lg text-gray-800">{project.startDate ? new Date(project.startDate).toLocaleDateString('pt-BR', {timeZone: 'UTC'}) : 'N/A'}</p>
              </div>
              <div>
                  <h3 className="font-semibold text-gray-500">Data de Término</h3>
                  <p className="text-lg text-gray-800">{project.endDate ? new Date(project.endDate).toLocaleDateString('pt-BR', {timeZone: 'UTC'}) : 'N/A'}</p>
              </div>
          </div>
          <div className="mt-8 text-center">
              <Link href="/" className="text-blue-600 hover:underline">
                  &larr; Voltar para a lista de projetos
              </Link>
          </div>
        </div>
      </main>
    </>
  );
}