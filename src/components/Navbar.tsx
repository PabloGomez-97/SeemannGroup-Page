import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useSpring } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();
  const { t } = useTranslation();
  
  // Scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
      {/* Scroll Progress Bar */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #bd2121, #ff6b6b)',
          transformOrigin: '0%',
          scaleX,
          zIndex: 10000,
          boxShadow: '0 0 10px rgba(189, 33, 33, 0.5)'
        }}
      />

      {/* Top Bar */}
      <motion.div 
        className="top-bar"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="float-end">
                <motion.a 
                  href="https://www.facebook.com/seemanngroup" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <i className="fab fa-facebook" style={{ margin: '0 5px', color: 'white' }}></i>
                </motion.a>
                <motion.a 
                  href="https://www.instagram.com/seemann_group/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <i className="fab fa-instagram" style={{ margin: '0 5px', color: 'white' }}></i>
                </motion.a>
                <motion.a 
                  href="https://www.linkedin.com/company/seemanngroup/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <i className="fab fa-linkedin" style={{ margin: '0 5px', color: 'white' }}></i>
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Navbar */}
      <motion.nav 
        className={`navbar navbar-expand-lg site-navbar ${isSticky ? 'sticky' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="container">
          <Link className="navbar-brand site-logo" to="/" onClick={() => window.scrollTo(0, 0)}>
            <motion.img 
              src="/images/logo1.png" 
              alt="Seemann Group Logo"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`}>
            <ul className="navbar-nav ms-auto site-navigation">
              
              {/* Nuestra Empresa */}
              <li 
                className={`nav-item dropdown ${openDropdown === 'empresa' ? 'show' : ''}`}
                onMouseEnter={() => setOpenDropdown('empresa')}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDropdown('empresa');
                  }}
                  aria-expanded={openDropdown === 'empresa'}
                >
                  {t('navbar.ourCompany')}
                </a>
                <ul className={`dropdown-menu ${openDropdown === 'empresa' ? 'show' : ''}`}>
                  <li>
                    <Link className="dropdown-item" to="/nuestra-empresa" onClick={() => window.scrollTo(0, 0)}>
                      {t('navbar.history')}
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/nuestra-empresa#galeria-section">
                      {t('navbar.photos')}
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/nuestra-empresa#oficinas-section">
                      {t('navbar.offices')}
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/team" onClick={() => window.scrollTo(0, 0)}>
                      {t('navbar.network')}
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Servicios */}
              <li 
                className={`nav-item dropdown ${openDropdown === 'servicios' ? 'show' : ''}`}
                onMouseEnter={() => setOpenDropdown('servicios')}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  className="nav-link dropdown-toggle"
                  to="/servicios"
                  role="button"
                  onClick={(e) => {
                    if (window.innerWidth < 992) {
                      e.preventDefault();
                      toggleDropdown('servicios');
                    } else {
                      window.scrollTo(0, 0);
                    }
                  }}
                  aria-expanded={openDropdown === 'servicios'}
                >
                  {t('navbar.services')}
                </Link>
                <ul className={`dropdown-menu ${openDropdown === 'servicios' ? 'show' : ''}`}>
                  <li>
                    <Link className="dropdown-item" to="/servicios/transporte-aereo" onClick={() => window.scrollTo(0, 0)}>
                      <i className="fas fa-plane me-2"></i>
                      {t('servicesPage.air.title')}
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/servicios/transporte-maritimo" onClick={() => window.scrollTo(0, 0)}>
                      <i className="fas fa-ship me-2"></i>
                      {t('servicesPage.sea.title')}
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/servicios/transporte-terrestre" onClick={() => window.scrollTo(0, 0)}>
                      <i className="fas fa-truck me-2"></i>
                      {t('servicesPage.land.title')}
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/servicios/warehouse" onClick={() => window.scrollTo(0, 0)}>
                      <i className="fas fa-warehouse me-2"></i>
                      {t('servicesPage.warehouse.title')}
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/servicios/servicio-multimodal" onClick={() => window.scrollTo(0, 0)}>
                      <i className="fas fa-route me-2"></i>
                      {t('servicesPage.multimodal.title')}
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/servicios/servicio-aduanas" onClick={() => window.scrollTo(0, 0)}>
                      <i className="fas fa-file-alt me-2"></i>
                      {t('servicesPage.customs.title')}
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <Link className="dropdown-item fw-semibold" to="/servicios" onClick={() => window.scrollTo(0, 0)}>
                      {t('navbar.viewAllServices')}
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Herramientas */}
              <li 
                className={`nav-item dropdown ${openDropdown === 'herramientas' ? 'show' : ''}`}
                onMouseEnter={() => setOpenDropdown('herramientas')}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDropdown('herramientas');
                  }}
                  aria-expanded={openDropdown === 'herramientas'}
                >
                  {t('navbar.tools')}
                </a>
                <ul className={`dropdown-menu ${openDropdown === 'herramientas' ? 'show' : ''}`}>
                  <li><Link className="dropdown-item" to="/servicios/#portal-clientes-section">{t('navbar.tracking')}</Link></li>
                  <li><Link className="dropdown-item" to="/team">{t('navbar.cotizacion')}</Link></li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="https://portalclientes.seemanngroup.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t('navbar.pricing')}
                    </a>
                  </li>
                </ul>
              </li>

              {/* Insights */}
              <li className="nav-item">
                <Link className="nav-link" to="/insights" onClick={() => window.scrollTo(0, 0)}>
                  {t('navbar.insights', 'Insights')}
                </Link>
              </li>

              <div className="navbar-actions d-flex align-items-center" style={{gap: '18px'}}>
                {/* Contacto */}
                <li className="nav-item">
                  <Link className="nav-link" to="/contacto">
                    {t('navbar.contact')}
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
                    {t('navbar.clientPortal')}
                  </a>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;
