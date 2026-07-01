import { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
} from "lucide-react";
import { getRecentPosts } from "../services/contentful";
import { Asset } from "contentful";
import { format } from "date-fns";
import { es, enUS } from "date-fns/locale";

const CORPORATE_IMAGE = "/images/1204.jpg";
const MAX_INSIGHT_SLIDES = 4;
const CORPORATE_SLIDE_DURATION = 10000;
const INSIGHT_SLIDE_DURATION = 8000;

const InsightsHero = () => {
  const { t, i18n } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const insightPosts = useMemo(
    () => posts.slice(0, MAX_INSIGHT_SLIDES),
    [posts],
  );
  const totalSlides = 1 + insightPosts.length;

  useEffect(() => {
    const fetchPosts = async () => {
      const insights = await getRecentPosts(5);
      setPosts(insights);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    if (totalSlides <= 1) return;

    const duration =
      currentSlide === 0 ? CORPORATE_SLIDE_DURATION : INSIGHT_SLIDE_DURATION;
    const timeout = setTimeout(goToNext, duration);
    return () => clearTimeout(timeout);
  }, [totalSlides, goToNext, currentSlide]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const locale = i18n.language === "es" ? es : enUS;
    return format(date, "dd MMM yyyy", { locale });
  };

  const slideVariants = {
    enter: { opacity: 0 },
    center: { opacity: 1, zIndex: 1 },
    exit: { opacity: 0, zIndex: 0 },
  };

  const isCorporateSlide = currentSlide === 0;
  const currentPost = !isCorporateSlide
    ? insightPosts[currentSlide - 1]
    : null;

  const getSlideImage = () => {
    if (isCorporateSlide) return CORPORATE_IMAGE;
    const imageAsset = currentPost?.fields?.featuredImage as Asset | undefined;
    return imageAsset?.fields?.file?.url
      ? `https:${imageAsset.fields.file.url}`
      : "/images/default-blog.jpg";
  };

  if (loading) {
    return (
      <div className="insights-hero-loading">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="insights-hero-section">
      <div className="insights-hero-carousel position-relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.55, ease: "easeInOut" }}
            className="position-absolute top-0 start-0 w-100 h-100"
          >
            <div
              className="position-absolute top-0 start-0 w-100 h-100"
              style={{
                backgroundImage: `url(${getSlideImage()})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="insights-hero-overlay position-absolute top-0 start-0 w-100 h-100" />

            <div className="container position-relative h-100">
              <div className="row align-items-center h-100">
                {isCorporateSlide ? (
                  <div className="col-lg-7 text-white insights-hero-corporate">
                    <span className="insights-hero-eyebrow">
                      {t("hero.corporateTag", "Forwarder internacional")}
                    </span>
                    <h1 className="insights-hero-title">
                      {t("hero.corporateTitle", "Conectamos tu negocio con el mundo")}
                    </h1>
                    <p className="insights-hero-lead">
                      {t(
                        "hero.corporateSubtitle",
                        "Más de 35 años en transporte aéreo, marítimo, terrestre y servicios aduaneros con presencia en 5 países.",
                      )}
                    </p>
                    <ul className="insights-hero-credentials list-unstyled d-flex flex-wrap gap-3 mb-4">
                      <li>{t("hero.credentialYears", "35+ años de experiencia")}</li>
                      <li>{t("hero.credentialCountries", "5 países")}</li>
                      <li>{t("hero.credentialAlliances", "8 alianzas globales")}</li>
                    </ul>
                    <div className="d-flex gap-3 flex-wrap">
                      <Link to="/team" className="btn btn-light px-4 py-2 fw-semibold">
                        {t("hero.requestQuoteBtn", "Solicitar cotización")}
                        <ArrowRight className="ms-2" size={18} />
                      </Link>
                      <Link to="/servicios" className="btn btn-outline-white px-4 py-2">
                        {t("hero.ctaServices", "Ver servicios")}
                      </Link>
                    </div>
                  </div>
                ) : (
                  currentPost && (
                    <div className="col-lg-8 offset-lg-2 text-center text-white">
                      {currentPost.fields.category && (
                        <span className="insights-hero-insight-label">
                          {t("hero.insightLabel", "Insight")} ·{" "}
                          {currentPost.fields.category}
                        </span>
                      )}
                      <h2 className="insights-hero-title insights-hero-title--insight">
                        {currentPost.fields.title}
                      </h2>
                      {currentPost.fields.excerpt && (
                        <p className="insights-hero-lead insights-hero-lead--centered">
                          {currentPost.fields.excerpt}
                        </p>
                      )}
                      {currentPost.fields.publishDate && (
                        <div className="insights-hero-meta mb-4">
                          <Calendar size={15} />
                          <span>{formatDate(currentPost.fields.publishDate)}</span>
                        </div>
                      )}
                      <div className="d-flex gap-3 justify-content-center flex-wrap">
                        <Link
                          to={`/insights/${currentPost.fields.slug}`}
                          className="btn btn-light px-4 py-2 fw-semibold"
                        >
                          {t("insights.readFull", "Leer artículo")}
                          <ArrowRight className="ms-2" size={18} />
                        </Link>
                        <Link to="/insights" className="btn btn-outline-white px-4 py-2">
                          {t("insights.seeAll", "Ver todos los insights")}
                        </Link>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {totalSlides > 1 && (
          <div className="insights-hero-dots position-absolute bottom-0 start-50 translate-middle-x mb-3">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`insights-hero-dot ${currentSlide === index ? "active" : ""}`}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InsightsHero;
