import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import {
  Ship,
  Anchor,
  DollarSign,
  Globe,
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

const TransporteMaritimo = () => {
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
        service_name: "Transporte Marítimo",
        service_slug: "transporte-maritimo",
      });
    }

    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: <DollarSign size={48} strokeWidth={1.5} />,
      title: t("servicePages.seaTransport.features.feature1.title"),
      description: t("servicePages.seaTransport.features.feature1.description"),
    },
    {
      icon: <Globe size={48} strokeWidth={1.5} />,
      title: t("servicePages.seaTransport.features.feature2.title"),
      description: t("servicePages.seaTransport.features.feature2.description"),
    },
    {
      icon: <Anchor size={48} strokeWidth={1.5} />,
      title: t("servicePages.seaTransport.features.feature3.title"),
      description: t("servicePages.seaTransport.features.feature3.description"),
    },
  ];

  const services = [
    {
      title: t("servicePages.seaTransport.services.service1.title"),
      description: t("servicePages.seaTransport.services.service1.description"),
    },
    {
      title: t("servicePages.seaTransport.services.service2.title"),
      description: t("servicePages.seaTransport.services.service2.description"),
    },
    {
      title: t("servicePages.seaTransport.services.service3.title"),
      description: t("servicePages.seaTransport.services.service3.description"),
    },
    {
      title: t("servicePages.seaTransport.services.service4.title"),
      description: t("servicePages.seaTransport.services.service4.description"),
    },
    {
      title: t("servicePages.seaTransport.services.service5.title"),
      description: t("servicePages.seaTransport.services.service5.description"),
    },
    {
      title: t("servicePages.seaTransport.services.service6.title"),
      description: t("servicePages.seaTransport.services.service6.description"),
    },
  ];

  const processSteps = [
    {
      icon: <FileCheck size={40} />,
      title: t("servicePages.seaTransport.process.step1.title"),
      description: t("servicePages.seaTransport.process.step1.description"),
      duration: t("servicePages.seaTransport.process.step1.duration"),
    },
    {
      icon: <Package size={40} />,
      title: t("servicePages.seaTransport.process.step2.title"),
      description: t("servicePages.seaTransport.process.step2.description"),
      duration: t("servicePages.seaTransport.process.step2.duration"),
    },
    {
      icon: <Rocket size={40} />,
      title: t("servicePages.seaTransport.process.step3.title"),
      description: t("servicePages.seaTransport.process.step3.description"),
      duration: t("servicePages.seaTransport.process.step3.duration"),
    },
    {
      icon: <Zap size={40} />,
      title: t("servicePages.seaTransport.process.step4.title"),
      description: t("servicePages.seaTransport.process.step4.description"),
      duration: t("servicePages.seaTransport.process.step4.duration"),
    },
  ];

  const faqs = t("servicePages.seaTransport.faqs", {
    returnObjects: true,
  }) as Array<{ question: string; answer: string }>;

  return (
    <>
      <Helmet>
        <title>
          Transporte Marítimo - FCL, LCL, RoRo y Break Bulk | Seemann Group
        </title>
        <meta
          name="description"
          content="Servicio de transporte marítimo internacional: FCL, LCL, RoRo, Break Bulk, Reefer. Negociación directa con navieras. Cobertura global con días libres optimizados."
        />
        <link
          rel="canonical"
          href="https://seemanngroup.com/servicios/transporte-maritimo"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Transporte Marítimo",
            description:
              "Gestión integral de transporte marítimo: FCL, LCL, RoRo, Break Bulk y Reefer. Negociación contractual, días libres optimizados y emisión oportuna de documentos.",
            provider: {
              "@type": "Organization",
              name: "Seemann Group",
              url: "https://seemanngroup.com",
            },
            serviceType: "Freight Forwarding",
            areaServed: ["CL", "PE", "AR", "BR", "US", "CN", "EU"],
            url: "https://seemanngroup.com/servicios/transporte-maritimo",
          })}
        </script>
      </Helmet>

      <ServiceHero
        title={t("servicePages.seaTransport.hero.title")}
        subtitle={t("servicePages.seaTransport.hero.subtitle")}
        backgroundImage="https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=1600&h=900&fit=crop"
        icon={<Ship size={64} strokeWidth={1.5} />}
        ctaSecondary={{
          text: t("servicePages.seaTransport.cta.btnSecondary"),
          link: "/team",
        }}
      />

      <FeatureGrid features={features} columns={3} />

      <section className="py-5 bg-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h2 className="mb-4">
                {t("servicePages.seaTransport.whyChoose.title")}
              </h2>
              <p
                className="mb-4"
                style={{ color: "#070707", lineHeight: "1.3" }}
              >
                {t("servicePages.seaTransport.whyChoose.p1")}
              </p>
              <p className="mb-4">
                {t("servicePages.seaTransport.whyChoose.p2")}
              </p>
              <p className="mb-0">
                {t("servicePages.seaTransport.whyChoose.p3")}
              </p>
            </div>
            <div className="col-lg-6">
              <img
                src="/images/1204.jpg"
                alt="Contenedores en puerto marítimo"
                className="img-fluid rounded shadow-lg"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <ProcessSteps
        steps={processSteps}
        title={t("servicePages.seaTransport.processTitle")}
      />

      <ServiceAccordion
        title={t("servicePages.seaTransport.servicesTitle")}
        items={services}
      />
    </>
  );
};

export default TransporteMaritimo;
