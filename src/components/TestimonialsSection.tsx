import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const { t } = useTranslation();

  return (
    <div className="testimonials-section">
      <div className="container">
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="testimonials-badge">{t('testimonials.badge', 'TESTIMONIOS')}</span>
          <h2 className="section-title">{t('testimonials.title', 'Lo que nuestros clientes dicen')}</h2>
          <p className="section-subtitle">
            {t('testimonials.subtitle', 'Más de 100 empresas confían en nosotros para sus operaciones logísticas')}
          </p>
        </motion.div>

        <motion.div
          className="row justify-content-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="col-lg-8 col-md-10">
            <div className="testimonial-card text-center py-5">
              <div className="testimonial-quote-icon mx-auto mb-4">
                <Quote size={60} />
              </div>
              <h3 className="mb-3" style={{ color: '#003366', fontWeight: 600 }}>
                {t('testimonials.comingSoon', 'Testimonios Próximamente')}
              </h3>
              <p className="testimonial-content mb-0" style={{ fontSize: '1.1rem', color: '#666' }}>
                {t('testimonials.comingSoonDesc', 'Estamos recopilando testimonios de nuestros clientes satisfechos. Pronto compartiremos sus experiencias trabajando con Seemann Group.')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats adicionales */}
        <motion.div
          className="testimonials-stats mt-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="row text-center">
            <div className="col-md-4">
              <div className="testimonial-stat">
                <h3 className="testimonial-stat-number">98%</h3>
                <p className="testimonial-stat-label">{t('testimonials.stat1', 'Satisfacción del Cliente')}</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="testimonial-stat">
                <h3 className="testimonial-stat-number">+100</h3>
                <p className="testimonial-stat-label">{t('testimonials.stat2', 'Clientes Activos')}</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="testimonial-stat">
                <h3 className="testimonial-stat-number">35+</h3>
                <p className="testimonial-stat-label">{t('testimonials.stat3', 'Años de Experiencia')}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TestimonialsSection;

