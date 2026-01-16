import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const VideoHighlight = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Detecta se é mobile para desativar a animação inicial
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Checa ao carregar
    checkMobile();
    
    // Checa se a pessoa redimensionar a tela
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Configuração da animação
  const revealVariants = {
    hidden: { 
      clipPath: 'inset(45% 0 45% 0)', // Desktop começa fechado
      opacity: 0.8
    },
    visible: { 
      clipPath: 'inset(0% 0 0% 0)', // Abre totalmente
      opacity: 1,
      transition: { 
        duration: 1.5, 
        ease: [0.22, 1, 0.36, 1] 
      }
    }
  };

  return (
    // overflow-hidden aqui previne a barra de rolagem lateral no mobile
    <section className="w-full bg-dark py-10 overflow-hidden">
      
      <motion.div
        // A MÁGICA ESTÁ AQUI:
        // Se for mobile, o estado inicial já é "visible" (aberto).
        // Se for Desktop, o estado inicial é "hidden" (fechado) e anima para "visible".
        initial={isMobile ? "visible" : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-20%" }} // Voltei para a config que funcionava no PC
        variants={revealVariants}
        className="relative w-full h-[350px] md:h-[600px]"
      >
        {/* Overlay leve */}
        <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none" />

        {/* Vídeo */}
        <video
          className="w-full h-full object-cover object-center"
          autoPlay
          loop
          muted
          playsInline // Essencial para mobile
        >
          <source src="/assets/byd-seal.mp4" type="video/mp4" />
          Seu navegador não suporta vídeos.
        </video>

        {/* Texto */}
        <div className="absolute bottom-10 left-6 md:left-10 z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <h3 className="text-white text-2xl md:text-5xl font-bold tracking-tighter uppercase drop-shadow-lg">
              BYD Seal
            </h3>
            <p className="text-primary text-xs md:text-lg font-medium tracking-[0.2em] uppercase mt-2 drop-shadow-md">
              Performance Elétrica
            </p>
          </motion.div>
        </div>

      </motion.div>
    </section>
  );
};