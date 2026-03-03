import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    _linkedin_partner_id?: string;
    _linkedin_data_partner_ids?: string[];
    lintrk?: ((a: string, b?: any) => void) & { q?: [string, any][] };
  }
}

const PARTNER_ID = "9625241";

export default function LinkedInInsight() {
  const location = useLocation();

  useEffect(() => {
    console.info("[LinkedIn] LinkedInInsight mounted — before init", {
      partner: window._linkedin_partner_id,
      lintrkType: typeof window.lintrk,
    });
    // 1. Inicializar variables globales si no existen
    if (!window._linkedin_partner_id) {
      window._linkedin_partner_id = PARTNER_ID;
      window._linkedin_data_partner_ids =
        window._linkedin_data_partner_ids || [];
      window._linkedin_data_partner_ids.push(PARTNER_ID);
    }

    // 2. Cargar el script de LinkedIn solo una vez
    if (!document.getElementById("linkedin-insight-script")) {
      const s = document.getElementsByTagName("script")[0];
      const b = document.createElement("script");
      b.type = "text/javascript";
      b.async = true;
      b.id = "linkedin-insight-script";
      b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
      s.parentNode?.insertBefore(b, s);
    }

    // 3. Definir lintrk si no existe para evitar errores
    if (!window.lintrk) {
      window.lintrk = function (a: string, b?: any) {
        window.lintrk?.q?.push([a, b]);
      };
      window.lintrk.q = [];
    }

    console.info("[LinkedIn] LinkedInInsight init done", {
      partner: window._linkedin_partner_id,
      lintrkType: typeof window.lintrk,
      scriptPresent: !!document.getElementById("linkedin-insight-script"),
    });

    // 4. Notificar cambio de página
    if (typeof window.lintrk === "function") {
      window.lintrk("track");
    }
  }, [location.pathname]);

  return null;
}
