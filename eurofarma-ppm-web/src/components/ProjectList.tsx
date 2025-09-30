'use client';

import { toast } from 'react-toastify'; // Importe o toast
import { useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api'; // Importe nosso helper
import Modal from './Modal';
import ProjectForm from './ProjectForm';

// ... (interface ProjectFull continua a mesma)
interface ProjectFull {
  id: number;
  name: string;
  description: string;
  responsible: string;
  status: string;
}

interface ProjectListProps {
  projects: ProjectFull[];
  onDataChange: () => void;
}

export default function ProjectList({ projects, onDataChange }: ProjectListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleSuccess = () => {
    setIsModalOpen(false);
    onDataChange();
  };

  const handleDelete = async (e: React.MouseEvent, projectId: number) => {
    e.stopPropagation();
    e.preventDefault();

    const confirmationToast = () => toast(
      ({ closeToast }) => (
          <div className="text-center">
              <p className="mb-2">Tem certeza que deseja excluir?</p>
              <button
                  onClick={() => {
                      deleteProject(projectId);
                      if(closeToast) closeToast();
                  }}
                  className="bg-red-500 text-white px-3 py-1 rounded mr-2 text-sm"
              >
                  Sim, excluir
              </button>
              <button
                  onClick={closeToast}
                  className="bg-gray-300 text-gray-800 px-3 py-1 rounded text-sm"
              >
                  Cancelar
              </button>
          </div>
      ),
      { autoClose: false, closeButton: false }
  );

  const deleteProject = async (id: number) => {
      try {
          const response = await api(`http://localhost:8080/api/projects/${id}`, {
              method: 'DELETE',
          });
          if (!response.ok) throw new Error('Falha ao excluir o projeto.');

          toast.success("Projeto excluído com sucesso!");
          onDataChange();

      } catch (err: any) {
          // SUBSTITUA: alert(err.message);
          toast.error(err.message); // Por esta linha
      }
  };
  
  confirmationToast(); // Dispara a notificação de confirmação
};
  
  
  // ... (o JSX do componente continua o mesmo)
  return (
    <>
      <div className="flex justify-end mb-6">
        <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
          + Adicionar Novo Projeto
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Novo Projeto">
        <ProjectForm onSuccess={handleSuccess} />
      </Modal>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length > 0 ? (
            projects.map((project) => (
              <Link href={`/projects/${project.id}`} key={project.id} className="relative group">
                <button onClick={(e) => handleDelete(e, project.id)} className="absolute top-2 right-2 z-10 p-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Excluir projeto">
                  X
                </button>
                <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500 h-full group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">{project.name}</h2>
                  <p className="text-gray-600 mb-4 h-20 overflow-hidden">{project.description}</p>
                  <div className="text-sm border-t pt-4 mt-4">
                    <p className="mb-2"><span className="font-semibold text-gray-700">Responsável:</span> {project.responsible}</p>
                    <p className="flex items-center"><span className="font-semibold text-gray-700 mr-2">Status:</span> <span className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-xs font-medium">{project.status}</span></p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
             <div className="col-span-full text-center text-gray-500 bg-white p-10 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold">Nenhum projeto encontrado</h3>
                <p>Clique em "Adicionar Novo Projeto" para começar.</p>
            </div>
          )}
        </div>
    </>
  );
          }