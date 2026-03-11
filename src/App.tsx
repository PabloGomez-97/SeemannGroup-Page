import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import NuestraEmpresa from "./pages/NuestraEmpresa";
import ScrollToTop from "./components/Scrolls/ScrollToTop";
import Servicios from "./pages/Servicios";
import ScrollToHash from "./components/Scrolls/ScrollToHash";
import BlogList from "./pages/BlogList";
import BlogPost from "./pages/BlogPost";
import Cotizaciones from "./components/Ejecutivos/Cotizaciones";
import NewClients from "./components/NewClients/NewClients";
import ContactForm from "./components/ContactForm";
import ScrollToTopButton from "./components/ScrollToTopButton";
import LinkedInInsight from "./components/LinkedInInsight";
import ThankYou from "./pages/ThankYou";

// Service Detail Pages
import TransporteAereo from "./pages/Services/TransporteAereo";
import TransporteMaritimo from "./pages/Services/TransporteMaritimo";
import TransporteTerrestre from "./pages/Services/TransporteTerrestre";
import Warehouse from "./pages/Services/Warehouse";
import ServicioMultimodal from "./pages/Services/ServicioMultimodal";
import ServicioAduanas from "./pages/Services/ServicioAduanas";

function App() {
  useEffect(() => {
    // Cargar Bootstrap JS
    const bootstrapScript = document.createElement("script");
    bootstrapScript.src =
      "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js";
    bootstrapScript.async = true;
    document.body.appendChild(bootstrapScript);

    return () => {
      document.body.removeChild(bootstrapScript);
    };
  }, []);

  return (
    <HelmetProvider>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <ScrollToTop />
        <ScrollToHash />
        <LinkedInInsight />

        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route
              path="/servicios/transporte-aereo"
              element={<TransporteAereo />}
            />
            <Route
              path="/servicios/transporte-maritimo"
              element={<TransporteMaritimo />}
            />
            <Route
              path="/servicios/transporte-terrestre"
              element={<TransporteTerrestre />}
            />
            <Route path="/servicios/warehouse" element={<Warehouse />} />
            <Route
              path="/servicios/servicio-multimodal"
              element={<ServicioMultimodal />}
            />
            <Route
              path="/servicios/servicio-aduanas"
              element={<ServicioAduanas />}
            />
            <Route path="/nuestra-empresa" element={<NuestraEmpresa />} />
            <Route path="/insights" element={<BlogList />} />
            <Route path="/insights/:slug" element={<BlogPost />} />
            <Route path="/team" element={<Cotizaciones />} />
            <Route path="/nuevos-clientes" element={<NewClients />} />
            <Route path="/contacto" element={<ContactForm />} />
            <Route path="/gracias" element={<ThankYou />} />
          </Routes>
          <Footer />
          <ScrollToTopButton />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
