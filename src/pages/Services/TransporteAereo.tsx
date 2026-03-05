import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import {
  Plane,
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

const TransporteAereo = () => {
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
        service_name: "Transporte Aéreo",
        service_slug: "transporte-aereo",
      });
    }

    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: <Clock size={48} strokeWidth={1.5} />,
      title: t("servicePages.airTransport.features.feature1.title"),
      description: t("servicePages.airTransport.features.feature1.description"),
    },
    {
      icon: <Shield size={48} strokeWidth={1.5} />,
      title: t("servicePages.airTransport.features.feature2.title"),
      description: t("servicePages.airTransport.features.feature2.description"),
    },
    {
      icon: <Target size={48} strokeWidth={1.5} />,
      title: t("servicePages.airTransport.features.feature3.title"),
      description: t("servicePages.airTransport.features.feature3.description"),
    },
  ];

  const services = [
    {
      title: t("servicePages.airTransport.services.service1.title"),
      description: t("servicePages.airTransport.services.service1.description"),
    },
    {
      title: t("servicePages.airTransport.services.service2.title"),
      description: t("servicePages.airTransport.services.service2.description"),
    },
    {
      title: t("servicePages.airTransport.services.service3.title"),
      description: t("servicePages.airTransport.services.service3.description"),
    },
    {
      title: t("servicePages.airTransport.services.service4.title"),
      description: t("servicePages.airTransport.services.service4.description"),
    },
    {
      title: t("servicePages.airTransport.services.service5.title"),
      description: t("servicePages.airTransport.services.service5.description"),
    },
    {
      title: t("servicePages.airTransport.services.service6.title"),
      description: t("servicePages.airTransport.services.service6.description"),
    },
    {
      title: t("servicePages.airTransport.services.service7.title"),
      description: t("servicePages.airTransport.services.service7.description"),
    },
    {
      title: t("servicePages.airTransport.services.service8.title"),
      description: t("servicePages.airTransport.services.service8.description"),
    },
  ];

  const processSteps = [
    {
      icon: <FileCheck size={40} />,
      title: t("servicePages.airTransport.process.step1.title"),
      description: t("servicePages.airTransport.process.step1.description"),
      duration: t("servicePages.airTransport.process.step1.duration"),
    },
    {
      icon: <Package size={40} />,
      title: t("servicePages.airTransport.process.step2.title"),
      description: t("servicePages.airTransport.process.step2.description"),
      duration: t("servicePages.airTransport.process.step2.duration"),
    },
    {
      icon: <Rocket size={40} />,
      title: t("servicePages.airTransport.process.step3.title"),
      description: t("servicePages.airTransport.process.step3.description"),
      duration: t("servicePages.airTransport.process.step3.duration"),
    },
    {
      icon: <Zap size={40} />,
      title: t("servicePages.airTransport.process.step4.title"),
      description: t("servicePages.airTransport.process.step4.description"),
      duration: t("servicePages.airTransport.process.step4.duration"),
    },
  ];

  const faqs =
    (t("servicePages.airTransport.faqs", { returnObjects: true }) as Array<{
      question: string;
      answer: string;
    }>) || [];

  return (
    <>
      <Helmet>
        <title>
          Transporte Aéreo - Velocidad y Trazabilidad Global | Seemann Group
        </title>
        <meta
          name="description"
          content="Servicio de transporte aéreo internacional: General Cargo, DG, Project Cargo, JIT, Pharma. Tracking 24/7 y respuesta en 24h. Cobertura global con +100 destinos."
        />
        <meta property="og:title" content="Transporte Aéreo - Seemann Group" />
        <meta
          property="og:description"
          content="Soluciones de transporte aéreo con tracking 24/7, manejo de carga peligrosa, pharmaceutical y project cargo. 35+ años de experiencia."
        />
        <meta property="og:type" content="website" />
        <link
          rel="canonical"
          href="https://seemanngroup.com/servicios/transporte-aereo"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Transporte Aéreo",
            description:
              "Gestión integral de transporte aéreo internacional: general cargo, carga peligrosa, project cargo, charter y courier. Seguimiento 24/7 y soluciones a medida.",
            provider: {
              "@type": "Organization",
              name: "Seemann Group",
              url: "https://seemanngroup.com",
            },
            serviceType: "Freight Forwarding",
            areaServed: ["CL", "PE", "AR", "US", "CN"],
            url: "https://seemanngroup.com/servicios/transporte-aereo",
          })}
        </script>
      </Helmet>

      <ServiceHero
        title={t("servicePages.airTransport.hero.title")}
        subtitle={t("servicePages.airTransport.hero.subtitle")}
        backgroundImage="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&h=900&fit=crop"
        icon={<Plane size={64} strokeWidth={1.5} />}
        ctaPrimary={{
          text: t("servicePages.airTransport.cta.btnPrimary"),
          link: "/contacto",
        }}
        ctaSecondary={{
          text: t("servicePages.airTransport.cta.btnSecondary"),
          link: "/team",
        }}
      />

      <FeatureGrid features={features} columns={3} />

      <section className="py-5 bg-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h2 className="mb-4">
                {t("servicePages.airTransport.whyChoose.title")}
              </h2>
              <p
                className="mb-4"
                style={{ color: "#070707", lineHeight: "1.3" }}
                dangerouslySetInnerHTML={{
                  __html: t("servicePages.airTransport.whyChoose.p1"),
                }}
              />
              <p
                className="mb-4"
                dangerouslySetInnerHTML={{
                  __html: t("servicePages.airTransport.whyChoose.p2"),
                }}
              />
              <p
                className="mb-0"
                dangerouslySetInnerHTML={{
                  __html: t("servicePages.airTransport.whyChoose.p3"),
                }}
              />
            </div>
            <div className="col-lg-6">
              <img
                src="/images/1203.jpg"
                alt="Cargo aéreo internacional"
                className="img-fluid rounded shadow-lg"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <ProcessSteps
        steps={processSteps}
        title={t("servicePages.airTransport.processTitle")}
      />

      <ServiceAccordion
        title={t("servicePages.airTransport.servicesTitle")}
        items={services}
      />
    </>
  );
};

export default TransporteAereo;
