import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const VideoHighlight = () => {
  const videoRef = useRef(null);
  
  // CORREÇÃO 1: Inicializa o estado JÁ sabendo o tamanho da tela.
  // Isso impede que ele carregue como "Desktop" e depois mude para "Mobile".
  const [isMobile, setIsMobile] = useState(() => 
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Apenas para desktop: força o vídeo a carregar e tocar
  useEffect(() => {
    if (isMobile) return; // Não faz nada no mobile (usa GIF)
    
    const video = videoRef.current;
    if (!video) return;

    // Adiciona atributos específicos para mobile via DOM direto
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('playsinline', 'true');

    const handleCanPlay = () => {
      // Tenta tocar quando o vídeo estiver pronto
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay bloqueado, mas vídeo deve aparecer
        });
      }
    };

    video.addEventListener('canplay', handleCanPlay);

    // Tenta tocar imediatamente
    const timeoutId = setTimeout(() => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay bloqueado, mas o vídeo ainda deve aparecer
        });
      }
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [isMobile]);

  // Configuração da animação (Só usada se NÃO for mobile)
  const revealVariants = {
    hidden: { 
      clipPath: 'inset(45% 0 45% 0)', 
      opacity: 0.8
    },
    visible: { 
      clipPath: 'inset(0% 0 0% 0)', 
      opacity: 1,
      transition: { 
        duration: 1.5, 
        ease: [0.22, 1, 0.36, 1] 
      }
    }
  };

  // Se for mobile, não aplicamos variantes de animação complexas
  const animationProps = isMobile ? {} : {
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, margin: "-20%" },
    variants: revealVariants
  };

  return (
    // CORREÇÃO 2: 'max-w-[100vw]' e 'overflow-x-hidden' forçam o corte lateral
    <section className="w-full max-w-[100vw] bg-dark py-10 overflow-hidden overflow-x-hidden relative">
      
      <motion.div
        // Espalhamos as props de animação apenas se for Desktop
        {...animationProps}
        
        // No mobile, forçamos o estilo estático (sem clip-path)
        style={isMobile ? { opacity: 1, clipPath: 'none' } : {}}

        className="relative w-full h-[350px] md:h-[600px] mx-auto"
      >
        {/* Overlay leve */}
        <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none" />

        {/* Mobile: GIF | Desktop: Vídeo */}
        {isMobile ? (
          // MOBILE: Usa GIF
          <img
            src="/assets/byd-seal.gif"
            alt="BYD Seal"
            className="w-full h-full object-cover object-center"
          />
        ) : (
          // DESKTOP: Usa Vídeo
          <video
            ref={videoRef}
            className="w-full h-full object-cover object-center"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/assets/byd-seal-poster.jpg"
            style={{ 
              WebkitPlaysinline: true,
              playsInline: true
            }}
          >
            <source src="/assets/byd-seal.mp4" type="video/mp4" />
            <source src="/assets/byd-seal.webm" type="video/webm" />
            Seu navegador não suporta vídeos.
          </video>
        )}

        {/* Texto */}
        <div className="absolute bottom-10 left-6 md:left-10 z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
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