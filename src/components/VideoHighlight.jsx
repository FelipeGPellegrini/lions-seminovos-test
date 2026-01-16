import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const VideoHighlight = () => {
  const videoRef = useRef(null);
  const [videoError, setVideoError] = useState(false);
  
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

  // Força o vídeo a carregar e tocar no mobile
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Adiciona atributos específicos para mobile via DOM direto
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('playsinline', 'true');
    video.setAttribute('x5-playsinline', 'true');
    video.setAttribute('x5-video-player-type', 'h5');
    video.setAttribute('x5-video-player-fullscreen', 'true');

    const handleLoadedData = () => {
      // Tenta tocar o vídeo quando os dados estiverem carregados
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log('Autoplay bloqueado:', error);
          // Mesmo se autoplay falhar, o vídeo ainda deve aparecer
        });
      }
    };

    const handleCanPlay = () => {
      // Tenta tocar quando o vídeo estiver pronto
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay bloqueado, mas vídeo deve aparecer
        });
      }
    };

    const handleError = (e) => {
      console.error('Erro ao carregar vídeo:', e);
      setVideoError(true);
    };

    // Garante que o vídeo carregue
    video.load();
    
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);

    // Tenta tocar imediatamente após um pequeno delay (para mobile)
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
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
    };
  }, []);

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

        {/* Vídeo ou Fallback */}
        {videoError ? (
          // Fallback: Imagem de fundo caso o vídeo não carregue
          <div className="w-full h-full bg-gray-900 flex items-center justify-center">
            <p className="text-white/50 text-sm">Vídeo não disponível</p>
          </div>
        ) : (
          <video
            ref={videoRef}
            className="w-full h-full object-cover object-center"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
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