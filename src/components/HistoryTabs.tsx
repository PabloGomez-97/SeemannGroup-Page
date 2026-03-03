import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Globe, Heart, Eye, Smile } from 'lucide-react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

interface TabContent {
  id: string;
  titleKey: string;
  icon: JSX.Element;
  descriptionKey: string;
  color: string;
}

const HistoryTabs = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('valores');

  const tabs: TabContent[] = [
    {
      id: 'historia',
      titleKey: 'history.historia.title',
      icon: <Globe size={48} />,
      descriptionKey: 'history.historia.description',
      color: '#bd2121'
    },
    {
      id: 'mision',
      titleKey: 'history.mision.title',
      icon: <Heart size={48} />,
      descriptionKey: 'history.mision.description',
      color: '#e63946'
    },
    {
      id: 'vision',
      titleKey: 'history.vision.title',
      icon: <Eye size={48} />,
      descriptionKey: 'history.vision.description',
      color: '#f77f00'
    },
    {
      id: 'valores',
      titleKey: 'history.valores.title',
      icon: <Smile size={48} />,
      descriptionKey: 'history.valores.description',
      color: '#06d6a0'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <div className="history-tabs-section bg-light py-5" id="historia-section">
      <div className="container">
        <div className="row mb-5">
          <div className="col-12 text-center">
            <motion.div 
              className="block-heading-1"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span>{t('history.subtitle')}</span>
              <h2>{t('history.title')}</h2>
            </motion.div>
          </div>
        </div>

        {/* Cards Grid */}
        <motion.div 
          className="row g-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {tabs.map((tab) => (
            <motion.div 
              key={tab.id} 
              className="col-lg-3 col-md-6 col-sm-6"
              variants={cardVariants}
            >
              <Tilt
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                perspective={1000}
                scale={1.05}
                transitionSpeed={2000}
              >
                <motion.div 
                  className={`history-card ${activeTab === tab.id ? 'active' : ''}`}
                  onHoverStart={() => setActiveTab(tab.id)}
                  style={{ 
                    borderTop: activeTab === tab.id ? `4px solid ${tab.color}` : '4px solid transparent'
                  }}
                  whileHover={{ y: -5 }}
                >
                  <motion.div 
                    className="history-card-icon"
                    style={{ color: tab.color }}
                    animate={activeTab === tab.id ? {
                      rotate: [0, -5, 5, -5, 0],
                      scale: [1, 1.1, 1]
                    } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    {tab.icon}
                  </motion.div>
                  <h3 className="history-card-title">{t(tab.titleKey)}</h3>
                  
                  {/* Contenido siempre visible */}
                  <motion.div 
                    className="history-card-content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <p style={{ whiteSpace: tab.id === 'valores' ? 'pre-line' : 'normal' }}>
                      {t(tab.descriptionKey)}
                    </p>
                    <div className="history-card-actions">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link 
                          to={`/nuestra-empresa#${tab.id}`}
                          className="btn btn-sm btn-outline-danger"
                        >
                          {t('history.seeMore')}
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              </Tilt>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default HistoryTabs;
