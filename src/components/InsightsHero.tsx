import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Eye,
  Clock,
} from "lucide-react";
import { getRecentPosts } from "../services/contentful";
import { Asset } from "contentful";
import { format } from "date-fns";
import { es, enUS } from "date-fns/locale";

const InsightsHero = () => {
  const { t, i18n } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      const insights = await getRecentPosts(5);
      setPosts(insights);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (posts.length === 0) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % posts.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [posts.length, currentSlide]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % posts.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + posts.length) % posts.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const locale = i18n.language === "es" ? es : enUS;
    return format(date, "dd MMM yyyy", { locale });
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  if (loading) {
    return (
      <div
        style={{
          height: "480px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1a1a1a",
        }}
      >
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="hero-slider">
        <div
          className="hero-slide overlay"
          style={{ background: "var(--primary-color)" }}
        >
          <div className="container d-flex align-items-center h-100">
            <div className="row justify-content-center text-center w-100">
              <div className="col-lg-8">
                <h1>
                  {t("hero.welcome", "Conectamos tu negocio con el mundo")}
                </h1>
                <p className="mb-4">
                  {t(
                    "hero.experience",
                    "Experiencia comprobada en logística internacional",
                  )}
                </p>
                <div className="hero-cta-group">
                  <Link
                    to="/team"
                    className="btn btn-light btn-lg px-4 py-2 fw-semibold"
                    style={{ color: "var(--primary-color)" }}
                  >
                    {t("hero.quoteBtn", "Solicitar Cotización")}
                    <ArrowRight className="ms-2" size={18} />
                  </Link>
                </div>
                <p
                  className="text-white mt-4"
                  style={{ opacity: 0.8, fontSize: "0.9rem" }}
                >
                  {t(
                    "hero.clientPortalMessage",
                    "Si eres un cliente de Seemann, entra al",
                  )}{" "}
                  <a
                    href="https://portalclientes.seemanngroup.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white fw-bold"
                    style={{ textDecoration: "underline" }}
                  >
                    {t("hero.clientPortal", "Portal de Clientes")}
                  </a>{" "}
                  {t("hero.quoteNow", "para Cotizar Ahora")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentPost = posts[currentSlide];
  const { title, slug, publishDate, featuredImage, excerpt, category } =
    currentPost.fields;
  const imageAsset = featuredImage as Asset | undefined;
  const imageUrl = imageAsset?.fields?.file?.url
    ? `https:${imageAsset.fields.file.url}`
    : "/images/default-blog.jpg";

  return (
    <div className="insights-hero-section">
      <div
        className="position-relative overflow-hidden"
        style={{ height: "480px" }}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
            }}
            className="position-absolute top-0 start-0 w-100 h-100"
          >
            <div
              className="position-absolute top-0 start-0 w-100 h-100"
              style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div
              className="position-absolute top-0 start-0 w-100 h-100"
              style={{ background: "rgba(0,0,0,0.55)" }}
            />

            <div className="container position-relative h-100">
              <div className="row align-items-center h-100">
                <div className="col-lg-8 offset-lg-2 text-center text-white">
                  {category && (
                    <span
                      className="d-inline-block mb-3 px-3 py-1"
                      style={{
                        background: "var(--primary-color)",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "600",
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                      }}
                    >
                      {category}
                    </span>
                  )}

                  <h1
                    className="fw-bold mb-3"
                    style={{
                      fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                      lineHeight: "1.2",
                    }}
                  >
                    {title}
                  </h1>

                  {excerpt && (
                    <p
                      className="mb-3"
                      style={{
                        fontSize: "1.05rem",
                        opacity: 0.9,
                        maxWidth: "640px",
                        margin: "0 auto 1.5rem",
                      }}
                    >
                      {excerpt}
                    </p>
                  )}

                  <div className="d-flex align-items-center justify-content-center gap-4 mb-4">
                    {publishDate && (
                      <div
                        className="d-flex align-items-center gap-2"
                        style={{ fontSize: "0.85rem" }}
                      >
                        <Calendar size={16} />
                        <span>{formatDate(publishDate)}</span>
                      </div>
                    )}
                    <div
                      className="d-flex align-items-center gap-2"
                      style={{ fontSize: "0.85rem" }}
                    >
                      <Eye size={16} />
                      <span>{t("insights.readTime", "5 min lectura")}</span>
                    </div>
                  </div>

                  <div className="d-flex gap-3 justify-content-center flex-wrap">
                    <Link
                      to={`/insights/${slug}`}
                      className="btn btn-light px-4 py-2 fw-semibold"
                      style={{
                        borderRadius: "var(--radius-md)",
                        color: "var(--primary-color)",
                      }}
                    >
                      {t("insights.readFull", "Leer Insight Completo")}
                      <ArrowRight className="ms-2" size={18} />
                    </Link>
                    <Link
                      to="/insights"
                      className="btn btn-outline-white px-4 py-2"
                    >
                      {t("insights.seeAll", "Ver Todos los Insights")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <div
          className="position-absolute top-50 start-0 translate-middle-y w-100"
          style={{ zIndex: 10 }}
        >
          <div className="container">
            <div className="d-flex justify-content-between">
              <button
                onClick={prevSlide}
                className="btn btn-light rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: "44px", height: "44px", opacity: 0.85 }}
                aria-label="Previous slide"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={nextSlide}
                className="btn btn-light rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: "44px", height: "44px", opacity: 0.85 }}
                aria-label="Next slide"
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </div>
        </div>

        {/* Dot indicators */}
        <div
          className="position-absolute bottom-0 start-50 translate-middle-x mb-3"
          style={{ zIndex: 10 }}
        >
          <div className="d-flex gap-2">
            {posts.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                style={{
                  width: currentSlide === index ? "32px" : "10px",
                  height: "10px",
                  background:
                    currentSlide === index
                      ? "var(--primary-color)"
                      : "rgba(255,255,255,0.5)",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* CTA Bar */}
      <div style={{ background: "var(--primary-color)", padding: "20px 0" }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 mb-3 mb-lg-0">
              <div className="d-flex align-items-center gap-3">
                <div
                  className="d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.15)",
                  }}
                >
                  <Clock size={22} className="text-white" />
                </div>
                <div>
                  <h3
                    className="text-white mb-0 fw-bold"
                    style={{ fontSize: "1.15rem" }}
                  >
                    {t("hero.saveTime", "Ahorra Tiempo, Optimiza tu Logística")}
                  </h3>
                  <p
                    className="text-white mb-0"
                    style={{ opacity: 0.85, fontSize: "0.85rem" }}
                  >
                    {t(
                      "hero.saveTimeDescription",
                      "Con Seemann Group, ganas velocidad y eficiencia en cada envío",
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-5 text-lg-end">
              <div className="d-flex gap-3 justify-content-lg-end justify-content-center flex-wrap">
                <Link
                  to="/team"
                  className="btn btn-light px-4 py-2 fw-bold"
                  style={{
                    color: "var(--primary-color)",
                    borderRadius: "var(--radius-md)",
                  }}
                >
                  {t("hero.quoteBtn", "Cotizar Ahora")}
                  <ArrowRight className="ms-2" size={18} />
                </Link>
                <a
                  href="https://portalclientes.seemanngroup.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-white px-4 py-2 d-flex flex-column align-items-center"
                  style={{ borderRadius: "var(--radius-md)", lineHeight: 1.3 }}
                >
                  <span style={{ fontSize: "0.75rem", opacity: 0.85 }}>
                    {t("hero.clientMessage", "¿Ya eres cliente?")}
                  </span>
                  <span
                    className="fw-bold d-flex align-items-center gap-1"
                    style={{ fontSize: "0.85rem" }}
                  >
                    {t("hero.clientPortal", "Portal de Clientes")}
                    <ArrowRight size={14} />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightsHero;
