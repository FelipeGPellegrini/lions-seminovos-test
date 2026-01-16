import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const VideoHighlight = () => {
  // Configuração da animação de "abertura" (Curtain Reveal)
  const revealVariants = {
    hidden: { 
      clipPath: 'inset(45% 0 45% 0)', // Começa fechado (só uma linha visível no meio)
      opacity: 0.8
    },
    visible: { 
      clipPath: 'inset(0% 0 0% 0)', // Abre totalmente
      opacity: 1,
      transition: { 
        duration: 1.5, // Demora 1.5s para abrir (bem suave)
        ease: [0.22, 1, 0.36, 1] // Easing "cinemático" (começa rápido, termina suave)
      }
    }
  };

  return (
    <section className="w-full bg-dark py-10 overflow-hidden">
      
      {/* Container do Vídeo */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20%" }} // A animação dispara quando 20% do elemento estiver na tela
        variants={revealVariants}
        className="relative w-full h-[400px] md:h-[600px]" // Altura controlada (Mobile: 400px, PC: 600px)
      >
        {/* Camada de Overlay (Opcional - para deixar levemente mais escuro se quiser texto por cima) */}
        <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none" />

        {/* O VÍDEO */}
        <video
          className="w-full h-full object-cover object-center" // object-cover corta o excesso mantendo o centro
          autoPlay
          loop
          muted
          playsInline // Importante para funcionar autoplay no iPhone/Android
        >
          <source src="/assets/byd-seal.mp4" type="video/mp4" />
          Seu navegador não suporta vídeos.
        </video>

        {/* Texto Flutuante (Opcional - Destaque Tecnológico) */}
        <div className="absolute bottom-10 left-10 z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <h3 className="text-white text-3xl md:text-5xl font-bold tracking-tighter uppercase">
              BYD Seal
            </h3>
            <p className="text-primary text-sm md:text-lg font-medium tracking-[0.2em] uppercase mt-2">
              Performance Elétrica
            </p>
          </motion.div>
        </div>

      </motion.div>
    </section>
  );
};