import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Pickaxe, Pill, Cpu, CarFront } from 'lucide-react';

const IndustryUseCases = () => {
  const { t } = useTranslation();

  const industries = [
    {
      icon: <Pickaxe size={40} />,
      name: t('industries.mining', 'Minería'),
      description: t('industries.miningDesc', 'Repuestos y equipamientos críticos'),
      color: '#B7791F'
    },
    {
      icon: <Pill size={40} />,
      name: t('industries.pharma', 'Pharma'),
      description: t('industries.pharmaDesc', 'Medicamentos y productos farmacéuticos'),
      color: '#0EA5E9'
    },
    {
      icon: <Cpu size={40} />,
      name: t('industries.tech', 'Tecnología'),
      description: t('industries.techDesc', 'Componentes electrónicos de alta seguridad'),
      color: '#8B5CF6'
    },
    {
      icon: <CarFront size={40} />,
      name: t('industries.automotive', 'Automotriz'),
      description: t('industries.automotiveDesc', 'Piezas JIT para líneas de producción'),
      color: '#EF4444'
    }
  ];

  return (
    <div className="industry-use-cases-section">
      <div className="container">
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">{t('industries.title', 'Soluciones para segmentos de alto valor')}</h2>
          <p className="section-subtitle">{t('industries.subtitle', 'Especializados en cargas críticas y sensibles')}</p>
        </motion.div>

        <div className="row">
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              className="col-md-6 col-lg-3 mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="industry-card" style={{ '--industry-color': industry.color } as React.CSSProperties}>
                <div className="industry-icon">
                  {industry.icon}
                </div>
                <h4 className="industry-name">{industry.name}</h4>
                <p className="industry-description">{industry.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IndustryUseCases;

