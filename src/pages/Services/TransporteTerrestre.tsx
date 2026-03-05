import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import {
  Truck,
  MapPin,
  Clock,
  Shield,
  FileCheck,
  Package,
  Rocket,
  Zap,
} from "lucide-react";

import ServiceHero from "../../components/Services/ServiceHero";
import FeatureGrid from "../../components/Services/FeatureGrid";
import ServiceAccordion from "../../components/Services/ServiceAccordion";
import ProcessSteps from "../../components/Services/ProcessSteps";
import WebTrackingMock from "../../components/Services/WebTrackingMock";
import FAQAccordion from "../../components/Services/FAQAccordion";

const TransporteTerrestre = () => {
  const { t } = useTranslation();

  useEffect(() => {
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

    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: "service_page_view",
        service_name: "Transporte Terrestre",
        service_slug: "transporte-terrestre",
      });
    }

    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: <MapPin size={48} strokeWidth={1.5} />,
      title: t("servicePages.landTransport.features.feature1.title"),
      description: t(
        "servicePages.landTransport.features.feature1.description",
      ),
    },
    {
      icon: <Shield size={48} strokeWidth={1.5} />,
      title: t("servicePages.landTransport.features.feature2.title"),
      description: t(
        "servicePages.landTransport.features.feature2.description",
      ),
    },
    {
      icon: <Clock size={48} strokeWidth={1.5} />,
      title: t("servicePages.landTransport.features.feature3.title"),
      description: t(
        "servicePages.landTransport.features.feature3.description",
      ),
    },
  ];

  const services = [
    {
      title: t("servicePages.landTransport.services.service1.title"),
      description: t(
        "servicePages.landTransport.services.service1.description",
      ),
    },
    {
      title: t("servicePages.landTransport.services.service2.title"),
      description: t(
        "servicePages.landTransport.services.service2.description",
      ),
    },
    {
      title: t("servicePages.landTransport.services.service3.title"),
      description: t(
        "servicePages.landTransport.services.service3.description",
      ),
    },
    {
      title: t("servicePages.landTransport.services.service4.title"),
      description: t(
        "servicePages.landTransport.services.service4.description",
      ),
    },
    {
      title: t("servicePages.landTransport.services.service5.title"),
      description: t(
        "servicePages.landTransport.services.service5.description",
      ),
    },
  ];

  const processSteps = [
    {
      icon: <FileCheck size={40} />,
      title: t("servicePages.landTransport.process.step1.title"),
      description: t("servicePages.landTransport.process.step1.description"),
      duration: t("servicePages.landTransport.process.step1.duration"),
    },
    {
      icon: <Package size={40} />,
      title: t("servicePages.landTransport.process.step2.title"),
      description: t("servicePages.landTransport.process.step2.description"),
      duration: t("servicePages.landTransport.process.step2.duration"),
    },
    {
      icon: <Rocket size={40} />,
      title: t("servicePages.landTransport.process.step3.title"),
      description: t("servicePages.landTransport.process.step3.description"),
      duration: t("servicePages.landTransport.process.step3.duration"),
    },
    {
      icon: <Zap size={40} />,
      title: t("servicePages.landTransport.process.step4.title"),
      description: t("servicePages.landTransport.process.step4.description"),
      duration: t("servicePages.landTransport.process.step4.duration"),
    },
  ];

  const faqs = t("servicePages.landTransport.faqs", {
    returnObjects: true,
  }) as Array<{ question: string; answer: string }>;

  return (
    <>
      <Helmet>
        <title>
          Transporte Terrestre - FTL, LTL, RoRo y Cross Border | Seemann Group
        </title>
        <meta
          name="description"
          content="Servicio de transporte terrestre internacional: FTL, LTL, RoRo, Break Bulk. Alianzas certificadas con tracking GPS y entregas puntuales en Sudamérica."
        />
        <link
          rel="canonical"
          href="https://seemanngroup.com/servicios/transporte-terrestre"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Transporte Terrestre",
            description:
              "Transporte terrestre internacional con alianzas certificadas: FTL, LTL, RoRo, Break Bulk. GPS tracking y entregas puntuales.",
            provider: {
              "@type": "Organization",
              name: "Seemann Group",
              url: "https://seemanngroup.com",
            },
            serviceType: "Freight Forwarding",
            areaServed: ["CL", "PE", "AR", "BR", "BO", "PY", "UY"],
            url: "https://seemanngroup.com/servicios/transporte-terrestre",
          })}
        </script>
      </Helmet>

      <ServiceHero
        title={t("servicePages.landTransport.hero.title")}
        subtitle={t("servicePages.landTransport.hero.subtitle")}
        backgroundImage="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1600&h=900&fit=crop"
        icon={<Truck size={64} strokeWidth={1.5} />}
        ctaSecondary={{
          text: t("servicePages.landTransport.cta.btnSecondary"),
          link: "/team",
        }}
      />

      <FeatureGrid features={features} columns={3} />

      <section className="py-5 bg-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h2 className="mb-4">
                {t("servicePages.landTransport.whyChoose.title")}
              </h2>
              <p
                className="mb-4"
                style={{ color: "#070707", lineHeight: "1.3" }}
              >
                {t("servicePages.landTransport.whyChoose.p1")}
              </p>
              <p className="mb-4">
                {t("servicePages.landTransport.whyChoose.p2")}
              </p>
              <p className="mb-0">
                {t("servicePages.landTransport.whyChoose.p3")}
              </p>
            </div>
            <div className="col-lg-6">
              <img
                src="/images/1205.jpg"
                alt="Transporte terrestre de carga"
                className="img-fluid rounded shadow-lg"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <ProcessSteps
        steps={processSteps}
        title={t("servicePages.landTransport.processTitle")}
      />

      <ServiceAccordion
        title={t("servicePages.landTransport.servicesTitle")}
        items={services}
      />
    </>
  );
};

export default TransporteTerrestre;
