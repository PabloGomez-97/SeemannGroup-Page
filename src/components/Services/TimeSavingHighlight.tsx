import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Clock, Zap, TrendingUp, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const TimeSavingHighlight = () => {
  const { t } = useTranslation();

  const benefits = [
    {
      icon: <Clock size={24} />,
      title: t('timeSaving.fast.title', 'Procesamiento Rápido'),
      description: t('timeSaving.fast.desc', 'Reducimos tiempos hasta en 50%')
    },
    {
      icon: <Zap size={24} />,
      title: t('timeSaving.automation.title', 'Automatización'),
      description: t('timeSaving.automation.desc', 'Sistemas digitales sin esperas')
    },
    {
      icon: <TrendingUp size={24} />,
      title: t('timeSaving.efficiency.title', 'Máxima Eficiencia'),
      description: t('timeSaving.efficiency.desc', 'Procesos optimizados')
    },
    {
      icon: <Award size={24} />,
      title: t('timeSaving.experience.title', '35+ Años'),
      description: t('timeSaving.experience.desc', 'Experiencia probada')
    }
  ];

  return (
    <section 
      className="time-saving-compact-section"
      style={{
        background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
        padding: '50px 0',
        position: 'relative'
      }}
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5 mb-4 mb-lg-0">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="d-flex align-items-center gap-3 mb-3">
                <div 
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(10px)',
                    flexShrink: 0
                  }}
                >
                  <Clock size={30} className="text-white" />
                </div>
                <h2 
                  className="text-white fw-bold mb-0"
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
                >
                  {t('timeSaving.mainTitle', 'Tu Tiempo es Oro: Nosotros lo Cuidamos')}
                </h2>
              </div>
              
              <p 
                className="text-white mb-4"
                style={{ fontSize: '1rem', opacity: 0.95, lineHeight: '1.6' }}
              >
                {t('timeSaving.subtitle', 'Optimizamos procesos, automatizamos gestiones y te damos tranquilidad total.')}
              </p>

              <Link to="/team">
                <motion.button
                  className="btn btn-light px-4 py-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ 
                    fontWeight: '700',
                    fontSize: '1rem',
                    borderRadius: '50px',
                    border: 'none'
                  }}
                >
                  {t('timeSaving.ctaButton', 'Hablar con un Ejecutivo')}
                  <ArrowRight className="ms-2" size={18} />
                </motion.button>
              </Link>
            </motion.div>
          </div>

          <div className="col-lg-7">
            <motion.div
              className="row g-3"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, staggerChildren: 0.1 }}
            >
              {benefits.map((benefit, index) => (
                <div key={index} className="col-sm-6">
                  <motion.div
                    className="p-3 h-100"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '15px',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{
                      background: 'rgba(255, 255, 255, 0.15)',
                      scale: 1.02
                    }}
                  >
                    <div className="d-flex align-items-start gap-3">
                      <div 
                        className="d-flex align-items-center justify-content-center"
                        style={{
                          width: '45px',
                          height: '45px',
                          minWidth: '45px',
                          borderRadius: '12px',
                          background: 'rgba(255, 255, 255, 0.2)',
                          color: 'white'
                        }}
                      >
                        {benefit.icon}
                      </div>
                      <div>
                        <h5 className="text-white fw-bold mb-1" style={{ fontSize: '1rem' }}>
                          {benefit.title}
                        </h5>
                        <p className="text-white mb-0" style={{ opacity: 0.9, fontSize: '0.875rem' }}>
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimeSavingHighlight;

