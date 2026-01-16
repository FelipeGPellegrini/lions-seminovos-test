import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Lista de links. "highlight" são os do teste.
  const links = [
    { name: 'Home', href: '/', highlight: true },
    { name: 'Catálogo', href: '/catalogo', highlight: true },
    { name: 'Agende uma visita', href: '/agende', highlight: true },
    // Links "decorativos" para dar volume e realismo
    { name: 'Financiamento', href: '#', highlight: false },
    { name: 'Fipe', href: '#', highlight: false },
    { name: 'Pós venda', href: '#', highlight: false },
  ];

  // Efeito para mudar o header quando descer o scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // Header fixo no topo
    <header 
      className={`fixed top-0 left-0 w-full max-w-[100vw] z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark/95 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        
        {/* LOGO */}
        <Link to="/" className="text-white hover:text-primary transition-colors">
          <Logo className="h-8 md:h-10 w-auto" />
        </Link>

        {/* MENU DESKTOP */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`text-sm font-medium transition-colors relative group ${
                link.highlight 
                  ? 'text-white hover:text-primary' 
                  : 'text-gray-400 hover:text-gray-200'
              } ${location.pathname === link.href && link.highlight ? 'text-primary' : ''}`}
            >
              {link.name}
              {/* Linha animada embaixo do link ativo/hover */}
              {link.highlight && (
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full ${location.pathname === link.href ? 'w-full' : ''}`}></span>
              )}
            </Link>
          ))}
        </nav>

        {/* BOTÃO HAMBURGUER (MOBILE) */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white z-[70] p-2 focus:outline-none relative"
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center gap-1.5">
            {/* Linha de cima */}
            <motion.span 
              animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="w-full h-0.5 bg-white block origin-center"
            />
            {/* Linha do meio (some) */}
            <motion.span 
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-full h-0.5 bg-white block"
            />
            {/* Linha de baixo */}
            <motion.span 
              animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="w-full h-0.5 bg-white block origin-center"
            />
          </div>
        </button>

        {/* MENU MOBILE (Full Screen ou Dropdown) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 w-full h-screen bg-dark/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center gap-8 z-[60]"
            >
              {/* Botão de fechar dentro do menu */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 text-white z-[70] p-2 focus:outline-none"
              >
                
              </button>
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)} // Fecha ao clicar
                  className={`text-2xl font-semibold ${
                    link.highlight 
                      ? 'text-white' 
                      : 'text-gray-500'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </header>
  );
};