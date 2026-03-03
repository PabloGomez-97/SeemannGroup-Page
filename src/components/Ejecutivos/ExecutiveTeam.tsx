import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MessageCircle } from 'lucide-react';

interface Executive {
  id: string;
  name: string;
  positionKey: string; // Translation key for position
  email: string;
  phone: string;
  image: string;
  hierarchy: number; // 1: Gerente, 2: Especialista, 3: Ejecutivo
  country: string; // 'CL', 'US', 'PE', 'CO', 'MX'
}

const ExecutiveTeam = () => {
  const { t } = useTranslation();
  const [selectedCountry, setSelectedCountry] = useState('CL');

  const executives: Executive[] = [
    {
      id: 'im',
      name: 'Ignacio Maldonado',
      positionKey: 'executives.positions.gerenteGeneral',
      email: 'ifmaldonado@seemanngroup.com',
      phone: '+56984607954',
      image: '/ejecutivos/im.png',
      hierarchy: 1,
      country: 'CL'
    },
    {
      id: 'na',
      name: 'Natalia Aguilera',
      positionKey: 'executives.positions.gerenteComercial',
      email: 'naguilera@seemanngroup.com',
      phone: '+56958022095',
      image: '/ejecutivos/na.png',
      hierarchy: 1,
      country: 'CL'
    },
    {
      id: 'dc',
      name: 'Daniel Caceres',
      positionKey: 'executives.positions.especialistaPricing',
      email: 'dcaceres@seemanngroup.com',
      phone: '+56989335603',
      image: '/ejecutivos/dc.jpeg',
      hierarchy: 2,
      country: 'CL'
    },
    {
      id: 'jz',
      name: 'Jesús Zambrano',
      positionKey: 'executives.positions.ejecutivoComercial',
      email: 'jzambrano@seemanngroup.com',
      phone: '+56985339119',
      image: '/ejecutivos/jz.jpeg',
      hierarchy: 3,
      country: 'CL'
    },
    {
      id: 'jf',
      name: 'Joselin Flores',
      positionKey: 'executives.positions.ejecutivoComercial',
      email: 'jflores@seemanngroup.com',
      phone: '+56941456933',
      image: '/ejecutivos/jf.jpeg',
      hierarchy: 3,
      country: 'CL'
    },
    {
      id: 'nl',
      name: 'Nicolas Lobo',
      positionKey: 'executives.positions.ejecutivoComercial',
      email: 'nlobo@seemanngroup.com',
      phone: '+56985039253',
      image: '/ejecutivos/nl.jpeg',
      hierarchy: 3,
      country: 'CL'
    },
    {
      id: 'lm',
      name: 'Leonardo Martinez',
      positionKey: 'executives.positions.ejecutivoComercial',
      email: 'lmartinez@seemanngroup.com',
      phone: '+56958178234',
      image: '/ejecutivos/lm.jpeg',
      hierarchy: 3,
      country: 'CL'
    },
    {
      id: 'ds',
      name: 'Diego Soto',
      positionKey: 'executives.positions.ejecutivoComercial',
      email: 'dsoto@seemanngroup.com',
      phone: '+56987698674',
      image: 'https://ui-avatars.com/api/?name=Diego+Soto&background=bd2121&color=fff&size=400',
      hierarchy: 3,
      country: 'CL'
    },
    {
      id: 'mp',
      name: 'Martín Pérez Salinas',
      positionKey: 'executives.positions.ejecutivoComercial',
      email: 'mperez@seemanngroup.com',
      phone: '+56987890874',
      image: '/ejecutivos/mp.png',
      hierarchy: 3,
      country: 'CL'
    },
    {
      id: 'jb',
      name: 'Jose Barandiaran',
      positionKey: 'executives.positions.countryManagerPeru',
      email: 'jbarandiaran@seemanngroup.com',
      phone: '+51965428674',
      image: 'https://ui-avatars.com/api/?name=Jose+Barandiaran&background=bd2121&color=fff&size=400',
      hierarchy: 1,
      country: 'PE'
    },
    {
      id: 'as',
      name: 'Andrea Silva',
      positionKey: 'executives.positions.countryManagerColombia',
      email: 'asilva@seemanngroup.com',
      phone: '+573112254301',
      image: '/ejecutivos/Colombia/AS.jpeg',
      hierarchy: 1,
      country: 'CO'
    },
    {
      id: 'ag',
      name: 'Arturo García',
      positionKey: 'executives.positions.countryManagerMexico',
      email: 'agarcia@seemanngroup.com',
      phone: '+525579793433',
      image: '/ejecutivos/Mexico/AG.jpeg',
      hierarchy: 1,
      country: 'MX'
    }
  ];

  const countries = [
    { code: 'CL', name: 'Chile', flag: 'https://flagcdn.com/cl.svg' },
    { code: 'US', name: 'USA', flag: 'https://flagcdn.com/us.svg' },
    { code: 'PE', name: 'Perú', flag: 'https://flagcdn.com/pe.svg' },
    { code: 'CO', name: 'Colombia', flag: 'https://flagcdn.com/co.svg' },
    { code: 'MX', name: 'México', flag: 'https://flagcdn.com/mx.svg' }
  ];

  // Filtrar ejecutivos por país seleccionado
  const filteredExecutives = executives.filter(exec => exec.country === selectedCountry);
  
  // Ordenar por jerarquía
  const sortedExecutives = [...filteredExecutives].sort((a, b) => a.hierarchy - b.hierarchy);

  const formatPhoneForWhatsApp = (phone: string) => {
    return phone.replace(/\+/g, '').replace(/\s/g, '');
  };

  const formatPhoneDisplay = (phone: string) => {
    // +56 9 8460 7954 formato
    const cleaned = phone.replace(/\+/g, '').replace(/\s/g, '');
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 3)} ${cleaned.slice(3, 7)} ${cleaned.slice(7)}`;
  };

  return (
    <div className="executive-team-section" id="executive-team-section">
      {/* Banner Hero */}
      <div 
        className="executive-banner"
        style={{ 
          background: 'linear-gradient(135deg, #bd2121 0%, #1e3a8a 100%)',
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
                    {t('executives.subtitle')}
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
                    {t('executives.title')}
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
              <span className="text-primary" style={{ fontSize: '1.1rem', letterSpacing: '1px' }}>
                {t('executives.contactLabel', 'Contacta a')}
              </span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '700', textTransform: 'uppercase' }}>
                {t('executives.teamTitle', 'NUESTRO EQUIPO')}
              </h2>
            </div>
          </div>
        </div>

        {/* Country Selector - Banderas */}
        <div className="row mb-5">
          <div className="col-12">
            <div className="d-flex justify-content-center gap-3 flex-wrap" data-aos="fade-up">
              {countries.map((country) => (
                <button
                  key={country.code}
                  onClick={() => setSelectedCountry(country.code)}
                  className={`country-flag-btn ${selectedCountry === country.code ? 'active' : ''}`}
                  style={{
                    border: selectedCountry === country.code ? '3px solid #bd2121' : '2px solid #ddd',
                    borderRadius: '12px',
                    padding: '15px 25px',
                    background: selectedCountry === country.code ? '#fff' : '#f8f9fa',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: selectedCountry === country.code ? '0 4px 12px rgba(189, 33, 33, 0.3)' : '0 2px 6px rgba(0,0,0,0.1)',
                    transform: selectedCountry === country.code ? 'scale(1.05)' : 'scale(1)'
                  }}
                >
                  <div className="d-flex flex-column align-items-center gap-2">
                    <img 
                      src={country.flag} 
                      alt={`${country.name} flag`}
                      style={{ 
                        width: '60px', 
                        height: '45px',
                        objectFit: 'cover',
                        borderRadius: '4px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                      }}
                    />
                    <span style={{ 
                      fontSize: '0.9rem', 
                      fontWeight: selectedCountry === country.code ? '700' : '500',
                      color: selectedCountry === country.code ? '#bd2121' : '#333'
                    }}>
                      {country.name}
                    </span>
                  </div>
                </button>
              ))}
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
                        e.currentTarget.src = 'https://ui-avatars.com/api/?name=User&background=cccccc&color=fff&size=400';
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
                    <p className="executive-position">{t(executive.positionKey)}</p>

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
                        {t('executives.contactViaWhatsApp')}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet: Grid vertical (no slider) */}
        <div className="d-block d-lg-none">
          <div className="row g-4">
            {sortedExecutives.map((executive, index) => (
              <div 
                key={executive.id} 
                className="col-12 col-md-6"
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
                        e.currentTarget.src = 'https://ui-avatars.com/api/?name=User&background=cccccc&color=fff&size=400';
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
                    <p className="executive-position">{t(executive.positionKey)}</p>

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
                        {t('executives.contactViaWhatsApp')}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveTeam;

