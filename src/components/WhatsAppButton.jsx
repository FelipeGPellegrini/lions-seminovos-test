import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export const WhatsAppButton = () => {
  const location = useLocation();
  const [showTooltip, setShowTooltip] = useState(false);
  
  // Número da loja (fictício)
  const PHONE_NUMBER = '5511999999999';

  // Lógica de Mensagem Inteligente
  const getMessage = () => {
    const path = location.pathname;
    
    // 1. Se estiver vendo um carro específico (Rota /detalhes/...)
    if (path.includes('/detalhes')) {
      // Tenta pegar o nome do carro da URL de forma simples
      const slug = path.split('/').pop().replace(/-/g, ' '); 
      // Ex: "peugeot-208" vira "peugeot 208"
      return `Olá! Vi o ${slug} no site e gostaria de saber mais detalhes.`;
    }

    // 2. Se estiver na página de Agendamento
    if (path.includes('/agende')) {
      return "Olá! Estou tentando agendar uma visita pelo site e preciso de ajuda.";
    }

    // 3. Se estiver no Catálogo geral
    if (path.includes('/catalogo')) {
      return "Olá! Estou vendo o estoque no site e gostaria de saber quais opções de financiamento vocês têm.";
    }

    // 4. Padrão (Home e outras páginas)
    return "Olá! Vim pelo site da Lions e gostaria de conhecer as ofertas.";
  };

  const handleClick = () => {
    const message = encodeURIComponent(getMessage());
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${message}`, '_blank');
    setShowTooltip(false); 
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [location.pathname]); 

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      
      {/* BALÃO DE MENSAGEM */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            className="bg-white text-dark px-4 py-3 rounded-xl shadow-2xl mb-2 relative max-w-[200px] border border-gray-100"
          >
            <button 
              onClick={(e) => { e.stopPropagation(); setShowTooltip(false); }}
              className="absolute -top-2 -left-2 bg-gray-200 rounded-full p-0.5 hover:bg-red-500 hover:text-white transition-colors"
            >
              <X size={12} />
            </button>
            <p className="text-sm font-medium leading-tight">
              Ficou com alguma dúvida? Chama a gente!
            </p>
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white rotate-45 border-r border-b border-gray-100 transform translate-x-1/2"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BOTÃO PRINCIPAL */}
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative bg-[#25D366] hover:bg-[#20bd5a] text-white p-3 rounded-full shadow-lg shadow-green-900/20 transition-colors group flex items-center justify-center"
        aria-label="Falar no WhatsApp"
      >
        {/* CORREÇÃO AQUI: Removemos o ponto (.) do início do src */}
        <img 
            className='w-8 h-8 md:w-10 md:h-10 object-contain' 
            src="/assets/logo-wpp.png" 
            alt="Logo Whatsapp" 
        />

        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-dark animate-bounce">
          1
        </span>
        
        <span className="absolute inset-0 rounded-full border border-[#25D366] opacity-0 animate-ping group-hover:opacity-100"></span>
      </motion.button>

    </div>
  );
};