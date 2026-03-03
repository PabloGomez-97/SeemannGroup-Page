import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Search, Package, MapPin, Clock } from 'lucide-react';

const TrackingSection = () => {
  const { t } = useTranslation();
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber.trim().length >= 3) {
      // Redirigir al portal de clientes cuando tenga al menos 3 caracteres
      window.location.href = 'https://portalclientes.seemanngroup.com/login';
    }
  };

  const features = [
    {
      icon: <Package size={32} />,
      title: t('tracking.feature1', 'Estado Actual'),
      desc: t('tracking.feature1Desc', 'Información en tiempo real')
    },
    {
      icon: <MapPin size={32} />,
      title: t('tracking.feature2', 'Ubicación Exacta'),
      desc: t('tracking.feature2Desc', 'GPS tracking 24/7')
    },
    {
      icon: <Clock size={32} />,
      title: t('tracking.feature3', 'ETA Preciso'),
      desc: t('tracking.feature3Desc', 'Fecha estimada de llegada')
    }
  ];

  return (
    <div className="tracking-section">
      <div className="container">
        <motion.div
          className="row align-items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Izquierda - Formulario */}
          <div className="col-lg-6 mb-4 mb-lg-0">
            <div className="tracking-content">
              <span className="tracking-badge">{t('tracking.badge', 'TRACKING 24/7')}</span>
              <h2 className="tracking-title">{t('tracking.title', 'Rastrea tu carga en tiempo real')}</h2>
              <p className="tracking-subtitle">
                {t('tracking.subtitle', 'Ingresa tu número de seguimiento y conoce el estado de tu envío al instante')}
              </p>

              <form onSubmit={handleTrack} className="tracking-form">
                <div className="tracking-input-group">
                  <input
                    type="text"
                    className="form-control tracking-input"
                    placeholder={t('tracking.placeholder', 'Ej: SG123456789')}
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    minLength={3}
                    required
                  />
                  <motion.button
                    type="submit"
                    className="btn btn-primary tracking-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Search size={20} className="me-2" />
                    {t('tracking.button', 'Rastrear')}
                  </motion.button>
                </div>
              </form>

              <div className="tracking-features mt-4">
                <div className="row g-3">
                  {features.map((feature, index) => (
                    <div key={index} className="col-4">
                      <div className="tracking-feature-item text-center">
                        <div className="tracking-feature-icon">{feature.icon}</div>
                        <h6 className="tracking-feature-title">{feature.title}</h6>
                        <small className="tracking-feature-desc">{feature.desc}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Derecha - Imagen/Visual */}
          <div className="col-lg-6">
            <motion.div
              className="tracking-visual"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="tracking-illustration">
                <div className="tracking-map-container">
                  <div className="tracking-pulse tracking-pulse-1"></div>
                  <div className="tracking-pulse tracking-pulse-2"></div>
                  <div className="tracking-pulse tracking-pulse-3"></div>
                  <Package size={80} className="tracking-package-icon" />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TrackingSection;

