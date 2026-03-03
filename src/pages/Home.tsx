import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import InsightsHero from '../components/InsightsHero';
import StatsBar from '../components/StatsBar';
import TrackingSection from '../components/TrackingSection';
import ServicesPreviewGrid from '../components/ServicesPreviewGrid';
import TestimonialsSection from '../components/TestimonialsSection';
import LogoCarousel from '../components/LogoCarousel';
import WhatsAppButton from '../components/WhatsAppButton';
import AOS from 'aos';

const Home = () => {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      delay: 0,
      once: true
    });
  }, []);

  return (
    <div className="site-wrap" id="home-section">
      {/* Hero Principal - Dynamic Insights Carousel */}
      <InsightsHero />

      {/* Servicios Section - Preview Grid Moderna */}
      <ServicesPreviewGrid />

      {/* Stats Bar - Números que impresionan */}
      <StatsBar />

      {/* Tracking Section */}
      <TrackingSection />

      {/* Testimonials Section - Social Proof */}
      <TestimonialsSection />

      {/* Partners Carousel - Breve */}
      <LogoCarousel />

      {/* CTA Final - Llamado a la acci�n */}
      <motion.div
        className="cta-final-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container text-center py-5">
          <h2 className="mb-4">{t('cta.title', '�Listo para optimizar tu log�stica?')}</h2>
          <p className="mb-4 fs-5">{t('cta.subtitle', 'Cont�ctanos y descubre c�mo podemos ayudarte')}</p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Link to="/team">
              <motion.button
                className="btn btn-primary btn-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('cta.quote', 'Solicitar Cotización')}
              </motion.button>
            </Link>
            <Link to="/contacto">
              <motion.button
                className="btn btn-outline-primary btn-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('cta.contact', 'Contáctanos')}
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* WhatsApp Button Flotante */}
      <WhatsAppButton />
      
    </div>
  );
};

export default Home;

