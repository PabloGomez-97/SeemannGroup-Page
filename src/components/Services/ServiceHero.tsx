import { motion } from 'framer-motion';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ServiceHeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  icon?: React.ReactNode;
  ctaPrimary?: {
    text: string;
    link: string;
  };
  ctaSecondary?: {
    text: string;
    link: string;
  };
}

const ServiceHero = ({
  title,
  subtitle,
  backgroundImage,
  icon,
  ctaPrimary = { text: 'Solicitar cotización', link: '/contacto' },
  ctaSecondary = { text: 'Ver WebTracking', link: '#webtracking' }
}: ServiceHeroProps) => {
  return (
    <section className="service-detail-hero" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="service-detail-hero-overlay" />
      
      <div className="container position-relative" style={{ zIndex: 3 }}>
        <motion.div
          className="row align-items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="col-lg-8 mx-auto text-center text-white">
            {icon && (
              <motion.div
                className="service-detail-icon mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                {icon}
              </motion.div>
            )}

            <motion.h1
              className="service-detail-title mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {title}
            </motion.h1>

            <motion.p
              className="service-detail-subtitle mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {subtitle}
            </motion.p>

            <motion.div
              className="service-detail-ctas d-flex gap-3 justify-content-center flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Link
                to={ctaPrimary.link}
                className="btn btn-danger btn-lg px-5 py-3"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).dataLayer) {
                    (window as any).dataLayer.push({
                      event: 'service_cta_click',
                      cta_type: 'primary',
                      cta_text: ctaPrimary.text
                    });
                  }
                }}
              >
                {ctaPrimary.text}
                <ArrowRight size={20} className="ms-2" />
              </Link>

              <a
                href={ctaSecondary.link}
                className="btn btn-outline-light btn-lg px-5 py-3"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).dataLayer) {
                    (window as any).dataLayer.push({
                      event: 'service_cta_click',
                      cta_type: 'secondary',
                      cta_text: ctaSecondary.text
                    });
                  }
                }}
              >
                <PlayCircle size={20} className="me-2" />
                {ctaSecondary.text}
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceHero;

