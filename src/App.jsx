import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// --- COMPONENTES GLOBAIS ---
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';

// --- PÁGINAS REAIS (Importadas das pastas que criamos) ---
// Se você não criou a pasta 'pages' e deixou tudo em components, ajuste o caminho.
// Mas se seguiu o tutorial, deve ser assim:
import { Home } from './pages/Home';      // <--- Crie este arquivo se ainda não criou (veja nota abaixo)
import { Catalog } from './pages/Catalog';
import { CarDetails } from './pages/CarDetails';
import { Schedule } from './pages/Schedule';

function App() {
  return (
    <Router>
      <div className="bg-dark min-h-screen text-white font-sans flex flex-col">
        {/* Header fixo no topo */}
        <Header />
        
        {/* Área principal que cresce */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogo" element={<Catalog />} />
            <Route path="/agende" element={<Schedule />} />
            <Route path="/detalhes/:slug" element={<CarDetails />} />
          </Routes>
        </main>

        {/* Elementos flutuantes e rodapé */}
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
}

export default App;