import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Target,
  Eye,
  Heart,
  Users,
  TrendingUp,
  Shield,
  Award,
  Globe,
  Clock,
} from "lucide-react";
import OfficeCards from "../components/OfficeCards";

const NuestraEmpresa = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const valores = [
    {
      icon: <Heart size={32} style={{ color: "var(--primary-color)" }} />,
      title: t("ourCompany.valores.empathy.title"),
      description: t("ourCompany.valores.empathy.description"),
    },
    {
      icon: <Users size={32} style={{ color: "var(--primary-color)" }} />,
      title: t("ourCompany.valores.personalization.title"),
      description: t("ourCompany.valores.personalization.description"),
    },
    {
      icon: <Shield size={32} style={{ color: "var(--primary-color)" }} />,
      title: t("ourCompany.valores.responsibility.title"),
      description: t("ourCompany.valores.responsibility.description"),
    },
    {
      icon: <CheckCircle size={32} style={{ color: "var(--primary-color)" }} />,
      title: t("ourCompany.valores.sincerity.title"),
      description: t("ourCompany.valores.sincerity.description"),
    },
    {
      icon: <TrendingUp size={32} style={{ color: "var(--primary-color)" }} />,
      title: t("ourCompany.valores.commitment.title"),
      description: t("ourCompany.valores.commitment.description"),
    },
    {
      icon: <Globe size={32} style={{ color: "var(--primary-color)" }} />,
      title: t("ourCompany.valores.flexibility.title"),
      description: t("ourCompany.valores.flexibility.description"),
    },
  ];

  return (
    <div className="site-wrap" style={{ backgroundColor: "#f8f9fa" }}>
      {/* Hero Banner con Parallax */}
      <motion.div
        className="position-relative overflow-hidden"
        style={{
          height: "70vh",
          minHeight: "500px",
          background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div
          className="position-absolute w-100 h-100"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&h=900&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.15,
            filter: "blur(1px)",
          }}
        />

        <div
          className="container position-relative h-100 d-flex align-items-center"
          style={{ zIndex: 2 }}
        >
          <div className="row w-100">
            <div className="col-lg-8 mx-auto text-center text-white">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <span
                  className="d-block mb-3 text-uppercase fw-semibold"
                  style={{
                    fontSize: "0.9rem",
                    letterSpacing: "4px",
                    color: "var(--primary-color)",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: t("ourCompany.banner.subtitle"),
                  }}
                />
                <h1
                  className="display-2 fw-bold mb-4"
                  style={{
                    fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                    lineHeight: "1.2",
                  }}
                >
                  {t("ourCompany.banner.title")}
                </h1>
                <p
                  className="lead mb-0"
                  style={{ fontSize: "1.25rem", opacity: 0.9 }}
                >
                  35+ años moviendo más que carga: movemos confianza
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Decorative wave */}
        <div
          className="position-absolute bottom-0 w-100"
          style={{
            height: "100px",
            background: "#f8f9fa",
            clipPath: "polygon(0 50%, 100% 0, 100% 100%, 0 100%)",
          }}
        />
      </motion.div>

      {/* Historia Section - Timeline Style */}
      <section
        className="py-5 position-relative"
        style={{ marginTop: "-50px" }}
      >
        <div className="container">
          <motion.div
            className="row justify-content-center mb-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <div className="col-lg-10">
              <motion.div className="text-center mb-5" variants={fadeInUp}>
                <div
                  className="d-inline-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    background: "var(--primary-color)",
                  }}
                >
                  <Clock size={28} className="text-white" />
                </div>
                <h2 className="display-5 fw-bold mb-3">
                  {t("ourCompany.historia.title")}
                </h2>
              </motion.div>

              <motion.div
                className="card border-0 shadow-lg"
                style={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  background: "white",
                }}
                variants={fadeInUp}
              >
                <div className="row g-0">
                  <div className="col-lg-5">
                    <div
                      className="h-100"
                      style={{
                        backgroundImage:
                          "url('/images/Nuestraempresa/Historia.jpeg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        minHeight: "400px",
                      }}
                    />
                  </div>
                  <div className="col-lg-7 p-5">
                    <div
                      className="mb-3 d-inline-block px-3 py-1"
                      style={{
                        background: "var(--primary-light)",
                        borderRadius: "20px",
                        fontSize: "0.85rem",
                        fontWeight: "600",
                        color: "var(--primary-color)",
                      }}
                    >
                      Est. 1985
                    </div>
                    <p
                      className="mb-4"
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: "400",
                      }}
                    >
                      {t("ourCompany.historia.p1")}
                    </p>
                    <p className="mb-4">{t("ourCompany.historia.p2")}</p>
                    <p className="mb-0">{t("ourCompany.historia.p3")}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Misión y Visión - Side by Side Cards */}
      <section className="py-5 bg-white">
        <div className="container">
          <motion.div
            className="row g-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {/* Misión */}
            <motion.div className="col-lg-6" variants={fadeInUp}>
              <div
                className="card h-100 border-0 shadow-lg"
                style={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-10px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <div className="position-relative" style={{ height: "250px" }}>
                  <div
                    className="w-100 h-100"
                    style={{
                      backgroundImage:
                        "url('/images/Nuestraempresa/Misión..png')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <div
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%)",
                    }}
                  />
                  <div className="position-absolute bottom-0 start-0 p-4">
                    <div className="d-flex align-items-center gap-3">
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "12px",
                          background: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Target
                          size={28}
                          style={{ color: "var(--primary-color)" }}
                        />
                      </div>
                      <h3 className="text-white mb-0 fw-bold">
                        {t("ourCompany.mision.title")}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="card-body p-4">
                  <p className="mb-3">{t("ourCompany.mision.p1")}</p>
                  <p className="mb-0 text-muted">{t("ourCompany.mision.p2")}</p>
                </div>
              </div>
            </motion.div>

            {/* Visión */}
            <motion.div className="col-lg-6" variants={fadeInUp}>
              <div
                className="card h-100 border-0 shadow-lg"
                style={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-10px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <div className="position-relative" style={{ height: "250px" }}>
                  <div
                    className="w-100 h-100"
                    style={{
                      backgroundImage:
                        "url('/images/Nuestraempresa/Visión.png')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <div
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%)",
                    }}
                  />
                  <div className="position-absolute bottom-0 start-0 p-4">
                    <div className="d-flex align-items-center gap-3">
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "12px",
                          background: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Eye
                          size={28}
                          style={{ color: "var(--primary-color)" }}
                        />
                      </div>
                      <h3 className="text-white mb-0 fw-bold">
                        {t("ourCompany.vision.title")}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="card-body p-4">
                  <p className="mb-3">{t("ourCompany.vision.p1")}</p>
                  <p className="mb-0 text-muted">{t("ourCompany.vision.p2")}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Valores - Grid Premium */}
      <section
        className="py-5"
        style={{
          background: "linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)",
        }}
      >
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div className="text-center mb-5" variants={fadeInUp}>
              <div
                className="d-inline-flex align-items-center justify-content-center mb-3"
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: "var(--primary-color)",
                }}
              >
                <Award size={28} className="text-white" />
              </div>
              <h2 className="display-5 fw-bold mb-3">
                {t("ourCompany.valores.title")}
              </h2>
              <p className="lead text-muted">{t("ourCompany.valores.intro")}</p>
            </motion.div>

            <div className="row g-4">
              {valores.map((valor, index) => (
                <motion.div
                  key={index}
                  className="col-md-6 col-lg-4"
                  variants={fadeInUp}
                >
                  <div
                    className="card h-100 border-0 shadow"
                    style={{
                      borderRadius: "16px",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-8px)";
                      e.currentTarget.style.boxShadow =
                        "0 20px 40px rgba(0,0,0,0.12)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 1px 3px rgba(0,0,0,0.12)";
                    }}
                  >
                    <div className="card-body p-4">
                      <div
                        className="d-inline-flex align-items-center justify-content-center mb-3"
                        style={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "12px",
                          background: "var(--primary-light)",
                        }}
                      >
                        {valor.icon}
                      </div>
                      <h5 className="fw-bold mb-3">{valor.title}</h5>
                      <p className="text-muted mb-0 small">
                        {valor.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Galería de Fotografías - Masonry Grid */}
      <section id="galeria-section" className="py-5 bg-white">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div className="text-center mb-5" variants={fadeInUp}>
              <h2 className="display-5 fw-bold" style={{ lineHeight: "1.2" }}>
                <span
                  className="text-uppercase fw-semibold d-block"
                  style={{
                    letterSpacing: "2px",
                    fontSize: "0.85rem",
                    marginBottom: "8px",
                    color: "var(--primary-color)",
                  }}
                >
                  {t("ourCompany.gallery.subtitle")}
                </span>
                <span className="d-block">{t("ourCompany.gallery.title")}</span>
              </h2>
            </motion.div>

            <div className="row g-4">
              {[1, 3, 6, 2, 4, 5].map((num, index) => (
                <motion.div
                  key={num}
                  className="col-md-6 col-lg-4"
                  variants={fadeInUp}
                >
                  <div
                    className="position-relative overflow-hidden"
                    style={{
                      borderRadius: "16px",
                      height: index % 3 === 0 ? "350px" : "280px",
                      cursor: "pointer",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.03)";
                      e.currentTarget.style.boxShadow =
                        "0 12px 24px rgba(0,0,0,0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 12px rgba(0,0,0,0.1)";
                    }}
                  >
                    <img
                      src={`/images/galeria/${num}.jpg`}
                      alt={`${t("ourCompany.gallery.title")} ${num}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.5s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "scale(1.1)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    />
                    <div
                      className="position-absolute top-0 start-0 w-100 h-100"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%)",
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.opacity = "1")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.opacity = "0")
                      }
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sección de Oficinas */}
      <OfficeCards />
    </div>
  );
};

export default NuestraEmpresa;
