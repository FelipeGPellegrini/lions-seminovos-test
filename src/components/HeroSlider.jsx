import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { tr } from 'framer-motion/client';

const AUTO_PLAY_TIME = 6000; // Tempo em ms (6 segundos)

const slides = [
  {
    id: 1,
    images: {
      desktop: 'https://dmmfmlu2mykln.cloudfront.net/site/home/carrossel/foto-28275-desktop.webp',
      mobile: 'https://dmmfmlu2mykln.cloudfront.net/site/home/carrossel/foto-28275-mobile.webp',
      alt: 'Oferta Yamaha Lander',
    },
    link: '/catalogo?categoria=motos',
    buttonText: 'VER OFERTA',
    // CONFIGURAÇÃO DE TEXTO SEPARADA
    content: {
      desktop: {
        title: 'Motos Selecionadas',
        description: 'A liberdade que você procura com as melhores condições.',
        show: true 
      },
      mobile: {
        title: 'Motos Selecionadas', 
        description: null,
        show: true 
      }
    }
  },
  {
    id: 2,
    images: {
      desktop: 'https://dmmfmlu2mykln.cloudfront.net/site/home/carrossel/foto-19645-desktop.webp',
      mobile: 'https://dmmfmlu2mykln.cloudfront.net/site/home/carrossel/foto-19645-mobile.webp',
      alt: 'Carros Blindados',
    },
    link: '/catalogo?spec=blindado',
    buttonText: 'CONFIRA O ESTOQUE',
    content: {
      desktop: {
        title: 'Blindados à Pronta Entrega',
        description: 'Segurança máxima e conforto para você e sua família.',
        show: true
      },
      mobile: {
        title: 'Blindados à Pronta Entrega', // Mantive no mobile pois a imagem de blindado as vezes não tem texto
        description: 'Sua segurança em primeiro lugar.',
        show: true 
      }
    }
  },
  {
    id: 3,
    images: {
      desktop: 'https://dmmfmlu2mykln.cloudfront.net/site/home/carrossel/foto-28419-desktop.webp',
      mobile: 'https://dmmfmlu2mykln.cloudfront.net/site/home/carrossel/foto-28419-mobile.webp',
      alt: 'Ofertas Peugeot',
    },
    link: '/catalogo?marca=peugeot',
    buttonText: 'SAIBA MAIS',
    content: {
      desktop: {
        title: 'Peugeot 208 Style',
        description: 'Design, tecnologia e economia em um só carro.',
        show: true
      },
      mobile: {
        title: 'Peugeot 208 Style',
        description: null,
        show: true 
      }
    }
  },
];

export const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, AUTO_PLAY_TIME);
    return () => clearInterval(timer);
  }, [current]);

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const activeSlide = slides[current];

  return (
    <div className="relative w-full aspect-[3/5] md:aspect-[3/1] bg-dark group overflow-hidden">
      
      <AnimatePresence mode='wait'>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 w-full h-full"
        >
          {/* IMAGEM RESPONSIVA */}
          <picture>
            <source media="(max-width: 768px)" srcSet={activeSlide.images.mobile} />
            <img
              src={activeSlide.images.desktop}
              alt={activeSlide.images.alt}
              className="w-full h-full object-cover object-center"
            />
          </picture>

          {/* OVERLAY DEGRADÊ (Controlado pela visibilidade do texto) */}
          {/* Mobile Overlay */}
          <div className={`absolute inset-0 md:hidden transition-all duration-500 ${
            activeSlide.content.mobile.show 
              ? 'bg-gradient-to-t from-black/90 via-black/20 to-transparent' 
              : 'bg-gradient-to-t from-black/60 to-transparent' // Leve degradê apenas para o botão aparecer
          }`} />

          {/* Desktop Overlay */}
          <div className={`absolute inset-0 hidden md:block transition-all duration-500 ${
            activeSlide.content.desktop.show 
              ? 'bg-gradient-to-r from-black/80 via-black/30 to-transparent' 
              : 'bg-transparent'
          }`} />

          {/* ÁREA DE CONTEÚDO */}
          <div className="absolute inset-0 container mx-auto px-6 md:px-12 flex flex-col justify-end md:justify-center items-center md:items-start pb-20 md:pb-0 z-10">
            <div className="max-w-xl text-center md:text-left space-y-4">
              
              {/* === TEXTO DESKTOP (Hidden Mobile) === */}
              {activeSlide.content.desktop.show && (
                <div className="hidden md:block">
                  <motion.h2 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-5xl font-bold text-white leading-tight drop-shadow-lg"
                  >
                    {activeSlide.content.desktop.title}
                  </motion.h2>
                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-200 text-lg font-medium drop-shadow-md mt-2"
                  >
                    {activeSlide.content.desktop.description}
                  </motion.p>
                </div>
              )}

              {/* === TEXTO MOBILE (Hidden Desktop) === */}
              {activeSlide.content.mobile.show && (
                <div className="block md:hidden">
                  <motion.h2 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl font-bold text-white leading-tight drop-shadow-lg"
                  >
                    {activeSlide.content.mobile.title}
                  </motion.h2>
                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-200 text-sm font-medium drop-shadow-md mt-2"
                  >
                    {activeSlide.content.mobile.description}
                  </motion.p>
                </div>
              )}

              {/* BOTÃO (Sempre visível) */}
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(activeSlide.link)}
                className="mt-4 px-8 py-3 bg-primary hover:bg-red-700 text-white font-bold text-sm uppercase tracking-widest rounded shadow-lg transition-colors border-2 border-transparent hover:border-white/20"
              >
                {activeSlide.buttonText}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* SETAS DE NAVEGAÇÃO */}
      <button
        onClick={(e) => { e.stopPropagation(); prevSlide(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-primary text-white p-3 rounded-full backdrop-blur-md transition-all border border-white/20 hidden md:block z-20"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); nextSlide(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-primary text-white p-3 rounded-full backdrop-blur-md transition-all border border-white/20 hidden md:block z-20"
      >
        <ChevronRight size={24} />
      </button>

      {/* INDICADORES COM BARRA DE PROGRESSO (CORRIGIDO) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={(e) => { e.stopPropagation(); setCurrent(index); }}
            className={`relative h-1.5 rounded-full transition-all duration-300 shadow-sm overflow-hidden ${
              current === index ? 'w-8 bg-white/30' : 'w-2 bg-white/50 hover:bg-white'
            }`}
          >
            {/* Barra de Progresso Animada */}
            {current === index && (
              <motion.div
                layoutId="progress"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: AUTO_PLAY_TIME / 1000, ease: 'linear' }}
                className="absolute top-0 left-0 h-full bg-primary w-full"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};