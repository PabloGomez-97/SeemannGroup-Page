import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Múltiples intentos para asegurar scroll al inicio
    window.scrollTo(0, 0);
    
    // Forzar en el siguiente frame
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
    
    // Forzar después de un pequeño delay
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 10);
    
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
