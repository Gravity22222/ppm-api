'use client';

import { toast } from 'react-toastify'; // Importe o toast
import { useState, useEffect } from 'react';
import api from '@/lib/api'; // Importe nosso helper

// ... (interfaces continuam as mesmas)
interface Project {
  id: number;
  name: string;
  description: string;
  responsible: string;
  status: string;
  startDate: string;
  endDate: string;
}

interface ProjectFormProps {
  onSuccess: () => void;
  projectToEdit?: Project | null;
}

const emptyForm = {
    name: '',
    description: '',
    responsible: '',
    status: 'Planejamento',
    startDate: '',
    endDate: '',
};

export default function ProjectForm({ onSuccess, projectToEdit }: ProjectFormProps) {
  const [formData, setFormData] = useState(emptyForm);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // ... (lógica do useEffect continua a mesma)
    if (projectToEdit) {
        const formattedStartDate = projectToEdit.startDate ? projectToEdit.startDate.split('T')[0] : '';
        const formattedEndDate = projectToEdit.endDate ? projectToEdit.endDate.split('T')[0] : '';
        setFormData({
            name: projectToEdit.name,
            description: projectToEdit.description,
            responsible: projectToEdit.responsible,
            status: projectToEdit.status,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
        });
    } else {
        setFormData(emptyForm);
    }
  }, [projectToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    // ... (lógica do handleChange continua a mesma)
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const isEditing = !!projectToEdit;
    const url = isEditing
      ? `http://localhost:8080/api/projects/${projectToEdit.id}`
      : 'http://localhost:8080/api/projects';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      // SUBSTITUIÇÃO AQUI
      const response = await api(url, {
        method: method,
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Falha ao ${isEditing ? 'atualizar' : 'criar'} o projeto.`);
      }
      toast.success(`Projeto ${isEditing ? 'atualizado' : 'criado'} com sucesso!`);
        onSuccess();
      onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };
  
  // ... (o JSX do formulário continua o mesmo)
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="bg-red-100 text-red-700 p-3 rounded-md">{error}</p>}
      <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome do Projeto</label>
          <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
      </div>
      <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição</label>
          <textarea name="description" id="description" rows={3} required value={formData.description} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="responsible" className="block text-sm font-medium text-gray-700">Responsável</label>
          <input type="text" name="responsible" id="responsible" required value={formData.responsible} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
          <select name="status" id="status" value={formData.status} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
            <option>Planejamento</option>
            <option>Em Andamento</option>
            <option>Pausado</option>
            <option>Concluído</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Data de Início</label>
          <input type="date" name="startDate" id="startDate" value={formData.startDate} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
        </div>
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">Data de Término</label>
          <input type="date" name="endDate" id="endDate" value={formData.endDate} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
        </div>
      </div>
      <button type="submit" disabled={submitting} className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-300">
        {submitting ? 'Salvando...' : (projectToEdit ? 'Salvar Alterações' : 'Criar Projeto')}
      </button>
    </form>
  );
}