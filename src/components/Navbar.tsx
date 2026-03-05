import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
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

  return (
    <>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="float-end d-flex align-items-center gap-2">
                <a
                  href="https://www.facebook.com/seemanngroup"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <i
                    className="fab fa-facebook"
                    style={{ margin: "0 5px", color: "white" }}
                  ></i>
                </a>
                <a
                  href="https://www.instagram.com/seemann_group/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <i
                    className="fab fa-instagram"
                    style={{ margin: "0 5px", color: "white" }}
                  ></i>
                </a>
                <a
                  href="https://www.linkedin.com/company/seemanngroup/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <i
                    className="fab fa-linkedin"
                    style={{ margin: "0 5px", color: "white" }}
                  ></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`navbar navbar-expand-lg site-navbar ${isSticky ? "sticky" : ""}`}
      >
        <div className="container">
          <Link
            className="navbar-brand site-logo"
            to="/"
            onClick={() => window.scrollTo(0, 0)}
          >
            <img src="/images/logo1.png" alt="Seemann Group Logo" />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={`collapse navbar-collapse ${isMobileMenuOpen ? "show" : ""}`}
          >
            <ul className="navbar-nav ms-auto site-navigation">
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
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link
                      className="dropdown-item fw-semibold"
                      to="/servicios"
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      {t("navbar.viewAllServices")}
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
                    <Link
                      className="dropdown-item"
                      to="/servicios/#portal-clientes-section"
                    >
                      {t("navbar.tracking")}
                    </Link>
                  </li>
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

              <div
                className="navbar-actions d-flex align-items-center"
                style={{ gap: "18px" }}
              >
                {/* Contacto */}
                <li className="nav-item">
                  <Link className="nav-link" to="/contacto">
                    {t("navbar.contact")}
                  </Link>
                </li>

                {/* Language Switcher */}
                <li className="nav-item">
                  <LanguageSwitcher />
                </li>

                {/* Portal Clientes */}
                <li className="nav-item">
                  <a
                    className="nav-link btn btn-primary text-white fw-semibold border border-2 border-dark rounded ms-lg-2 mt-2 mt-lg-0"
                    href="https://portalclientes.seemanngroup.com/login"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-user-circle me-2"></i>
                    {t("navbar.clientPortal")}
                  </a>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
