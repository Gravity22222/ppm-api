'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Pequeno helper para pegar o nome de usuário do token
const getUsernameFromToken = (): string | null => {
    const token = localStorage.getItem('authToken');
    if (!token) return null;
    try {
        // O token JWT é dividido em 3 partes por ".". A parte do meio (payload) contém os dados.
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.sub; // 'sub' é o campo padrão para "subject", que definimos como o username.
    } catch (error) {
        console.error("Erro ao decodificar token:", error);
        return null;
    }
};

export default function Header() {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
      setUsername(getUsernameFromToken());
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    router.push('/login');
  };

  if (!username) {
    // Não renderiza o header se não houver usuário (ex: na tela de login)
    return null;
  }

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="text-lg font-semibold text-blue-900">
        Painel PPM Eurofarma
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-gray-700">Bem-vindo, <span className="font-bold">{username}</span></span>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition-colors text-sm"
        >
          Sair
        </button>
      </div>
    </header>
  );
}