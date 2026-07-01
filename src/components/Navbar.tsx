import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Search, HelpCircle, MessageCircle, UserCircle } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [location]);

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const utilityLinks = (
    <>
      <Link
        to="/insights"
        className="navbar-utility-link"
        onClick={() => window.scrollTo(0, 0)}
      >
        <Search size={16} strokeWidth={1.5} />
        {t("navbar.search", "Buscar")}
      </Link>
      <LanguageSwitcher variant="navbar" />
      <Link
        to="/team"
        className="navbar-utility-link"
        onClick={() => window.scrollTo(0, 0)}
      >
        <HelpCircle size={16} strokeWidth={1.5} />
        {t("navbar.assistance", "Asistencia")}
      </Link>
      <Link
        to="/contacto"
        className="navbar-utility-link"
        onClick={() => window.scrollTo(0, 0)}
      >
        <MessageCircle size={16} strokeWidth={1.5} />
        {t("navbar.contactUs", "Contáctanos")}
      </Link>
    </>
  );

  const mainNavItems = (
    <ul className="navbar-bottom-nav site-navigation">
      {/* Nuestra Empresa */}
      <li
        className={`nav-item dropdown ${openDropdown === "empresa" ? "show" : ""}`}
        onMouseEnter={() => setOpenDropdown("empresa")}
        onMouseLeave={() => setOpenDropdown(null)}
      >
        <a
          className="nav-link dropdown-toggle"
          href="#"
          role="button"
          onClick={(e) => {
            e.preventDefault();
            toggleDropdown("empresa");
          }}
          aria-expanded={openDropdown === "empresa"}
        >
          {t("navbar.ourCompany")}
        </a>
        <ul
          className={`dropdown-menu ${openDropdown === "empresa" ? "show" : ""}`}
        >
          <li>
            <Link
              className="dropdown-item"
              to="/nuestra-empresa"
              onClick={() => window.scrollTo(0, 0)}
            >
              {t("navbar.history")}
            </Link>
          </li>
          <li>
            <Link
              className="dropdown-item"
              to="/nuestra-empresa#galeria-section"
            >
              {t("navbar.photos")}
            </Link>
          </li>
          <li>
            <Link
              className="dropdown-item"
              to="/nuestra-empresa#oficinas-section"
            >
              {t("navbar.offices")}
            </Link>
          </li>
          <li>
            <Link
              className="dropdown-item"
              to="/team"
              onClick={() => window.scrollTo(0, 0)}
            >
              {t("navbar.network")}
            </Link>
          </li>
        </ul>
      </li>

      {/* Servicios */}
      <li
        className={`nav-item dropdown ${openDropdown === "servicios" ? "show" : ""}`}
        onMouseEnter={() => setOpenDropdown("servicios")}
        onMouseLeave={() => setOpenDropdown(null)}
      >
        <Link
          className="nav-link dropdown-toggle"
          to="/servicios"
          role="button"
          onClick={(e) => {
            if (window.innerWidth < 992) {
              e.preventDefault();
              toggleDropdown("servicios");
            } else {
              window.scrollTo(0, 0);
            }
          }}
          aria-expanded={openDropdown === "servicios"}
        >
          {t("navbar.services")}
        </Link>
        <ul
          className={`dropdown-menu ${openDropdown === "servicios" ? "show" : ""}`}
        >
          <li>
            <Link
              className="dropdown-item"
              to="/servicios/transporte-aereo"
              onClick={() => window.scrollTo(0, 0)}
            >
              <i className="fas fa-plane me-2"></i>
              {t("servicesPage.air.title")}
            </Link>
          </li>
          <li>
            <Link
              className="dropdown-item"
              to="/servicios/transporte-maritimo"
              onClick={() => window.scrollTo(0, 0)}
            >
              <i className="fas fa-ship me-2"></i>
              {t("servicesPage.sea.title")}
            </Link>
          </li>
          <li>
            <Link
              className="dropdown-item"
              to="/servicios/transporte-terrestre"
              onClick={() => window.scrollTo(0, 0)}
            >
              <i className="fas fa-truck me-2"></i>
              {t("servicesPage.land.title")}
            </Link>
          </li>
          <li>
            <Link
              className="dropdown-item"
              to="/servicios/warehouse"
              onClick={() => window.scrollTo(0, 0)}
            >
              <i className="fas fa-warehouse me-2"></i>
              {t("servicesPage.warehouse.title")}
            </Link>
          </li>
          <li>
            <Link
              className="dropdown-item"
              to="/servicios/servicio-multimodal"
              onClick={() => window.scrollTo(0, 0)}
            >
              <i className="fas fa-route me-2"></i>
              {t("servicesPage.multimodal.title")}
            </Link>
          </li>
          <li>
            <Link
              className="dropdown-item"
              to="/servicios/servicio-aduanas"
              onClick={() => window.scrollTo(0, 0)}
            >
              <i className="fas fa-file-alt me-2"></i>
              {t("servicesPage.customs.title")}
            </Link>
          </li>
        </ul>
      </li>

      {/* Herramientas */}
      <li
        className={`nav-item dropdown ${openDropdown === "herramientas" ? "show" : ""}`}
        onMouseEnter={() => setOpenDropdown("herramientas")}
        onMouseLeave={() => setOpenDropdown(null)}
      >
        <a
          className="nav-link dropdown-toggle"
          href="#"
          role="button"
          onClick={(e) => {
            e.preventDefault();
            toggleDropdown("herramientas");
          }}
          aria-expanded={openDropdown === "herramientas"}
        >
          {t("navbar.tools")}
        </a>
        <ul
          className={`dropdown-menu ${openDropdown === "herramientas" ? "show" : ""}`}
        >
          <li>
            <Link className="dropdown-item" to="/team">
              {t("navbar.cotizacion")}
            </Link>
          </li>
          <li>
            <a
              className="dropdown-item"
              href="https://portalclientes.seemanngroup.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("navbar.pricing")}
            </a>
          </li>
        </ul>
      </li>

      {/* Insights */}
      <li className="nav-item">
        <Link
          className="nav-link"
          to="/insights"
          onClick={() => window.scrollTo(0, 0)}
        >
          {t("navbar.insights", "Insights")}
        </Link>
      </li>
    </ul>
  );

  return (
    <nav
      className={`navbar navbar-expand-lg site-navbar ${isSticky ? "sticky" : ""}`}
    >
      <div className="container">
        <div className="navbar-inner w-100">
          {/* Top row: logo + utilities */}
          <div className="navbar-top-row">
            <Link
              className="navbar-brand site-logo"
              to="/"
              onClick={() => window.scrollTo(0, 0)}
            >
              <img src="/images/logo1.png" alt="Seemann Group Logo" />
            </Link>

            <div className="navbar-utilities d-none d-lg-flex">
              {utilityLinks}
            </div>

            <button
              className="navbar-toggler d-lg-none"
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          {/* Bottom row: main nav + portal */}
          <div
            className={`navbar-bottom-row collapse navbar-collapse ${isMobileMenuOpen ? "show" : ""}`}
          >
            <div className="navbar-collapse-panel w-100">
              <div className="navbar-utilities d-lg-none">
                {utilityLinks}
              </div>

              {mainNavItems}

              <div className="navbar-bottom-actions">
                <a
                  className="btn-portal-clientes"
                  href="https://portalclientes.seemanngroup.com/login"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <UserCircle size={18} strokeWidth={1.5} />
                  {t("navbar.clientPortal")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
