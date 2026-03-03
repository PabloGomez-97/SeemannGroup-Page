import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Globe2, AlertCircle, TrendingUp, Headphones } from 'lucide-react';

const ValueProposition = () => {
  const { t } = useTranslation();

  const pillars = [
    {
      icon: <Globe2 size={48} />,
      title: t('value.global.title', 'Red Global Propia'),
      description: t('value.global.desc', 'Presencia directa en 5 países con oficinas propias')
    },
    {
      icon: <AlertCircle size={48} />,
      title: t('value.anticipate.title', 'Anticipamos Problemas'),
      description: t('value.anticipate.desc', 'Gestionamos documentos y requisitos antes de que sean un obstáculo')
    },
    {
      icon: <TrendingUp size={48} />,
      title: t('value.experience.title', 'Experiencia 35+ Años'),
      description: t('value.experience.desc', 'Trayectoria comprobada en logística internacional')
    },
    {
      icon: <Headphones size={48} />,
      title: t('value.support.title', 'Disponibilidad 24/7'),
      description: t('value.support.desc', 'Tu carga nunca duerme, nosotros tampoco')
    }
  ];

  return (
    <div className="value-proposition-section">
      <div className="container">
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">{t('value.mainTitle', 'Más que freight forwarders: somos tu socio logístico')}</h2>
          <p className="section-subtitle">{t('value.subtitle', 'Por qué elegir Seemann Group')}</p>
        </motion.div>

        <div className="row">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              className="col-md-6 col-lg-3 mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="value-pillar-card">
                <div className="pillar-icon">
                  {pillar.icon}
                </div>
                <h4 className="pillar-title">{pillar.title}</h4>
                <p className="pillar-description">{pillar.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ValueProposition;

