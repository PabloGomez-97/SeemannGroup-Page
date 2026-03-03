import { useTranslation } from 'react-i18next';
import Slider from 'react-slick';
import { Mail, Phone, MessageCircle } from 'lucide-react';

interface Executive {
  id: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  image: string;
  hierarchy: number; // 1: Gerente, 2: Especialista, 3: Ejecutivo
}

const ExecutiveTeam = () => {
  const { t } = useTranslation();

  const executives: Executive[] = [
    {
      id: 'im',
      name: 'Ignacio Maldonado',
      position: 'Gerente General',
      email: 'ifmaldonado@seemanngroup.com',
      phone: '+56984607954',
      image: '/ejecutivos/im.png',
      hierarchy: 1
    },
    {
      id: 'na',
      name: 'Natalia Aguilera',
      position: 'Gerente Comercial',
      email: 'naguilera@seemanngroup.com',
      phone: '+56958022095',
      image: '/ejecutivos/na.png',
      hierarchy: 1
    },
    {
      id: 'dc',
      name: 'Daniel Caceres',
      position: 'Especialista en Pricing',
      email: 'dcaceres@seemanngroup.com',
      phone: '+56989335603',
      image: '/ejecutivos/dc.jpeg',
      hierarchy: 2
    },
    {
      id: 'jz',
      name: 'Jesús Zambrano',
      position: 'Ejecutivo Comercial',
      email: 'jzambrano@seemanngroup.com',
      phone: '+56985339119',
      image: '/ejecutivos/jz.png',
      hierarchy: 3
    },
    {
      id: 'jf',
      name: 'Joselin Flores',
      position: 'Ejecutivo Comercial',
      email: 'jflores@seemanngroup.com',
      phone: '+56941456933',
      image: '/ejecutivos/jf.jpeg',
      hierarchy: 3
    },
    {
      id: 'nl',
      name: 'Nicolas Lobo',
      position: 'Ejecutivo Comercial',
      email: 'nlobo@seemanngroup.com',
      phone: '+56985039253',
      image: '/ejecutivos/nl.jpeg',
      hierarchy: 3
    },
    {
      id: 'lm',
      name: 'Leonardo Martinez',
      position: 'Ejecutivo Comercial',
      email: 'lmartinez@seemanngroup.com',
      phone: '+56958178234',
      image: '/ejecutivos/lm.png',
      hierarchy: 3
    },
    {
      id: 'ds',
      name: 'Diego Soto',
      position: 'Ejecutivo Comercial',
      email: 'dsoto@seemanngroup.com',
      phone: '+56987698674',
      image: '/ejecutivos/ds.png',
      hierarchy: 3
    }
  ];

  // Ordenar por jerarquía
  const sortedExecutives = [...executives].sort((a, b) => a.hierarchy - b.hierarchy);

  const formatPhoneForWhatsApp = (phone: string) => {
    return phone.replace(/\+/g, '').replace(/\s/g, '');
  };

  const formatPhoneDisplay = (phone: string) => {
    // +56 9 8460 7954 formato
    const cleaned = phone.replace(/\+/g, '').replace(/\s/g, '');
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 3)} ${cleaned.slice(3, 7)} ${cleaned.slice(7)}`;
  };

  // Configuración del slider para responsive
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false
        }
      }
    ]
  };

  return (
    <div className="executive-team-section" id="executive-team-section">
      {/* Banner Hero */}
      <div 
        className="executive-banner"
        style={{ 
          backgroundImage: "url('/images/team-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="executive-banner-overlay"></div>
        <div className="container">
          <div className="row align-items-center justify-content-center text-center" style={{ minHeight: '400px' }}>
            <div className="col-lg-10">
              <div className="py-5">
                <div className="block-heading-1">
                  <span 
                    className="d-block mb-2 text-white" 
                    data-aos="fade-up"
                    style={{ 
                      fontSize: '1rem',
                      letterSpacing: '2px',
                      textTransform: 'uppercase'
                    }}
                  >
                    {t('newclients.subtitle')}
                  </span>
                  <h1 
                    className="mb-0 text-white" 
                    data-aos="fade-up" 
                    data-aos-delay="100"
                    style={{ 
                      fontSize: '3rem',
                      fontWeight: '700',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                    }}
                  >
                    {t('newclients.title')}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container py-5">
        <div className="row mb-4">
          <div className="col-12 text-center">
            <div className="block-heading-1" data-aos="fade-up">
              <span>{t('newclients.meetTeam')}</span>
              <h2>{t('newclients.ourTeam')}</h2>
            </div>
          </div>
        </div>

        {/* Desktop: Grid normal */}
        <div className="d-none d-lg-block">
          <div className="row g-4">
            {sortedExecutives.map((executive, index) => (
              <div 
                key={executive.id} 
                className="col-lg-3 col-md-6"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="executive-card">
                  <div className="executive-card-image-wrapper">
                    <img 
                      src={executive.image} 
                      alt={executive.name}
                      className="executive-card-image"
                      onError={(e) => {
                        // Fallback si no existe la imagen
                        e.currentTarget.src = 'https://ui-avatars.com/api/?name=Sales&background=bd2121&color=fff&size=400';
                      }}
                    />
                    <div className="executive-card-overlay">
                      <div className="executive-quick-actions">
                        <a 
                          href={`mailto:${executive.email}`}
                          className="executive-quick-btn"
                          title="Email"
                        >
                          <Mail size={18} />
                        </a>
                        <a 
                          href={`https://wa.me/${formatPhoneForWhatsApp(executive.phone)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="executive-quick-btn"
                          title="WhatsApp"
                        >
                          <MessageCircle size={18} />
                        </a>
                        <a 
                          href={`tel:${executive.phone}`}
                          className="executive-quick-btn"
                          title="Llamar"
                        >
                          <Phone size={18} />
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="executive-card-content">
                    <h3 className="executive-name">{executive.name}</h3>
                    <p className="executive-position">{executive.position}</p>

                    <div className="executive-contact-info">
                      <a 
                        href={`mailto:${executive.email}`}
                        className="executive-contact-item"
                      >
                        <Mail size={16} />
                        <span className="executive-email">{executive.email}</span>
                      </a>
                      <a 
                        href={`tel:${executive.phone}`}
                        className="executive-contact-item"
                      >
                        <Phone size={16} />
                        <span>{formatPhoneDisplay(executive.phone)}</span>
                      </a>
                    </div>

                    <div className="executive-actions">
                      <a 
                        href={`https://wa.me/${formatPhoneForWhatsApp(executive.phone)}?text=${encodeURIComponent(`Hola ${executive.name.split(' ')[0]}, me gustaría solicitar una cotización.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-danger btn-sm w-100"
                      >
                        <MessageCircle size={16} className="me-2" />
                        {t('newclients.contactViaWhatsApp')}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet: Slider */}
        <div className="d-block d-lg-none">
          <Slider {...sliderSettings}>
            {sortedExecutives.map((executive) => (
              <div key={executive.id} className="px-2">
                <div className="executive-card">
                  <div className="executive-card-image-wrapper">
                    <img 
                      src={executive.image} 
                      alt={executive.name}
                      className="executive-card-image"
                      onError={(e) => {
                        e.currentTarget.src = 'https://ui-avatars.com/api/?name=Sales&background=bd2121&color=fff&size=400';
                      }}
                    />
                    <div className="executive-card-overlay">
                      <div className="executive-quick-actions">
                        <a 
                          href={`mailto:${executive.email}`}
                          className="executive-quick-btn"
                          title="Email"
                        >
                          <Mail size={18} />
                        </a>
                        <a 
                          href={`https://wa.me/${formatPhoneForWhatsApp(executive.phone)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="executive-quick-btn"
                          title="WhatsApp"
                        >
                          <MessageCircle size={18} />
                        </a>
                        <a 
                          href={`tel:${executive.phone}`}
                          className="executive-quick-btn"
                          title="Llamar"
                        >
                          <Phone size={18} />
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="executive-card-content">
                    <h3 className="executive-name">{executive.name}</h3>
                    <p className="executive-position">{executive.position}</p>

                    <div className="executive-contact-info">
                      <a 
                        href={`mailto:${executive.email}`}
                        className="executive-contact-item"
                      >
                        <Mail size={16} />
                        <span className="executive-email">{executive.email}</span>
                      </a>
                      <a 
                        href={`tel:${executive.phone}`}
                        className="executive-contact-item"
                      >
                        <Phone size={16} />
                        <span>{formatPhoneDisplay(executive.phone)}</span>
                      </a>
                    </div>

                    <div className="executive-actions">
                      <a 
                        href={`https://wa.me/${formatPhoneForWhatsApp(executive.phone)}?text=${encodeURIComponent(`Hola ${executive.name.split(' ')[0]}, me gustaría solicitar una cotización.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-danger btn-sm w-100"
                      >
                        <MessageCircle size={16} className="me-2" />
                        {t('newclients.contactViaWhatsApp')}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveTeam;
