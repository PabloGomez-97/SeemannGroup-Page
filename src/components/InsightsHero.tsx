import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";

const CORPORATE_IMAGE = "/images/1204.jpg";

const InsightsHero = () => {
  const { t } = useTranslation();

  return (
    <div className="insights-hero-section">
      <div className="insights-hero-carousel position-relative overflow-hidden">
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundImage: `url(${CORPORATE_IMAGE})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="insights-hero-overlay position-absolute top-0 start-0 w-100 h-100" />

        <div className="container position-relative insights-hero-content">
          <div className="row align-items-center insights-hero-content-inner">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightsHero;
