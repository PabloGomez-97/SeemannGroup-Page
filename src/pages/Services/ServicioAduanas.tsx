import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import {
  FileText,
  Clock,
  Shield,
  Target,
  FileCheck,
  Rocket,
  Package,
  Zap,
} from "lucide-react";
import ServiceHero from "../../components/Services/ServiceHero";
import FeatureGrid from "../../components/Services/FeatureGrid";
import ServiceAccordion from "../../components/Services/ServiceAccordion";
import ProcessSteps from "../../components/Services/ProcessSteps";
import WebTrackingMock from "../../components/Services/WebTrackingMock";
import FAQAccordion from "../../components/Services/FAQAccordion";

const ServicioAduanas = () => {
  const { t } = useTranslation();

  useEffect(() => {
    // Múltiples intentos para forzar scroll al inicios
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });

    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 50);

    // Analytics page view
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: "service_page_view",
        service_name: "Servicio de Aduanas",
        service_slug: "servicio-aduanas",
      });
    }

    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: <Clock size={48} strokeWidth={1.5} />,
      title: t("servicePages.customs.features.feature1.title"),
      description: t("servicePages.customs.features.feature1.description"),
    },
    {
      icon: <Shield size={48} strokeWidth={1.5} />,
      title: t("servicePages.customs.features.feature2.title"),
      description: t("servicePages.customs.features.feature2.description"),
    },
    {
      icon: <Target size={48} strokeWidth={1.5} />,
      title: t("servicePages.customs.features.feature3.title"),
      description: t("servicePages.customs.features.feature3.description"),
    },
  ];

  const services = [
    {
      title: t("servicePages.customs.services.service1.title"),
      description: t("servicePages.customs.services.service1.description"),
    },
    {
      title: t("servicePages.customs.services.service2.title"),
      description: t("servicePages.customs.services.service2.description"),
    },
    {
      title: t("servicePages.customs.services.service3.title"),
      description: t("servicePages.customs.services.service3.description"),
    },
    {
      title: t("servicePages.customs.services.service4.title"),
      description: t("servicePages.customs.services.service4.description"),
    },
    {
      title: t("servicePages.customs.services.service5.title"),
      description: t("servicePages.customs.services.service5.description"),
    },
  ];

  const processSteps = [
    {
      icon: <FileCheck size={40} />,
      title: t("servicePages.customs.process.step1.title"),
      description: t("servicePages.customs.process.step1.description"),
      duration: t("servicePages.customs.process.step1.duration"),
    },
    {
      icon: <Package size={40} />,
      title: t("servicePages.customs.process.step2.title"),
      description: t("servicePages.customs.process.step2.description"),
      duration: t("servicePages.customs.process.step2.duration"),
    },
    {
      icon: <Rocket size={40} />,
      title: t("servicePages.customs.process.step3.title"),
      description: t("servicePages.customs.process.step3.description"),
      duration: t("servicePages.customs.process.step3.duration"),
    },
    {
      icon: <Zap size={40} />,
      title: t("servicePages.customs.process.step4.title"),
      description: t("servicePages.customs.process.step4.description"),
      duration: t("servicePages.customs.process.step4.duration"),
    },
  ];

  const faqs =
    (t("servicePages.customs.faqs", { returnObjects: true }) as Array<{
      question: string;
      answer: string;
    }>) || [];

  return (
    <>
      <Helmet>
        <title>
          Servicio de Aduanas - Compliance y Agilidad | Seemann Group
        </title>
        <meta
          name="description"
          content="Gestión aduanera integral: importación, exportación, regímenes especiales, compliance. Agentes certificados, tecnología digital y asesoría experta."
        />
        <meta
          property="og:title"
          content="Servicio de Aduanas - Seemann Group"
        />
        <meta
          property="og:description"
          content="Despacho aduanero profesional con certificación OEA, gestión de permisos especiales y optimización arancelaria. 35+ años de experiencia."
        />
        <meta property="og:type" content="website" />
        <link
          rel="canonical"
          href="https://seemanngroup.com/servicios/servicio-aduanas"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Servicio de Aduanas",
            description:
              "Gestión integral de trámites aduaneros: importación, exportación, regímenes especiales, compliance y consultoría. Tecnología digital y agentes certificados.",
            provider: {
              "@type": "Organization",
              name: "Seemann Group",
              url: "https://seemanngroup.com",
            },
            serviceType: "Customs Brokerage",
            areaServed: ["CL", "PE", "AR"],
            url: "https://seemanngroup.com/servicios/servicio-aduanas",
          })}
        </script>
      </Helmet>

      <ServiceHero
        title={t("servicePages.customs.hero.title")}
        subtitle={t("servicePages.customs.hero.subtitle")}
        backgroundImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&h=900&fit=crop"
        icon={<FileText size={64} strokeWidth={1.5} />}
        ctaPrimary={{
          text: t("servicePages.customs.cta.btnPrimary"),
          link: "/contacto",
        }}
        ctaSecondary={{
          text: t("servicePages.customs.cta.btnSecondary"),
          link: "/team",
        }}
      />

      <FeatureGrid features={features} columns={3} />

      <section className="py-5 bg-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h2 className="mb-4">
                {t("servicePages.customs.whyChoose.title")}
              </h2>
              <p
                className="mb-4"
                style={{ color: "#070707", lineHeight: "1.3" }}
                dangerouslySetInnerHTML={{
                  __html: t("servicePages.customs.whyChoose.p1"),
                }}
              />
              <p
                className="mb-4"
                dangerouslySetInnerHTML={{
                  __html: t("servicePages.customs.whyChoose.p2"),
                }}
              />
              <p
                className="mb-0"
                dangerouslySetInnerHTML={{
                  __html: t("servicePages.customs.whyChoose.p3"),
                }}
              />
            </div>
            <div className="col-lg-6">
              <img
                src="/images/Imagen Servicio de Aduanas.png"
                alt="Gestión aduanera profesional"
                className="img-fluid rounded shadow-lg"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <ProcessSteps
        steps={processSteps}
        title={t("servicePages.customs.processTitle")}
      />

      <ServiceAccordion
        title={t("servicePages.customs.servicesTitle")}
        items={services}
      />

      <WebTrackingMock />

      <section className="py-5 bg-light">
        <div className="container text-center">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h2 className="mb-4">{t("servicePages.customs.stats.title")}</h2>
              <div className="row g-4 mb-5">
                <div className="col-md-4">
                  <div className="metric-card">
                    <div className="metric-value">
                      {t("servicePages.customs.stats.stat1.value")}
                    </div>
                    <div className="metric-label">
                      {t("servicePages.customs.stats.stat1.label")}
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="metric-card">
                    <div className="metric-value">
                      {t("servicePages.customs.stats.stat2.value")}
                    </div>
                    <div className="metric-label">
                      {t("servicePages.customs.stats.stat2.label")}
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="metric-card">
                    <div className="metric-value">
                      {t("servicePages.customs.stats.stat3.value")}
                    </div>
                    <div className="metric-label">
                      {t("servicePages.customs.stats.stat3.label")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQAccordion
        title={t("servicesPage.finalCta.faqTitle", "Preguntas Frecuentes")}
        subtitle={t(
          "servicesPage.finalCta.faqSubtitle",
          "Resolvemos tus dudas sobre este servicio",
        )}
        faqs={faqs}
      />

      <section className="cta-service-final py-5">
        <div className="container text-center text-white">
          <h2 className="mb-4">{t("servicePages.customs.cta.title")}</h2>
          <p className="lead mb-4">{t("servicePages.customs.cta.subtitle")}</p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Link to="/contacto" className="btn btn-light btn-lg px-5">
              {t("servicePages.customs.cta.btnPrimary")}
            </Link>
            <Link to="/team" className="btn btn-outline-light btn-lg px-5">
              {t("servicePages.customs.cta.btnSecondary")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicioAduanas;

