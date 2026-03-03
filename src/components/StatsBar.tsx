import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Globe, Network, Users, Package } from 'lucide-react';

const StatsBar = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    {
      icon: <Users size={32} />,
      number: '+100',
      label: t('stats.clients', 'Clientes Activos'),
      delay: 0
    },
    {
      icon: <Globe size={32} />,
      number: '5',
      label: t('stats.countries', 'Países'),
      delay: 0.1
    },
    {
      icon: <Package size={32} />,
      number: '+10K',
      label: t('stats.shipments', 'Envíos Anuales'),
      delay: 0.2
    },
    {
      icon: <Network size={32} />,
      number: '8',
      label: t('stats.alliances', 'Alianzas Globales'),
      delay: 0.3
    }
  ];

  return (
    <div className="stats-bar">
      <div className="container">
        <div className="row">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="col-6 col-md-3 mb-4 mb-md-0"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: stat.delay }}
            >
              <div className="stat-item text-center">
                <div className="stat-icon">
                  {stat.icon}
                </div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsBar;

