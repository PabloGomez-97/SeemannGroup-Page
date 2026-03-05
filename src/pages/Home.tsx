import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import InsightsHero from "../components/InsightsHero";
import StatsBar from "../components/StatsBar";
import TrackingSection from "../components/TrackingSection";
import ServicesPreviewGrid from "../components/ServicesPreviewGrid";
import TestimonialsSection from "../components/TestimonialsSection";
import LogoCarousel from "../components/LogoCarousel";
import WhatsAppButton from "../components/WhatsAppButton";
import WebTrackingMock from "../components/Services/WebTrackingMock";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="site-wrap" id="home-section">
      {/* Hero Principal - Dynamic Insights Carousel */}
      <InsightsHero />

      {/* Servicios Section - Preview Grid Moderna */}
      <ServicesPreviewGrid />

      {/* Web Tracking Mock */}
      <WebTrackingMock />

      {/* Stats Bar - Números que impresionan */}
      <StatsBar />

      {/* Tracking Section */}
      <TrackingSection />

      {/* Testimonials Section - Social Proof */}
      <TestimonialsSection />

      {/* Partners Carousel - Breve */}
      <LogoCarousel />

      {/* CTA Final - Llamado a la acción */}
      <div className="cta-final-section">
        <div className="container text-center py-5">
          <h2 className="mb-4">
            {t("cta.title", "¿Listo para optimizar tu logística?")}
          </h2>
          <p className="mb-4 fs-5">
            {t("cta.subtitle", "Contáctanos y descubre cómo podemos ayudarte")}
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Link to="/team" className="btn btn-primary btn-lg">
              {t("cta.quote", "Solicitar Cotización")}
            </Link>
            <Link to="/contacto" className="btn btn-outline-primary btn-lg">
              {t("cta.contact", "Contáctanos")}
            </Link>
          </div>
        </div>
      </div>

      {/* WhatsApp Button Flotante */}
      <WhatsAppButton />
    </div>
  );
};

export default Home;
