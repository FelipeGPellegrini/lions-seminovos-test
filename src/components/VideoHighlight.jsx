import React from 'react';
import { motion } from 'framer-motion';

export const VideoHighlight = () => {
  // Configuração da animação de "abertura" (Curtain Reveal)
  const revealVariants = {
    hidden: { 
      clipPath: 'inset(45% 0 45% 0)', // Começa fechado (fresta fina)
      opacity: 0
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
    // ADICIONADO: 'overflow-hidden' na section para impedir a barra de rolagem lateral no mobile
    <section className="w-full bg-dark py-10 overflow-hidden">
      
      {/* Container do Vídeo */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        // CORREÇÃO DO GATILHO:
        // amount: 0.2 -> Garante que a animação comece assim que 20% do vídeo aparecer.
        // Isso resolve o problema de passar direto e não abrir.
        viewport={{ once: true, amount: 0.2 }} 
        variants={revealVariants}
        className="relative w-full h-[350px] md:h-[600px]" // Ajustei altura mobile para 350px para caber melhor
      >
        {/* Camada de Overlay */}
        <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none" />

        {/* O VÍDEO */}
        <video
          className="w-full h-full object-cover object-center"
          autoPlay
          loop
          muted
          playsInline // Essencial para iOS/Android
        >
          <source src="/assets/byd-seal.mp4" type="video/mp4" />
          Seu navegador não suporta vídeos.
        </video>

        {/* Texto Flutuante */}
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