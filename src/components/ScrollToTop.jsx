import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Rola para o topo sempre que a rota mudar
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // ou 'smooth' se preferir animação suave
    });
  }, [pathname]);

  return null; // Este componente não renderiza nada
};
