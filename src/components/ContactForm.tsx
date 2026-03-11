import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AOS from "aos";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  Shield,
  TrendingUp,
  Globe,
  Send,
  User,
} from "lucide-react";

const ContactForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease",
      once: true,
    });
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    position: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: formData.name,
          telefono: formData.phone,
          correo: formData.email || undefined,
          cargo: formData.position || undefined,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setFormData({ name: "", phone: "", email: "", position: "" });

        // Push dataLayer event for GTM conversion tracking
        if (typeof window !== "undefined" && (window as any).dataLayer) {
          (window as any).dataLayer.push({
            event: "form_submission",
            form_name: "contacto",
          });
        }

        // Redirect to thank you page
        navigate("/gracias");
      } else {
        throw new Error(data.error || "Error al enviar el formulario");
      }
    } catch (error) {
      setIsSubmitting(false);
      setSubmitStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Error desconocido al enviar el formulario",
      );

      // Resetear estado de error después de 5 segundos
      setTimeout(() => {
        setSubmitStatus("idle");
        setErrorMessage("");
      }, 5000);
    }
  };

  const benefits = [
    {
      icon: <Clock className="benefit-icon" />,
      title: t("contact.benefits.response.title", "Respuesta en 24 horas"),
      description: t(
        "contact.benefits.response.desc",
        "Nuestro equipo te responderá en menos de 24 horas hábiles",
      ),
    },
    {
      icon: <Shield className="benefit-icon" />,
      title: t("contact.benefits.security.title", "Operaciones Seguras"),
      description: t(
        "contact.benefits.security.desc",
        "Garantizamos la seguridad de tu carga con seguros y tracking 24/7",
      ),
    },
    {
      icon: <TrendingUp className="benefit-icon" />,
      title: t("contact.benefits.optimization.title", "Optimización de Costos"),
      description: t(
        "contact.benefits.optimization.desc",
        "Analizamos tu operación para encontrar la mejor solución logística",
      ),
    },
    {
      icon: <Globe className="benefit-icon" />,
      title: t("contact.benefits.coverage.title", "Cobertura Global"),
      description: t(
        "contact.benefits.coverage.desc",
        "Presencia en 5 países y conexiones en más de 100 destinos",
      ),
    },
  ];

  return (
    <div
      className="contact-form-page"
      style={{ minHeight: "100vh", position: "relative", zIndex: 1 }}
    >
      {/* Hero Section */}
      <motion.div
        className="contact-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{ position: "relative", zIndex: 2 }}
      >
        <div className="container" style={{ position: "relative", zIndex: 3 }}>
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1
                className="contact-hero-title"
                style={{ color: "white", position: "relative", zIndex: 4 }}
              >
                {t("contact.hero.title", "Hagamos Crecer tu Negocio Juntos")}
              </h1>
              <p
                className="contact-hero-subtitle"
                style={{ color: "white", position: "relative", zIndex: 4 }}
              >
                {t(
                  "contact.hero.subtitle",
                  "Más de 35 años de experiencia respaldan nuestras soluciones logísticas. Cuéntanos sobre tu proyecto y te ayudaremos a encontrar la mejor solución.",
                )}
              </p>

              {/* Stats rápidas */}
              <div className="contact-quick-stats">
                <div className="stat-item">
                  <div className="stat-number">+100</div>
                  <div className="stat-label">
                    {t("contact.stats.clients", "Clientes Activos")}
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">35+</div>
                  <div className="stat-label">
                    {t("contact.stats.years", "Años de Experiencia")}
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">98%</div>
                  <div className="stat-label">
                    {t("contact.stats.satisfaction", "Satisfacción")}
                  </div>
                </div>
              </div>
            </div>

            {/* Formulario */}
            <div className="col-lg-6">
              <motion.div
                className="contact-form-card"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="form-card-title">
                  {t("contact.form.title", "Solicita una Cotización")}
                </h3>
                <p className="form-card-subtitle">
                  {t(
                    "contact.form.subtitle",
                    "Completa el formulario y te contactaremos pronto",
                  )}
                </p>

                {submitStatus === "success" && (
                  <motion.div
                    className="alert alert-success"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <CheckCircle2 size={20} className="me-2" />
                    {t(
                      "contact.form.success",
                      "¡Mensaje enviado! Te contactaremos pronto.",
                    )}
                  </motion.div>
                )}

                {submitStatus === "error" && (
                  <motion.div
                    className="alert alert-danger"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {t(
                      "contact.form.error",
                      "Error al enviar el formulario. Intenta nuevamente.",
                    )}
                    {errorMessage && (
                      <div className="mt-2 small">{errorMessage}</div>
                    )}
                  </motion.div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">
                      <User size={18} className="me-2" />
                      {t("contact.form.name", "Nombre Completo")} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="form-control form-control-lg"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder={t(
                        "contact.form.namePlaceholder",
                        "Tu nombre completo",
                      )}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      <Phone size={18} className="me-2" />
                      {t("contact.form.phone", "Teléfono")} *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      className="form-control form-control-lg"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+(XX) XXXX XXXX"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      <Mail size={18} className="me-2" />
                      {t("contact.form.email", "Email Corporativo")} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control form-control-lg"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder={t(
                        "contact.form.emailPlaceholder",
                        "tu@empresa.com",
                      )}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label">
                      <User size={18} className="me-2" />
                      {t("contact.form.position", "Cargo")} (
                      {t("contact.form.optional", "Opcional")})
                    </label>
                    <input
                      type="text"
                      name="position"
                      className="form-control form-control-lg"
                      value={formData.position}
                      onChange={handleChange}
                      placeholder={t(
                        "contact.form.positionPlaceholder",
                        "Gerente de Operaciones, Director, etc.",
                      )}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className="btn btn-primary btn-lg w-100"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        {t("contact.form.sending", "Enviando...")}
                      </>
                    ) : (
                      <>
                        <Send size={20} className="me-2" />
                        {t("contact.form.submit", "Enviar Solicitud")}
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Benefits Section */}
      <div className="contact-benefits-section">
        <div className="container">
          <div className="row mb-5">
            <div className="col-12 text-center">
              <h2 className="section-title">
                {t("contact.benefits.title", "¿Por qué elegirnos?")}
              </h2>
              <p className="section-subtitle">
                {t(
                  "contact.benefits.subtitle",
                  "Nos comprometemos con el éxito de tu operación logística",
                )}
              </p>
            </div>
          </div>

          <div className="row g-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="col-md-6 col-lg-3">
                <motion.div
                  className="benefit-card"
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="benefit-icon-wrapper">{benefit.icon}</div>
                  <h4 className="benefit-title">{benefit.title}</h4>
                  <p className="benefit-description">{benefit.description}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="contact-info-section">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4">
              <div className="info-card">
                <div className="info-icon">
                  <Phone size={32} />
                </div>
                <h4>{t("contact.info.phone.title", "Teléfono")}</h4>
                <a
                  href="tel:+56226048386"
                  className="info-value"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  +56 2 2604 8386
                </a>
                <p className="info-desc">
                  {t("contact.info.phone.desc", "Lun - Vie 9:00 - 18:00")}
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="info-card">
                <div className="info-icon">
                  <Mail size={32} />
                </div>
                <h4>{t("contact.info.email.title", "Email")}</h4>
                <a
                  href="mailto:contacto@seemanngroup.com"
                  className="info-value"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  contacto@seemanngroup.com
                </a>
                <p className="info-desc">
                  {t("contact.info.email.desc", "Respuesta en 24 horas")}
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="info-card">
                <div className="info-icon">
                  <MapPin size={32} />
                </div>
                <h4>{t("contact.info.address.title", "Oficina Principal")}</h4>
                <p className="info-value">Viña del Mar, Chile</p>
                <p className="info-desc">
                  {t(
                    "contact.info.address.desc",
                    "Av. Libertad #1405, of. 1203",
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
