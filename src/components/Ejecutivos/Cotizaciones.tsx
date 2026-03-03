import { useEffect } from 'react';
import ExecutiveTeam from './ExecutiveTeam';
import AOS from 'aos';

const Cotizaciones = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease',
      delay: 0
    });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="site-wrap">
      <ExecutiveTeam />
    </div>
  );
};

export default Cotizaciones;
