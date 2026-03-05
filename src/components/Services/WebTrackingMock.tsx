import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  MapPin,
  FileText,
  Bell,
  Clock,
  Shield,
  TrendingUp,
} from "lucide-react";

const WebTrackingMock = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <MapPin size={32} />,
      title: t("servicesPage.portalClientes.feature1Title"),
      description: t("servicesPage.portalClientes.feature1Desc"),
    },
    {
      icon: <FileText size={32} />,
      title: t("servicesPage.portalClientes.feature2Title"),
      description: t("servicesPage.portalClientes.feature2Desc"),
    },
    {
      icon: <Bell size={32} />,
      title: t("servicesPage.portalClientes.feature3Title"),
      description: t("servicesPage.portalClientes.feature3Desc"),
    },
    {
      icon: <Clock size={32} />,
      title: t("servicesPage.portalClientes.feature4Title"),
      description: t("servicesPage.portalClientes.feature4Desc"),
    },
    {
      icon: <Shield size={32} />,
      title: t("servicesPage.portalClientes.feature5Title"),
      description: t("servicesPage.portalClientes.feature5Desc"),
    },
    {
      icon: <TrendingUp size={32} />,
      title: t("servicesPage.portalClientes.feature6Title"),
      description: t("servicesPage.portalClientes.feature6Desc"),
    },
  ];

  return (
    <section className="portal-clientes-mock-section py-5" id="portal-clientes">
      <div className="container">
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-3">{t("servicesPage.portalClientes.title")}</h2>
          <p className="text-muted lead mx-auto" style={{ maxWidth: "700px" }}>
            {t("servicesPage.portalClientes.description")}
          </p>
        </motion.div>

        <div className="row align-items-center mb-5">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <motion.div
              className="portal-clientes-mock-image"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Captura real del tracking dashboard */}
              <div className="tracking-dashboard-image">
                <img
                  src="/images/CapturaTracking.png"
                  alt="Portal de Clientes - Tracking Dashboard"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "12px",
                    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
                    border: "1px solid #e0e0e0",
                  }}
                />
              </div>
            </motion.div>
          </div>

          <div className="col-lg-6">
            <motion.div
              className="row g-4"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, staggerChildren: 0.1 }}
            >
              {features.map((feature, index) => (
                <div key={index} className="col-md-6">
                  <div className="portal-clientes-feature">
                    <div className="feature-icon text-danger mb-2">
                      {feature.icon}
                    </div>
                    <h4 className="feature-title h6 mb-2">{feature.title}</h4>
                    <p className="feature-desc text-muted small mb-0">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <a
            href="https://portalclientes.seemanngroup.com/login"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-danger btn-lg px-5"
            onClick={() => {
              if (typeof window !== "undefined" && (window as any).dataLayer) {
                (window as any).dataLayer.push({
                  event: "webtracking_access",
                });
              }
            }}
          >
            {t("servicesPage.portalClientes.cta")}
          </a>
          <p className="text-muted small mt-3">
            {t("servicesPage.portalClientes.ctaSubtext")}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WebTrackingMock;
