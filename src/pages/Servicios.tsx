import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import AOS from "aos";
import TimeSavingHighlight from "../components/Services/TimeSavingHighlight";
import {
  Plane,
  Ship,
  Truck,
  Warehouse,
  Route,
  FileText,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Clock,
  Shield,
  Calculator,
} from "lucide-react";

const Servicios = () => {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease",
      once: true,
    });
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      id: "aereo",
      icon: <Plane size={40} />,
      title: t("servicesPage.air.title", "Transporte Aéreo"),
      subtitle: t(
        "servicesPage.air.shortDesc",
        "Velocidad y eficiencia para cargas urgentes",
      ),
      benefits: [
        t("servicesPage.air.benefit1", "Entregas Express 24-72hrs"),
        t("servicesPage.air.benefit2", "Tracking en tiempo real"),
        t("servicesPage.air.benefit3", "Cobertura global 100+ destinos"),
      ],
      image: "/images/Imagen Transporte Aereo.png",
      color: "#0ea5e9",
      detailLink: "/servicios/transporte-aereo",
    },
    {
      id: "maritimo",
      icon: <Ship size={40} />,
      title: t("servicesPage.sea.title", "Transporte Marítimo"),
      subtitle: t(
        "servicesPage.sea.shortDesc",
        "Soluciones FCL y LCL optimizadas",
      ),
      benefits: [
        t(
          "servicesPage.sea.benefit1",
          "Full Container (FCL) y Consolidado (LCL)",
        ),
        t("servicesPage.sea.benefit2", "Tarifas competitivas certificadas"),
        t("servicesPage.sea.benefit3", "Gestión documental completa"),
      ],
      image: "/images/Imagen Transporte Marítimo.png",
      color: "#3b82f6",
      detailLink: "/servicios/transporte-maritimo",
    },
    {
      id: "terrestre",
      icon: <Truck size={40} />,
      title: t("servicesPage.land.title", "Transporte Terrestre"),
      subtitle: t(
        "servicesPage.land.shortDesc",
        "Conexión terrestre nacional e internacional",
      ),
      benefits: [
        t("servicesPage.land.benefit1", "Rutas Chile, Perú, Argentina"),
        t("servicesPage.land.benefit2", "Flota moderna rastreada GPS"),
        t("servicesPage.land.benefit3", "Entregas puntuales garantizadas"),
      ],
      image: "/images/Imagen Transporte Terrestre.png",
      color: "#22c55e",
      detailLink: "/servicios/transporte-terrestre",
    },
    {
      id: "warehouse",
      icon: <Warehouse size={40} />,
      title: t("servicesPage.warehouse.title", "Warehouse"),
      subtitle: t(
        "servicesPage.warehouse.shortDesc",
        "Almacenaje y distribución especializada",
      ),
      benefits: [
        t(
          "servicesPage.warehouse.benefit1",
          "Bodegas certificadas estratégicas",
        ),
        t("servicesPage.warehouse.benefit2", "WMS para control de inventario"),
        t("servicesPage.warehouse.benefit3", "Pick & Pack personalizado"),
      ],
      image: "/images/ImagenWare.png",
      color: "#f59e0b",
      detailLink: "/servicios/warehouse",
    },
    {
      id: "multimodal",
      icon: <Route size={40} />,
      title: t("servicesPage.multimodal.title", "Servicio Multimodal"),
      subtitle: t(
        "servicesPage.multimodal.shortDesc",
        "Combinación óptima de modos de transporte",
      ),
      benefits: [
        t(
          "servicesPage.multimodal.benefit1",
          "Optimización de costos y tiempos",
        ),
        t(
          "servicesPage.multimodal.benefit2",
          "Un solo interlocutor end-to-end",
        ),
        t("servicesPage.multimodal.benefit3", "Soluciones personalizadas"),
      ],
      image: "/images/Imagen Servicio Multimodal.png",
      color: "#8b5cf6",
      detailLink: "/servicios/servicio-multimodal",
    },
    {
      id: "aduanas",
      icon: <FileText size={40} />,
      title: t("servicesPage.customs.title", "Servicio de Aduanas"),
      subtitle: t(
        "servicesPage.customs.shortDesc",
        "Gestión aduanera integral y eficiente",
      ),
      benefits: [
        t("servicesPage.customs.benefit1", "Agentes aduaneros certificados"),
        t(
          "servicesPage.customs.benefit2",
          "Clasificación arancelaria correcta",
        ),
        t("servicesPage.customs.benefit3", "Despachos ágiles sin demoras"),
      ],
      image: "/images/Imagen Servicio de Aduanas.png",
      color: "#ef4444",
      detailLink: "/servicios/servicio-aduanas",
    },
  ];

  return (
    <div className="site-wrap services-page-premium">
      {/* Hero Premium con Gradiente */}
      <motion.div
        className="services-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="services-hero-overlay"></div>
        <div className="container">
          <div
            className="row align-items-center justify-content-center"
            style={{ minHeight: "70vh" }}
          >
            <div
              className="col-lg-10 text-center"
              style={{ position: "relative", zIndex: 2 }}
            >
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <h1 className="services-hero-title">
                  {t(
                    "servicesPage.hero.title",
                    "Soluciones Logísticas Integrales",
                  )}
                </h1>
                <p className="services-hero-subtitle">
                  {t(
                    "servicesPage.hero.subtitle",
                    "Optimizamos tiempo, control y costos en cada envío. Conectamos tu negocio con el mundo de forma confiable y eficiente.",
                  )}
                </p>

                <div className="services-hero-ctas">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/contacto"
                      className="btn btn-primary btn-lg me-3"
                    >
                      <Calculator size={20} className="me-2" />
                      {t("servicesPage.hero.cta1", "Solicitar Cotización")}
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <a
                      href="#servicios-grid"
                      className="btn btn-outline-light btn-lg"
                    >
                      {t("servicesPage.hero.cta2", "Ver Servicios")}
                      <ArrowRight size={20} className="ms-2" />
                    </a>
                  </motion.div>
                </div>

                {/* Mini stats */}
                <div className="services-hero-stats">
                  <div className="stat-item-hero">
                    <MapPin size={24} />
                    <span>{t("servicesPage.hero.stat1", "5 Países")}</span>
                  </div>
                  <div className="stat-item-hero">
                    <Clock size={24} />
                    <span>{t("servicesPage.hero.stat2", "24/7 Tracking")}</span>
                  </div>
                  <div className="stat-item-hero">
                    <Shield size={24} />
                    <span>
                      {t("servicesPage.hero.stat3", "Carga Asegurada")}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Value Proposition con bullets */}
      <div className="services-value-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="services-value-image">
                <video
                  src="/images/VideoFinalSeemann.mp4"
                  className="img-fluid rounded-lg shadow-lg"
                  controls
                  loop
                  playsInline
                  style={{ width: "100%", height: "auto", objectFit: "cover" }}
                >
                  Tu navegador no soporta el elemento de video.
                </video>
              </div>
            </div>
            <div className="col-lg-6">
              <h2 className="services-value-title">
                {t(
                  "servicesPage.value.title",
                  "¿Por qué confiar en Seemann Group?",
                )}
              </h2>
              <p className="services-value-desc">
                {t(
                  "servicesPage.value.desc",
                  "Más de 35 años de experiencia nos respaldan como líderes en logística internacional. Ofrecemos soluciones integrales adaptadas a las necesidades de cada cliente.",
                )}
              </p>

              <div className="services-value-bullets">
                <div className="value-bullet">
                  <div className="bullet-icon">
                    <CheckCircle2 size={24} />
                  </div>
                  <div className="bullet-content">
                    <h4>
                      {t("servicesPage.value.bullet1Title", "Qué hacemos")}
                    </h4>
                    <p>
                      {t(
                        "servicesPage.value.bullet1Desc",
                        "Freight forwarding integral: aéreo, marítimo, terrestre y multimodal con servicios de valor agregado.",
                      )}
                    </p>
                  </div>
                </div>

                <div className="value-bullet">
                  <div className="bullet-icon">
                    <CheckCircle2 size={24} />
                  </div>
                  <div className="bullet-content">
                    <h4>
                      {t("servicesPage.value.bullet2Title", "Para quién")}
                    </h4>
                    <p>
                      {t(
                        "servicesPage.value.bullet2Desc",
                        "Empresas importadoras/exportadoras que buscan un partner logístico confiable y proactivo.",
                      )}
                    </p>
                  </div>
                </div>

                <div className="value-bullet">
                  <div className="bullet-icon">
                    <CheckCircle2 size={24} />
                  </div>
                  <div className="bullet-content">
                    <h4>{t("servicesPage.value.bullet3Title", "Resultado")}</h4>
                    <p>
                      {t(
                        "servicesPage.value.bullet3Desc",
                        "Operaciones optimizadas, visibilidad 24/7 y costos controlados para impulsar tu crecimiento.",
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid Premium */}
      <div className="services-grid-section" id="servicios-grid">
        <div className="container">
          <div className="row mb-5">
            <div className="col-12 text-center">
              <h2 className="services-grid-title">
                {t("servicesPage.grid.title", "Nuestros Servicios")}
              </h2>
              <p className="services-grid-subtitle">
                {t(
                  "servicesPage.grid.subtitle",
                  "Soluciones logísticas diseñadas para cada necesidad",
                )}
              </p>
            </div>
          </div>

          <div className="row g-4">
            {services.map((service) => (
              <div key={service.id} className="col-md-6 col-lg-4">
                <motion.div
                  className="service-card-premium"
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="service-card-image">
                    <img src={service.image} alt={service.title} />
                    <div
                      className="service-card-overlay"
                      style={{
                        background: `linear-gradient(180deg, transparent 0%, ${service.color}dd 100%)`,
                      }}
                    ></div>
                    <div
                      className="service-card-icon"
                      style={{ background: service.color }}
                    >
                      {service.icon}
                    </div>
                  </div>

                  <div className="service-card-content">
                    <h3 className="service-card-title">{service.title}</h3>
                    <p className="service-card-subtitle">{service.subtitle}</p>

                    <ul className="service-card-benefits">
                      {service.benefits.map((benefit, idx) => (
                        <li key={idx}>
                          <CheckCircle2
                            size={16}
                            style={{ color: service.color }}
                          />
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
                        {t("servicesPage.card.cta1", "Ver más información")}
                        <ArrowRight size={18} className="ms-2" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Time Saving Highlight - Competitive Differentiator */}
      <TimeSavingHighlight />

      {/* Portal Clientes Interactive Module */}
      <div className="portal-clientes-module" id="portal-clientes-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <motion.div
                className="portal-clientes-visual"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="/images/1209.jpg"
                  alt="Portal de Clientes"
                  className="img-fluid rounded-lg shadow-xl"
                />
                <div className="portal-clientes-badge">
                  <Shield size={20} />
                  <span>
                    {t("servicesPage.portalClientes.badge", "Tracking 24/7")}
                  </span>
                </div>
              </motion.div>
            </div>

            <div className="col-lg-6">
              <div className="portal-clientes-content">
                <h2 className="portal-clientes-title">
                  {t("servicesPage.portalClientes.title", "WEBTRACKING")}
                </h2>
                <p className="portal-clientes-subtitle">
                  {t(
                    "servicesPage.portalClientes.subtitle",
                    "Monitorea tu carga en tiempo real",
                  )}
                </p>
                <p className="portal-clientes-description">
                  {t(
                    "servicesPage.portalClientes.description",
                    "Accede a la ubicación exacta de tu carga, documentos digitalizados y actualizaciones en tiempo real. Control total desde cualquier dispositivo.",
                  )}
                </p>

                <div className="portal-clientes-features">
                  <div className="tracking-feature">
                    <div className="feature-icon">
                      <MapPin size={24} />
                    </div>
                    <div className="feature-text">
                      <h4>
                        {t(
                          "servicesPage.portalClientes.feature1Title",
                          "Ubicación GPS",
                        )}
                      </h4>
                      <p>
                        {t(
                          "servicesPage.portalClientes.feature1Desc",
                          "Seguimiento preciso en cada etapa",
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="tracking-feature">
                    <div className="feature-icon">
                      <FileText size={24} />
                    </div>
                    <div className="feature-text">
                      <h4>
                        {t(
                          "servicesPage.portalClientes.feature2Title",
                          "Documentos",
                        )}
                      </h4>
                      <p>
                        {t(
                          "servicesPage.portalClientes.feature2Desc",
                          "Acceso digital a toda la documentación",
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="tracking-feature">
                    <div className="feature-icon">
                      <Clock size={24} />
                    </div>
                    <div className="feature-text">
                      <h4>
                        {t(
                          "servicesPage.portalClientes.feature3Title",
                          "Notificaciones",
                        )}
                      </h4>
                      <p>
                        {t(
                          "servicesPage.portalClientes.feature3Desc",
                          "Alertas automáticas de cada milestone",
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <motion.a
                  href="https://seemanngroup.sistemaforward.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-lg btn-portal-clientes"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowRight size={20} className="me-2" />
                  {t("servicesPage.portalClientes.cta", "Acceder al Sistema")}
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="services-final-cta">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>
              {t(
                "servicesPage.finalCta.title",
                "¿Listo para optimizar tu logística?",
              )}
            </h2>
            <p>
              {t(
                "servicesPage.finalCta.subtitle",
                "Nuestros expertos están listos para diseñar la solución perfecta para tu negocio",
              )}
            </p>

            <div className="final-cta-buttons">
              <Link to="/contacto" className="btn btn-primary btn-lg me-3">
                <Calculator size={20} className="me-2" />
                {t("servicesPage.finalCta.cta1", "Solicitar Cotización")}
              </Link>
              <Link to="/team" className="btn btn-outline-light btn-lg">
                {t("servicesPage.finalCta.cta2", "Hablar con un Experto")}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Servicios;
