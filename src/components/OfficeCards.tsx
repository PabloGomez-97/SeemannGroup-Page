import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin } from 'lucide-react';

interface Office {
  city: string;
  address: string;
  phone?: string;
  email: string;
  googleMaps: string;
}

interface Country {
  name: string;
  flag: string;
  offices: Office[];
}

const OfficeCards = () => {
  const { t } = useTranslation();
  const [activeChileTab, setActiveChileTab] = useState(0);

  const countries: Country[] = [
    {
      name: 'CHILE',
      flag: 'https://flagcdn.com/cl.svg',
      offices: [
        {
          city: 'Viña del Mar',
          address: 'Avenida Libertad #1405, of. 1203, Viña del Mar - Chile.',
          email: 'contacto@seemanngroup.com',
          googleMaps: 'https://maps.google.com/?q=Avenida+Libertad+1405+Viña+del+Mar+Chile'
        },
        {
          city: 'Santiago',
          address: 'Avenida Providencia 1650, Oficina 1402, Providencia, Santiago, Chile.',
          phone: '+56-226048386',
          email: 'contacto@seemanngroup.com',
          googleMaps: 'https://maps.google.com/?q=Avenida+Providencia+1650+Santiago+Chile'
        },
        {
          city: 'Aeropuerto',
          address: 'Calle Osvaldo Croquievelle 2207, oficina 477, Edificio EOS, Aeropuerto Internacional Arturo Merino Benítez, Santiago – Chile.',
          email: 'contacto@seemanngroup.com',
          googleMaps: 'https://maps.google.com/?q=Osvaldo+Croquievelle+2207+Aeropuerto+Santiago+Chile'
        }
      ]
    },
    {
      name: 'ESTADOS UNIDOS',
      flag: 'https://flagcdn.com/us.svg',
      offices: [
        {
          city: 'Miami',
          address: '970 NW 70th Avenida, Miami, FL 33126.',
          phone: '+1-305-902-6888',
          email: 'usasale@seemanngroup.com',
          googleMaps: 'https://maps.google.com/?q=970+NW+70th+Avenue+Miami+FL+33126'
        }
      ]
    },
    {
      name: 'PERÚ',
      flag: 'https://flagcdn.com/pe.svg',
      offices: [
        {
          city: 'Lima',
          address: 'Avenida Jorge Basadre 607, Oficina 209, San Isidro, Lima – Perú.',
          phone: '+51 965 428 674',
          email: 'jbarandiaran@seemanngroup.com',
          googleMaps: 'https://maps.google.com/?q=Avenida+Jorge+Basadre+607+San+Isidro+Lima+Peru'
        }
      ]
    },
    {
      name: 'COLOMBIA',
      flag: 'https://flagcdn.com/co.svg',
      offices: [
        {
          city: 'Bogotá',
          address: 'Hirin Calle 87 #10-93 Oficina 702, Bogotá, Colombia.',
          phone: '+57 (350) 752-7109',
          email: 'asilva@seemanngroup.com',
          googleMaps: 'https://maps.google.com/?q=Calle+87+10-93+Bogota+Colombia'
        }
      ]
    },
    {
      name: 'MÉXICO',
      flag: 'https://flagcdn.com/mx.svg',
      offices: [
        {
          city: 'México',
          address: 'Paseo de La Reforma 284, Torre Magenta, Piso 17, Juárez, Cuauhtémoc, México.',
          phone: '+52 1 55 7979 3433',
          email: 'agarciac@seemanngroup.com',
          googleMaps: 'https://maps.google.com/?q=Paseo+de+La+Reforma+284+Mexico+City'
        }
      ]
    }
  ];

  return (
    <div className="site-section scroll-offset1 py-5" id="oficinas-section">
      <div className="container">
        <div className="row mb-5">
          <div className="col-12 text-center">
            <div className="block-heading-1" data-aos="fade-up">
              <span>{t('offices.subtitle')}</span>
              <h2>{t('offices.title')}</h2>
            </div>
          </div>
        </div>

        {/* Desktop: Grid con 3 arriba y 2 abajo centradas */}
        <div className="d-none d-lg-block">
          {/* Primera fila - 3 oficinas */}
          <div className="row g-4 justify-content-center mb-4">
            {countries.slice(0, 3).map((country, countryIndex) => (
              <div 
                key={countryIndex} 
                className="col-lg-4"
                data-aos="fade-up"
                data-aos-delay={countryIndex * 100}
              >
                <div className="office-card">
                  {/* Bandera y País */}
                  <div className="office-card-header">
                    <div className="office-flag">
                      <img src={country.flag} alt={country.name} style={{width: '64px', height: '48px', objectFit: 'cover', borderRadius: '6px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)'}} />
                    </div>
                    <h3 className="office-country">{country.name}</h3>
                  </div>

                  {/* Contenido */}
                  <div className="office-card-body">
                    {/* Si es Chile, mostrar tabs */}
                    {country.name === 'CHILE' ? (
                      <>
                        {/* Tabs para Chile */}
                        <div className="chile-tabs mb-3">
                          {country.offices.map((office, idx) => (
                            <button
                              key={idx}
                              className={`chile-tab-btn ${activeChileTab === idx ? 'active' : ''}`}
                              onClick={() => setActiveChileTab(idx)}
                            >
                              {office.city}
                            </button>
                          ))}
                        </div>

                        {/* Contenido del tab activo */}
                        <div className="office-info">
                          <div className="office-info-item">
                            <MapPin size={16} className="me-2 text-danger" />
                            <span>{country.offices[activeChileTab].address}</span>
                          </div>

                          {country.offices[activeChileTab].phone && (
                            <div className="office-info-item">
                              <Phone size={16} className="me-2 text-danger" />
                              <a href={`tel:${country.offices[activeChileTab].phone}`}>
                                {country.offices[activeChileTab].phone}
                              </a>
                            </div>
                          )}

                          <div className="office-info-item">
                            <Mail size={16} className="me-2 text-danger" />
                            <a href={`mailto:${country.offices[activeChileTab].email}`}>
                              {country.offices[activeChileTab].email}
                            </a>
                          </div>

                          <a
                            href={country.offices[activeChileTab].googleMaps}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline-danger btn-sm mt-3 w-100"
                          >
                            <MapPin size={14} className="me-1" />
                            {t('offices.viewOnMap')}
                          </a>
                        </div>
                      </>
                    ) : (
                      /* Para otros países, mostrar info directamente */
                      <div className="office-info">
                        <div className="office-info-item">
                          <MapPin size={16} className="me-2 text-danger" />
                          <span>{country.offices[0].address}</span>
                        </div>

                        {country.offices[0].phone && (
                          <div className="office-info-item">
                            <Phone size={16} className="me-2 text-danger" />
                            <a href={`tel:${country.offices[0].phone}`}>
                              {country.offices[0].phone}
                            </a>
                          </div>
                        )}

                        <div className="office-info-item">
                          <Mail size={16} className="me-2 text-danger" />
                          <a href={`mailto:${country.offices[0].email}`}>
                            {country.offices[0].email}
                          </a>
                        </div>

                        <a
                          href={country.offices[0].googleMaps}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline-danger btn-sm mt-3 w-100"
                        >
                          <MapPin size={14} className="me-1" />
                          {t('offices.viewOnMap')}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Segunda fila - 2 oficinas centradas (Colombia y México) */}
          <div className="row g-4 justify-content-center">
            {countries.slice(3, 5).map((country, countryIndex) => (
              <div 
                key={countryIndex + 3} 
                className="col-lg-4"
                data-aos="fade-up"
                data-aos-delay={(countryIndex + 3) * 100}
              >
                <div className="office-card">
                  <div className="office-card-header">
                    <div className="office-flag">
                      <img src={country.flag} alt={country.name} style={{width: '64px', height: '48px', objectFit: 'cover', borderRadius: '6px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)'}} />
                    </div>
                    <h3 className="office-country">{country.name}</h3>
                  </div>

                  <div className="office-card-body">
                    <div className="office-info">
                      <div className="office-info-item">
                        <MapPin size={16} className="me-2 text-danger" />
                        <span>{country.offices[0].address}</span>
                      </div>

                      {country.offices[0].phone && (
                        <div className="office-info-item">
                          <Phone size={16} className="me-2 text-danger" />
                          <a href={`tel:${country.offices[0].phone}`}>
                            {country.offices[0].phone}
                          </a>
                        </div>
                      )}

                      <div className="office-info-item">
                        <Mail size={16} className="me-2 text-danger" />
                        <a href={`mailto:${country.offices[0].email}`}>
                          {country.offices[0].email}
                        </a>
                      </div>

                      <a
                        href={country.offices[0].googleMaps}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-danger btn-sm mt-3 w-100"
                      >
                        <MapPin size={14} className="me-1" />
                        {t('offices.viewOnMap')}
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
            {countries.map((country, countryIndex) => (
              <div 
                key={countryIndex} 
                className="col-12 col-md-6"
                data-aos="fade-up"
                data-aos-delay={countryIndex * 100}
              >
                <div className="office-card">
                  <div className="office-card-header">
                    <div className="office-flag">
                      <img src={country.flag} alt={country.name} style={{width: '64px', height: '48px', objectFit: 'cover', borderRadius: '6px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)'}} />
                    </div>
                    <h3 className="office-country">{country.name}</h3>
                  </div>

                  <div className="office-card-body">
                    {country.name === 'CHILE' ? (
                      <>
                        <div className="chile-tabs mb-3">
                          {country.offices.map((office, idx) => (
                            <button
                              key={idx}
                              className={`chile-tab-btn ${activeChileTab === idx ? 'active' : ''}`}
                              onClick={() => setActiveChileTab(idx)}
                            >
                              {office.city}
                            </button>
                          ))}
                        </div>

                        <div className="office-info">
                          <div className="office-info-item">
                            <MapPin size={16} className="me-2 text-danger" />
                            <span>{country.offices[activeChileTab].address}</span>
                          </div>

                          {country.offices[activeChileTab].phone && (
                            <div className="office-info-item">
                              <Phone size={16} className="me-2 text-danger" />
                              <a href={`tel:${country.offices[activeChileTab].phone}`}>
                                {country.offices[activeChileTab].phone}
                              </a>
                            </div>
                          )}

                          <div className="office-info-item">
                            <Mail size={16} className="me-2 text-danger" />
                            <a href={`mailto:${country.offices[activeChileTab].email}`}>
                              {country.offices[activeChileTab].email}
                            </a>
                          </div>

                          <a
                            href={country.offices[activeChileTab].googleMaps}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline-danger btn-sm mt-3 w-100"
                          >
                            <MapPin size={14} className="me-1" />
                            {t('offices.viewOnMap')}
                          </a>
                        </div>
                      </>
                    ) : (
                      <div className="office-info">
                        <div className="office-info-item">
                          <MapPin size={16} className="me-2 text-danger" />
                          <span>{country.offices[0].address}</span>
                        </div>

                        {country.offices[0].phone && (
                          <div className="office-info-item">
                            <Phone size={16} className="me-2 text-danger" />
                            <a href={`tel:${country.offices[0].phone}`}>
                              {country.offices[0].phone}
                            </a>
                          </div>
                        )}

                        <div className="office-info-item">
                          <Mail size={16} className="me-2 text-danger" />
                          <a href={`mailto:${country.offices[0].email}`}>
                            {country.offices[0].email}
                          </a>
                        </div>

                        <a
                          href={country.offices[0].googleMaps}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline-danger btn-sm mt-3 w-100"
                        >
                          <MapPin size={14} className="me-1" />
                          {t('offices.viewOnMap')}
                        </a>
                      </div>
                    )}
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

export default OfficeCards;
