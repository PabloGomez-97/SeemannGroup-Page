import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Calculator } from 'lucide-react';

interface HeroSliderProps {
  version?: 'old' | 'new';
}

const HeroSlider = ({ version = 'old' }: HeroSliderProps) => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: '/images/1.png',
      overlay: true,
      titleKey: 'hero.welcome',
      subtitleKey: 'hero.newClientSubtitle',
      showDualCTA: true,
      align: 'center'
    },
    {
      id: 2,
      image: '/images/2.jpeg',
      overlay: true,
      titleKey: 'hero.quoteTitle',
      subtitleKey: 'hero.experience',
      showDualCTA: true,
      align: 'center'
    },
    {
      id: 3,
      image: '/images/3.jpeg',
      overlay: true,
      titleKey: 'hero.globalNetwork',
      subtitleKey: 'hero.networkDesc',
      showDualCTA: true,
      align: 'center'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="hero-slider position-relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className={`hero-slide ${slides[currentSlide].overlay ? 'overlay' : ''}`}
          style={{
            backgroundImage: `url(${slides[currentSlide].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }}
        >
          <div className="container h-100">
            <div className={`row align-items-center h-100 ${slides[currentSlide].align === 'center' ? 'justify-content-center text-center' : 'text-start'}`}>
              <div className={slides[currentSlide].align === 'center' ? 'col-md-12 col-lg-8' : 'col-md-12 col-lg-7'}>
                {slides[currentSlide].titleKey && (
                  <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    style={{ position: 'relative', zIndex: 3 }}
                  >
                    {t(slides[currentSlide].titleKey)}
                  </motion.h1>
                )}
                {slides[currentSlide].subtitleKey && (
                  <motion.p 
                    className="mb-5 hero-subtitle"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    style={{ position: 'relative', zIndex: 3 }}
                  >
                    {t(slides[currentSlide].subtitleKey)}
                  </motion.p>
                )}
                {slides[currentSlide].showDualCTA && (
                  <motion.div
                    className="hero-cta-group"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.6, ease: "backOut" }}
                    style={{ position: 'relative', zIndex: 3 }}
                  >
                    {version === 'old' ? (
                      <div className="d-flex flex-column align-items-center">
                        <Link to="/contacto">
                          <motion.button
                            className="btn btn-primary text-white btn-lg px-4 py-2 mb-3"
                            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(189, 33, 33, 0.5)" }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Calculator size={20} className="me-2" />
                            {t('hero.requestQuoteBtn', 'Solicitar Cotización')}
                          </motion.button>
                        </Link>
                        <motion.p 
                          className="text-white text-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.8, delay: 0.8 }}
                          style={{ position: 'relative', zIndex: 3, fontSize: '0.95rem', maxWidth: '500px' }}
                        >
                          {t('hero.clientPortalText', 'Si eres un cliente de Seemann, ')}<a href="https://portalclientes.seemanngroup.com/login" className="text-white fw-bold text-decoration-underline" target="_blank" rel="noopener noreferrer">{t('hero.clientPortalLink', 'entra al portal de Clientes para Cotizar Ahora')}</a>
                        </motion.p>
                      </div>
                    ) : (
                      <div className="d-flex flex-column flex-md-row gap-4 justify-content-center align-items-center">
                        <div className="d-flex flex-column align-items-center">
                          <Link to="/contacto">
                            <motion.button
                              className="btn btn-lg btn-light text-primary fw-bold px-4 py-2"
                              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(255, 255, 255, 0.3)" }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Calculator size={20} className="me-2" />
                              {t('hero.requestQuoteBtn', 'Solicita tu Cotización')}
                            </motion.button>
                          </Link>
                          <p className="text-white mt-2 mb-0" style={{ fontSize: '0.9rem' }}>
                            {t('hero.newClientLabel', 'Para nuevos clientes')}
                          </p>
                        </div>
                        <div className="d-flex flex-column align-items-center">
                          <a href="https://portalclientes.seemanngroup.com/login" target="_blank" rel="noopener noreferrer">
                            <motion.button
                              className="btn btn-lg btn-primary text-white fw-bold px-4 py-2"
                              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(189, 33, 33, 0.5)" }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <ArrowRight size={20} className="me-2" />
                              {t('hero.quoteBtn', 'Cotiza Ahora')}
                            </motion.button>
                          </a>
                          <p className="text-white mt-2 mb-0" style={{ fontSize: '0.9rem' }}>
                            {t('hero.existingClientLabel', 'Clientes con sesión activa')}
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Indicators */}
      <div className="carousel-indicators" style={{ position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
        {slides.map((_, index) => (
          <motion.button
            key={index}
            type="button"
            onClick={() => goToSlide(index)}
            className={index === currentSlide ? 'active' : ''}
            aria-current={index === currentSlide ? 'true' : 'false'}
            aria-label={`Slide ${index + 1}`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            style={{
              width: index === currentSlide ? '30px' : '10px',
              height: '10px',
              borderRadius: '5px',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </div>

      {/* Controls */}
      <motion.button
        className="carousel-control-prev"
        type="button"
        onClick={prevSlide}
        whileHover={{ scale: 1.1, x: -5 }}
        whileTap={{ scale: 0.9 }}
        style={{ zIndex: 10 }}
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </motion.button>
      <motion.button
        className="carousel-control-next"
        type="button"
        onClick={nextSlide}
        whileHover={{ scale: 1.1, x: 5 }}
        whileTap={{ scale: 0.9 }}
        style={{ zIndex: 10 }}
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </motion.button>

      {/* Partículas decorativas */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 2 }}>
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 100 }}
            animate={{ 
              opacity: [0, 0.5, 0],
              y: [-100, 700],
              x: [0, Math.random() * 100 - 50]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "linear"
            }}
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              width: '4px',
              height: '4px',
              background: 'rgba(255, 255, 255, 0.6)',
              borderRadius: '50%',
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
