import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { 
  Plane,
  Ship,
  Truck,
  Warehouse,
  Route,
  FileText,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

interface ServicePreview {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  benefits: string[];
  image: string;
  color: string;
  detailLink: string;
}

const ServicesPreviewGrid = () => {
  const { t } = useTranslation();

  const services: ServicePreview[] = [
    {
      id: 'aereo',
      icon: <Plane size={40} />,
      title: t('servicesPage.air.title', 'Transporte Aéreo'),
      subtitle: t('servicesPage.air.shortDesc', 'Velocidad y eficiencia para cargas urgentes'),
      benefits: [
        t('servicesPage.air.benefit1', 'Entregas Express 24-72hrs'),
        t('servicesPage.air.benefit2', 'Tracking en tiempo real'),
        t('servicesPage.air.benefit3', 'Cobertura global 100+ destinos')
      ],
      image: '/images/ImagenAer.png',
      color: '#0ea5e9',
      detailLink: '/servicios/transporte-aereo'
    },
    {
      id: 'maritimo',
      icon: <Ship size={40} />,
      title: t('servicesPage.sea.title', 'Transporte Marítimo'),
      subtitle: t('servicesPage.sea.shortDesc', 'Soluciones FCL y LCL optimizadas'),
      benefits: [
        t('servicesPage.sea.benefit1', 'Full Container (FCL) y Consolidado (LCL)'),
        t('servicesPage.sea.benefit2', 'Tarifas competitivas certificadas'),
        t('servicesPage.sea.benefit3', 'Gestión documental completa')
      ],
      image: '/images/ImagenMar.png',
      color: '#3b82f6',
      detailLink: '/servicios/transporte-maritimo'
    },
    {
      id: 'terrestre',
      icon: <Truck size={40} />,
      title: t('servicesPage.land.title', 'Transporte Terrestre'),
      subtitle: t('servicesPage.land.shortDesc', 'Conexión terrestre nacional e internacional'),
      benefits: [
        t('servicesPage.land.benefit1', 'Rutas Chile, Perú, Argentina'),
        t('servicesPage.land.benefit2', 'Flota moderna rastreada GPS'),
        t('servicesPage.land.benefit3', 'Entregas puntuales garantizadas')
      ],
      image: '/images/ImagenTer.png',
      color: '#22c55e',
      detailLink: '/servicios/transporte-terrestre'
    },
    {
      id: 'warehouse',
      icon: <Warehouse size={40} />,
      title: t('servicesPage.warehouse.title', 'Warehouse'),
      subtitle: t('servicesPage.warehouse.shortDesc', 'Almacenaje y distribución especializada'),
      benefits: [
        t('servicesPage.warehouse.benefit1', 'Bodegas certificadas estratégicas'),
        t('servicesPage.warehouse.benefit2', 'WMS para control de inventario'),
        t('servicesPage.warehouse.benefit3', 'Pick & Pack personalizado')
      ],
      image: '/images/ImagenWare.png',
      color: '#f59e0b',
      detailLink: '/servicios/warehouse'
    },
    {
      id: 'multimodal',
      icon: <Route size={40} />,
      title: t('servicesPage.multimodal.title', 'Servicio Multimodal'),
      subtitle: t('servicesPage.multimodal.shortDesc', 'Combinación óptima de modos de transporte'),
      benefits: [
        t('servicesPage.multimodal.benefit1', 'Optimización de costos y tiempos'),
        t('servicesPage.multimodal.benefit2', 'Un solo interlocutor end-to-end'),
        t('servicesPage.multimodal.benefit3', 'Soluciones personalizadas')
      ],
      image: '/images/ImagenMulti.png',
      color: '#8b5cf6',
      detailLink: '/servicios/servicio-multimodal'
    },
    {
      id: 'aduanas',
      icon: <FileText size={40} />,
      title: t('servicesPage.customs.title', 'Servicio de Aduanas'),
      subtitle: t('servicesPage.customs.shortDesc', 'Gestión aduanera integral y eficiente'),
      benefits: [
        t('servicesPage.customs.benefit1', 'Agentes aduaneros certificados'),
        t('servicesPage.customs.benefit2', 'Clasificación arancelaria correcta'),
        t('servicesPage.customs.benefit3', 'Despachos ágiles sin demoras')
      ],
      image: '/images/ImagenAdu.png',
      color: '#ef4444',
      detailLink: '/servicios/servicio-aduanas'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="bg-white py-5 pb-5" style={{ paddingBottom: '80px' }} id="servicios-grid">
      <div className="container">
        <div className="row mb-5">
          <div className="col-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-uppercase fw-bold text-danger small d-block mb-2">
                {t('services.subtitle', 'SELECCIONE UNO DE NUESTROS SERVICIOS')}
              </span>
              <h2 className="display-5 fw-bold mb-3">
                {t('services.title', 'NUESTROS SERVICIOS')}
              </h2>
              <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>
                {t('services.description', 'Soluciones logísticas integrales diseñadas para cada necesidad')}
              </p>
            </motion.div>
          </div>
        </div>

        <motion.div 
          className="row g-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              className="col-md-6 col-lg-4"
              variants={cardVariants}
            >
              <motion.div 
                className="service-card-premium"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="service-card-image">
                  <img src={service.image} alt={service.title} />
                  <div className="service-card-overlay" style={{ background: `linear-gradient(180deg, transparent 0%, ${service.color}dd 100%)` }}></div>
                  <div className="service-card-icon" style={{ background: service.color }}>
                    {service.icon}
                  </div>
                </div>
                
                <div className="service-card-content">
                  <h3 className="service-card-title">{service.title}</h3>
                  <p className="service-card-subtitle">{service.subtitle}</p>
                  
                  <ul className="service-card-benefits">
                    {service.benefits.map((benefit, idx) => (
                      <li key={idx}>
                        <CheckCircle2 size={16} style={{ color: service.color }} />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="service-card-actions">
                    <Link 
                      to={service.detailLink}
                      className="btn-service-primary"
                      style={{ background: service.color }}
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      {t('servicesPage.card.cta1', 'Ver más información')}
                      <ArrowRight size={18} className="ms-2" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Link 
            to="/servicios" 
            className="btn btn-outline-danger btn-lg px-5"
            style={{ borderWidth: '2px' }}
          >
            {t('services.viewAll', 'Ver todos los servicios en detalle')}
            <ArrowRight size={20} className="ms-2" strokeWidth={2} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesPreviewGrid;

