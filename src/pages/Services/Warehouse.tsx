import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import {
  Warehouse as WarehouseIcon,
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

const Warehouse = () => {
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
        service_name: "Warehouse",
        service_slug: "warehouse",
      });
    }

    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: <Clock size={48} strokeWidth={1.5} />,
      title: t("servicePages.warehouse.features.feature1.title"),
      description: t("servicePages.warehouse.features.feature1.description"),
    },
    {
      icon: <Shield size={48} strokeWidth={1.5} />,
      title: t("servicePages.warehouse.features.feature2.title"),
      description: t("servicePages.warehouse.features.feature2.description"),
    },
    {
      icon: <Target size={48} strokeWidth={1.5} />,
      title: t("servicePages.warehouse.features.feature3.title"),
      description: t("servicePages.warehouse.features.feature3.description"),
    },
  ];

  const services = [
    {
      title: t("servicePages.warehouse.services.service1.title"),
      description: t("servicePages.warehouse.services.service1.description"),
    },
    {
      title: t("servicePages.warehouse.services.service2.title"),
      description: t("servicePages.warehouse.services.service2.description"),
    },
    {
      title: t("servicePages.warehouse.services.service3.title"),
      description: t("servicePages.warehouse.services.service3.description"),
    },
    {
      title: t("servicePages.warehouse.services.service4.title"),
      description: t("servicePages.warehouse.services.service4.description"),
    },
    {
      title: t("servicePages.warehouse.services.service5.title"),
      description: t("servicePages.warehouse.services.service5.description"),
    },
  ];

  const processSteps = [
    {
      icon: <FileCheck size={40} />,
      title: t("servicePages.warehouse.process.step1.title"),
      description: t("servicePages.warehouse.process.step1.description"),
      duration: t("servicePages.warehouse.process.step1.duration"),
    },
    {
      icon: <Package size={40} />,
      title: t("servicePages.warehouse.process.step2.title"),
      description: t("servicePages.warehouse.process.step2.description"),
      duration: t("servicePages.warehouse.process.step2.duration"),
    },
    {
      icon: <Rocket size={40} />,
      title: t("servicePages.warehouse.process.step3.title"),
      description: t("servicePages.warehouse.process.step3.description"),
      duration: t("servicePages.warehouse.process.step3.duration"),
    },
    {
      icon: <Zap size={40} />,
      title: t("servicePages.warehouse.process.step4.title"),
      description: t("servicePages.warehouse.process.step4.description"),
      duration: t("servicePages.warehouse.process.step4.duration"),
    },
  ];

  const faqs =
    (t("servicePages.warehouse.faqs", { returnObjects: true }) as Array<{
      question: string;
      answer: string;
    }>) || [];

  return (
    <>
      <Helmet>
        <title>
          Warehouse & Logística - Almacenamiento Inteligente | Seemann Group
        </title>
        <meta
          name="description"
          content="Servicios de warehouse y almacenamiento con WMS integrado, control de inventario en tiempo real, value-added services y distribución last-mile."
        />
        <meta
          property="og:title"
          content="Warehouse & Logística - Seemann Group"
        />
        <meta
          property="og:description"
          content="Soluciones de almacenamiento con tecnología WMS, trazabilidad total, áreas especiales para químicos y pharma. 35+ años de experiencia."
        />
        <meta property="og:type" content="website" />
        <link
          rel="canonical"
          href="https://seemanngroup.com/servicios/warehouse"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Warehouse & Logística",
            description:
              "Gestión integral de almacenamiento: recepción, inventario, picking, packing y distribución. WMS integrado y value-added services.",
            provider: {
              "@type": "Organization",
              name: "Seemann Group",
              url: "https://seemanngroup.com",
            },
            serviceType: "Warehousing",
            areaServed: ["CL", "PE", "AR"],
            url: "https://seemanngroup.com/servicios/warehouse",
          })}
        </script>
      </Helmet>

      <ServiceHero
        title={t("servicePages.warehouse.hero.title")}
        subtitle={t("servicePages.warehouse.hero.subtitle")}
        backgroundImage="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&h=900&fit=crop"
        icon={<WarehouseIcon size={64} strokeWidth={1.5} />}
        ctaPrimary={{
          text: t("servicePages.warehouse.cta.btnPrimary"),
          link: "/contacto",
        }}
        ctaSecondary={{
          text: t("servicePages.warehouse.cta.btnSecondary"),
          link: "/team",
        }}
      />

      <FeatureGrid features={features} columns={3} />

      <section className="py-5 bg-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h2 className="mb-4">
                {t("servicePages.warehouse.whyChoose.title")}
              </h2>
              <p
                className="mb-4"
                style={{ color: "#070707", lineHeight: "1.3" }}
                dangerouslySetInnerHTML={{
                  __html: t("servicePages.warehouse.whyChoose.p1"),
                }}
              />
              <p
                className="mb-4"
                dangerouslySetInnerHTML={{
                  __html: t("servicePages.warehouse.whyChoose.p2"),
                }}
              />
              <p
                className="mb-0"
                dangerouslySetInnerHTML={{
                  __html: t("servicePages.warehouse.whyChoose.p3"),
                }}
              />
            </div>
            <div className="col-lg-6">
              <img
                src="/images/1206.jpg"
                alt="Almacenamiento y logística"
                className="img-fluid rounded shadow-lg"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <ProcessSteps
        steps={processSteps}
        title={t("servicePages.warehouse.processTitle")}
      />

      <ServiceAccordion
        title={t("servicePages.warehouse.servicesTitle")}
        items={services}
      />
    </>
  );
};

export default Warehouse;
