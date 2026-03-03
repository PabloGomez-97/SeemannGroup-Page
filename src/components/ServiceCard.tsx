import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  description: string;
  details?: string[];
  link?: string;
  variant?: 'primary' | 'secondary';
}

const ServiceCard = ({ 
  icon, 
  title, 
  subtitle,
  description, 
  details, 
  link = '#',
  variant = 'primary' 
}: ServiceCardProps) => {
  const { t } = useTranslation();

  return (
    <div className="col-lg-3 col-md-6 col-sm-6 mb-4" data-aos="fade-up">
      <div className="service-flip-card">
        <div className="service-flip-card-inner">
          {/* FRONT SIDE */}
          <div className={`service-flip-card-front ${variant === 'primary' ? 'bg-danger' : 'bg-secondary'}`}>
            <div className="d-flex flex-column align-items-center justify-content-center h-100 text-white p-3">
              <div className="service-icon mb-3">
                {icon}
              </div>
              <h3 className="text-white text-center mb-0 text-uppercase fw-bold" style={{ fontSize: '1.2rem' }}>
                {title}
              </h3>
              {subtitle && (
                <p className="text-white text-center mt-2 mb-0" style={{ fontSize: '0.8rem' }}>
                  {subtitle}
                </p>
              )}
              <div className="mt-3">
                <i className="bi bi-plus-circle" style={{ fontSize: '2rem' }}></i>
              </div>
            </div>
          </div>

          {/* BACK SIDE */}
          <div className={`service-flip-card-back ${variant === 'primary' ? 'bg-danger' : 'bg-secondary'}`}>
            <div className="d-flex flex-column h-100 text-white p-3">
              <div className="service-icon-small mb-2 text-center">
                {icon}
              </div>
              <h4 className="text-white text-center mb-2 text-uppercase fw-bold" style={{ fontSize: '1rem' }}>
                {title}
              </h4>
              
              <p className="text-white small text-center mb-2" style={{ fontSize: '0.75rem' }}>
                {description}
              </p>

              {details && details.length > 0 && (
                <ul className="list-unstyled text-white small mb-auto" style={{ fontSize: '0.7rem' }}>
                  {details.map((detail, index) => (
                    <li key={index} className="mb-1">
                      <i className="bi bi-check-circle-fill me-2"></i>
                      {detail}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-auto text-center">
                <Link 
                  to={link} 
                  className="btn btn-light btn-sm text-uppercase fw-bold"
                  style={{ fontSize: '0.7rem', padding: '0.4rem 0.8rem' }}
                >
                  <i className="bi bi-plus-circle me-1"></i>
                  {t('services.seeMore')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;

