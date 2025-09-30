import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

// 1. Importações da biblioteca de Toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from '@/components/Header'; // 2. Importe nosso novo Header

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PPM Eurofarma',
  description: 'Gestão de Portfólio de Projetos de Inovação',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {/* 3. O ToastContainer precisa estar no topo. Ele é invisível até ser chamado. */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        {/* 4. Nosso Header (só será exibido nas páginas corretas) */}
        <Header />

        {/* O conteúdo da página será renderizado aqui */}
        {children}
      </body>
    </html>
  )
}