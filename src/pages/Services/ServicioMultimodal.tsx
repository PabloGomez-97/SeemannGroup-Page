import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import {
  Network,
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

const ServicioMultimodal = () => {
  const { t } = useTranslation();

  useEffect(() => {
    // Múltiples intentos para forzar scroll al inicio
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
        service_name: "Servicio Multimodal",
        service_slug: "servicio-multimodal",
      });
    }

    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: <Clock size={48} strokeWidth={1.5} />,
      title: t("servicePages.multimodal.features.feature1.title"),
      description: t("servicePages.multimodal.features.feature1.description"),
    },
    {
      icon: <Shield size={48} strokeWidth={1.5} />,
      title: t("servicePages.multimodal.features.feature2.title"),
      description: t("servicePages.multimodal.features.feature2.description"),
    },
    {
      icon: <Target size={48} strokeWidth={1.5} />,
      title: t("servicePages.multimodal.features.feature3.title"),
      description: t("servicePages.multimodal.features.feature3.description"),
    },
  ];

  const services = [
    {
      title: t("servicePages.multimodal.services.service1.title"),
      description: t("servicePages.multimodal.services.service1.description"),
    },
    {
      title: t("servicePages.multimodal.services.service2.title"),
      description: t("servicePages.multimodal.services.service2.description"),
    },
    {
      title: t("servicePages.multimodal.services.service3.title"),
      description: t("servicePages.multimodal.services.service3.description"),
    },
    {
      title: t("servicePages.multimodal.services.service4.title"),
      description: t("servicePages.multimodal.services.service4.description"),
    },
  ];

  const processSteps = [
    {
      icon: <FileCheck size={40} />,
      title: t("servicePages.multimodal.process.step1.title"),
      description: t("servicePages.multimodal.process.step1.description"),
      duration: t("servicePages.multimodal.process.step1.duration"),
    },
    {
      icon: <Package size={40} />,
      title: t("servicePages.multimodal.process.step2.title"),
      description: t("servicePages.multimodal.process.step2.description"),
      duration: t("servicePages.multimodal.process.step2.duration"),
    },
    {
      icon: <Rocket size={40} />,
      title: t("servicePages.multimodal.process.step3.title"),
      description: t("servicePages.multimodal.process.step3.description"),
      duration: t("servicePages.multimodal.process.step3.duration"),
    },
    {
      icon: <Zap size={40} />,
      title: t("servicePages.multimodal.process.step4.title"),
      description: t("servicePages.multimodal.process.step4.description"),
      duration: t("servicePages.multimodal.process.step4.duration"),
    },
  ];

  const faqs =
    (t("servicePages.multimodal.faqs", { returnObjects: true }) as Array<{
      question: string;
      answer: string;
    }>) || [];

  return (
    <>
      <Helmet>
        <title>
          Servicio Multimodal - Integración Total de Transporte | Seemann Group
        </title>
        <meta
          name="description"
          content="Soluciones multimodales que combinan marítimo, aéreo y terrestre. Single point of contact, tracking unificado y optimización de costos en toda la cadena."
        />
        <meta
          property="og:title"
          content="Servicio Multimodal - Seemann Group"
        />
        <meta
          property="og:description"
          content="Transporte multimodal integrado: marítimo+terrestre, aéreo+terrestre, door-to-door. Gestión unificada y trazabilidad total."
        />
        <meta property="og:type" content="website" />
        <link
          rel="canonical"
          href="https://seemanngroup.com/servicios/servicio-multimodal"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Servicio Multimodal",
            description:
              "Gestión integral de transporte multimodal: combinación de marítimo, aéreo y terrestre con single point of contact y tracking unificado.",
            provider: {
              "@type": "Organization",
              name: "Seemann Group",
              url: "https://seemanngroup.com",
            },
            serviceType: "Multimodal Transport",
            areaServed: ["CL", "PE", "AR", "US", "CN", "LATAM"],
            url: "https://seemanngroup.com/servicios/servicio-multimodal",
          })}
        </script>
      </Helmet>

      <ServiceHero
        title={t("servicePages.multimodal.hero.title")}
        subtitle={t("servicePages.multimodal.hero.subtitle")}
        backgroundImage="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1600&h=900&fit=crop"
        icon={<Network size={64} strokeWidth={1.5} />}
        ctaPrimary={{
          text: t("servicePages.multimodal.cta.btnPrimary"),
          link: "/contacto",
        }}
        ctaSecondary={{
          text: t("servicePages.multimodal.cta.btnSecondary"),
          link: "/team",
        }}
      />

      <FeatureGrid features={features} columns={3} />

      <section className="py-5 bg-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h2 className="mb-4">
                {t("servicePages.multimodal.whyChoose.title")}
              </h2>
              <p
                className="mb-4"
                style={{ color: "#070707", lineHeight: "1.3" }}
                dangerouslySetInnerHTML={{
                  __html: t("servicePages.multimodal.whyChoose.p1"),
                }}
              />
              <p
                className="mb-4"
                dangerouslySetInnerHTML={{
                  __html: t("servicePages.multimodal.whyChoose.p2"),
                }}
              />
              <p
                className="mb-0"
                dangerouslySetInnerHTML={{
                  __html: t("servicePages.multimodal.whyChoose.p3"),
                }}
              />
            </div>
            <div className="col-lg-6">
              <img
                src="/images/1207.jpg"
                alt="Transporte multimodal integrado"
                className="img-fluid rounded shadow-lg"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <ProcessSteps
        steps={processSteps}
        title={t("servicePages.multimodal.processTitle")}
      />

      <ServiceAccordion
        title={t("servicePages.multimodal.servicesTitle")}
        items={services}
      />
    </>
  );
};

export default ServicioMultimodal;
