import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export const WhatsAppButton = () => {
  const location = useLocation();
  
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
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
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