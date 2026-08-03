import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, Facebook, Instagram, Linkedin } from 'lucide-react';

const STORE_BADGES = [
  {
    key: 'app-store',
    href: 'https://apps.apple.com/app/id6793726585',
    src: '/store/badge-app-store.svg',
    alt: 'Download on the App Store',
  },
  {
    key: 'google-play',
    href: 'https://play.google.com/store/apps/details?id=com.seemanngroup.portalclientes',
    src: '/store/badge-google-play.png',
    alt: 'Disponible en Google Play',
  },
] as const;

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="modern-footer">
      <div className="footer-wave-bg"></div>
      <div className="container">
        <div className="row py-5">
          
          {/* Logo y Descripción */}
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="footer-brand">
              <img src="/images/logo1.png" alt="Seemann Group" className="footer-logo mb-3" />
              <p className="footer-description">
                {t('footer.description')}
              </p>
              
              <div className="footer-contact-info mt-4">
                <a href="mailto:contacto@seemanngroup.com" className="footer-contact-item">
                  <Mail size={18} />
                  <span>contacto@seemanngroup.com</span>
                </a>
                <a href="tel:+56226048386" className="footer-contact-item">
                  <Phone size={18} />
                  <span>+56 2 2604 8386</span>
                </a>
              </div>
            </div>
          </div>

          {/* Menú - Columna 1: Empresa */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h4 className="footer-heading">{t('navbar.ourCompany')}</h4>
            <ul className="footer-links">
              <li><Link to="/nuestra-empresa">{t('navbar.history')}</Link></li>
              <li><Link to="/nuestra-empresa#galeria-section">{t('navbar.photos')}</Link></li>
              <li><Link to="/nuestra-empresa#oficinas-section">{t('navbar.offices')}</Link></li>
              <li><Link to="/team">{t('navbar.network')}</Link></li>
            </ul>
          </div>

          {/* Menú - Columna 2: Servicios */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h4 className="footer-heading">{t('navbar.services')}</h4>
            <ul className="footer-links">
              <li><Link to="/servicios/transporte-aereo">{t('servicesPage.air.title')}</Link></li>
              <li><Link to="/servicios/transporte-maritimo">{t('servicesPage.sea.title')}</Link></li>
              <li><Link to="/servicios/transporte-terrestre">{t('servicesPage.land.title')}</Link></li>
              <li><Link to="/servicios/warehouse">{t('servicesPage.warehouse.title')}</Link></li>
            </ul>
          </div>

          {/* Menú - Columna 3: Herramientas */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h4 className="footer-heading">{t('navbar.tools')}</h4>
            <ul className="footer-links">
              <li><Link to="/servicios#portal-clientes-section">{t('tools.tracking')}</Link></li>
              <li><Link to="/team">{t('tools.quotations')}</Link></li>
              <li>
                <a
                  href="https://portalclientes.seemanngroup.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('navbar.pricing')}
                </a>
              </li>
              <li><Link to="/nuevos-clientes">{t('navbar.newClients')}</Link></li>
              <li><Link to="/contacto">{t('navbar.contact')}</Link></li>
            </ul>
          </div>

          {/* Redes Sociales */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h4 className="footer-heading">{t('footer.getInTouch')}</h4>
            <ul className="footer-social-links">
              <li>
                <a href="https://www.facebook.com/seemanngroup" target="_blank" rel="noopener noreferrer">
                  <div className="social-icon-wrapper">
                    <Facebook size={16} />
                  </div>
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/seemann_group/" target="_blank" rel="noopener noreferrer">
                  <div className="social-icon-wrapper">
                    <Instagram size={16} />
                  </div>
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/seemanngroup/" target="_blank" rel="noopener noreferrer">
                  <div className="social-icon-wrapper">
                    <Linkedin size={16} />
                  </div>
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright + apps */}
        <div className="footer-bottom">
          <div className="footer-bottom__inner">
            <p className="footer-copyright mb-0">
              © {currentYear} {t('footer.copyright')}
            </p>

            <div className="footer-bottom__right">
              <div className="footer-apps">
                <p className="footer-apps-title">{t('footer.appsTitle')}</p>
                <div
                  className="footer-store-badges"
                  aria-label={t('footer.storeBadgesAriaLabel')}
                >
                  {STORE_BADGES.map((badge) => (
                    <a
                      key={badge.key}
                      href={badge.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`footer-store-badge footer-store-badge--${badge.key}`}
                    >
                      <img src={badge.src} alt={badge.alt} loading="lazy" />
                    </a>
                  ))}
                </div>
              </div>

              <p className="footer-terms mb-0">
                <Link to="/privacidad">{t('footer.privacy')}</Link>
                <span className="mx-2">·</span>
                <Link to="/terminos">{t('footer.terms')}</Link>
              </p>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
