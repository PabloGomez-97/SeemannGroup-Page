import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Building2, 
  MapPin, 
  Users, 
  Calendar,
  CheckCircle2,
  AlertCircle,
  Send
} from 'lucide-react';
import AOS from 'aos';

const NewClientForm = () => {
  const { t } = useTranslation();
  
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease',
      once: true
    });
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    // Datos Principales
    rut: '',
    razonSocial: '',
    nombreFantasia: '',
    representanteLegal: '',
    rutRepresentante: '',
    giro: '',
    formaPago: '',
    plazo: '',
    
    // Direcciones
    direccionComercial: '',
    comunaComercial: '',
    ciudadComercial: '',
    direccionEntregaCarga: '',
    comunaEntregaCarga: '',
    ciudadEntregaCarga: '',
    direccionEntregaDoctos: '',
    comunaEntregaDoctos: '',
    ciudadEntregaDoctos: '',
    
    // Contabilidad
    nombreResponsableContabilidad: '',
    cargoContabilidad: '',
    emailContabilidad: '',
    celularContabilidad: '',
    fonoContabilidad: '',
    faxContabilidad: '',
    comexExportaciones: '',
    cargoComex: '',
    gerenteComercial: '',
    emailGerente: '',
    fonoGerente: '',
    faxGerente: '',
    
    // Datos Solicitante
    nombreSolicitante: '',
    fechaSolicitud: '',
    celularSolicitante: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');
    
    try {
      const response = await fetch('/api/send-new-client', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSubmitting(false);
        setSubmitStatus('success');
        setFormData({
          rut: '', razonSocial: '', nombreFantasia: '', representanteLegal: '',
          rutRepresentante: '', giro: '', formaPago: '', plazo: '',
          direccionComercial: '', comunaComercial: '', ciudadComercial: '',
          direccionEntregaCarga: '', comunaEntregaCarga: '', ciudadEntregaCarga: '',
          direccionEntregaDoctos: '', comunaEntregaDoctos: '', ciudadEntregaDoctos: '',
          nombreResponsableContabilidad: '', cargoContabilidad: '', emailContabilidad: '',
          celularContabilidad: '', fonoContabilidad: '', faxContabilidad: '',
          comexExportaciones: '', cargoComex: '', gerenteComercial: '',
          emailGerente: '', fonoGerente: '', faxGerente: '',
          nombreSolicitante: '', fechaSolicitud: '', celularSolicitante: ''
        });
        
        setTimeout(() => setSubmitStatus('idle'), 8000);
      } else {
        throw new Error(data.error || 'Error al enviar el formulario');
      }
    } catch (error) {
      setIsSubmitting(false);
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Error desconocido al enviar el formulario');
      
      setTimeout(() => {
        setSubmitStatus('idle');
        setErrorMessage('');
      }, 5000);
    }
  };

  return (
    <div className="new-client-form-page" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)' }}>
      {/* Hero Section */}
      <section className="py-5" style={{ 
        background: 'linear-gradient(135deg, #bd2121 0%, #8b1515 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white py-4"
          >
            <div className="d-inline-flex align-items-center justify-content-center mb-3"
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <FileText size={36} />
            </div>
            <h1 className="display-4 fw-bold mb-3">{t('newClientForm.title')}</h1>
            <p className="lead mb-0" style={{ fontSize: '1.1rem', opacity: 0.95 }}>
              {t('newClientForm.subtitle')}
            </p>
            <p className="mt-2 mb-0" style={{ fontSize: '0.95rem', opacity: 0.85 }}>
              <AlertCircle size={16} className="me-2" style={{ display: 'inline-block', verticalAlign: 'middle' }} />
              {t('newClientForm.requiredNote')}
            </p>
          </motion.div>
        </div>
        
        {/* Decorative Elements */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }} />
      </section>

      {/* Form Section */}
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              
              {/* Success Message */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="alert alert-success d-flex align-items-center mb-4 shadow-sm"
                  style={{ borderRadius: '12px', border: 'none' }}
                >
                  <CheckCircle2 className="me-3" size={24} />
                  <div>
                    <strong>{t('newClientForm.successTitle')}</strong>
                    <p className="mb-0 mt-1">{t('newClientForm.successMessage')}</p>
                  </div>
                </motion.div>
              )}

              {/* Error Message */}
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="alert alert-danger d-flex align-items-center mb-4 shadow-sm"
                  style={{ borderRadius: '12px', border: 'none' }}
                >
                  <AlertCircle className="me-3" size={24} />
                  <div>
                    <strong>{t('newClientForm.errorTitle')}</strong>
                    <p className="mb-0 mt-1">{errorMessage || t('newClientForm.errorMessage')}</p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit}>
                
                {/* DATOS PRINCIPALES */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="card border-0 shadow-sm mb-4"
                  style={{ borderRadius: '16px', overflow: 'hidden' }}
                >
                  <div className="card-header border-0 py-3" style={{ 
                    background: 'linear-gradient(135deg, #bd2121 0%, #8b1515 100%)'
                  }}>
                    <div className="d-flex align-items-center">
                      <Building2 className="text-white me-2" size={24} />
                      <h4 className="mb-0 text-white fw-semibold">{t('newClientForm.mainData.title')}</h4>
                    </div>
                  </div>
                  <div className="card-body p-4">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">{t('newClientForm.mainData.rut')} <span className="text-danger">*</span></label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          name="rut"
                          value={formData.rut}
                          onChange={handleChange}
                          required
                          placeholder={t('newClientForm.mainData.rutPlaceholder')}
                          style={{ borderRadius: '8px' }}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">{t('newClientForm.mainData.razonSocial')} <span className="text-danger">*</span></label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          name="razonSocial"
                          value={formData.razonSocial}
                          onChange={handleChange}
                          required
                          placeholder={t('newClientForm.mainData.razonSocialPlaceholder')}
                          style={{ borderRadius: '8px' }}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">{t('newClientForm.mainData.nombreFantasia')}</label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          name="nombreFantasia"
                          value={formData.nombreFantasia}
                          onChange={handleChange}
                          placeholder={t('newClientForm.mainData.nombreFantasiaPlaceholder')}
                          style={{ borderRadius: '8px' }}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">{t('newClientForm.mainData.representanteLegal')} <span className="text-danger">*</span></label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          name="representanteLegal"
                          value={formData.representanteLegal}
                          onChange={handleChange}
                          required
                          placeholder={t('newClientForm.mainData.representanteLegalPlaceholder')}
                          style={{ borderRadius: '8px' }}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">{t('newClientForm.mainData.rutRepresentante')} <span className="text-danger">*</span></label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          name="rutRepresentante"
                          value={formData.rutRepresentante}
                          onChange={handleChange}
                          required
                          placeholder={t('newClientForm.mainData.rutPlaceholder')}
                          style={{ borderRadius: '8px' }}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">{t('newClientForm.mainData.giro')} <span className="text-danger">*</span></label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          name="giro"
                          value={formData.giro}
                          onChange={handleChange}
                          required
                          placeholder={t('newClientForm.mainData.giroPlaceholder')}
                          style={{ borderRadius: '8px' }}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">{t('newClientForm.mainData.formaPago')}</label>
                        <select
                          className="form-select form-select-lg"
                          name="formaPago"
                          value={formData.formaPago}
                          onChange={handleChange}
                          style={{ borderRadius: '8px' }}
                        >
                          <option value="">{t('newClientForm.mainData.formaPagoPlaceholder')}</option>
                          <option value="contado">{t('newClientForm.mainData.formaPagoContado')}</option>
                          <option value="credito">{t('newClientForm.mainData.formaPagoCredito')}</option>
                          <option value="transferencia">{t('newClientForm.mainData.formaPagoTransferencia')}</option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">{t('newClientForm.mainData.plazo')}</label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          name="plazo"
                          value={formData.plazo}
                          onChange={handleChange}
                          placeholder={t('newClientForm.mainData.plazoPlaceholder')}
                          style={{ borderRadius: '8px' }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* DIRECCIONES */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="card border-0 shadow-sm mb-4"
                  style={{ borderRadius: '16px', overflow: 'hidden' }}
                >
                  <div className="card-header border-0 py-3" style={{ 
                    background: 'linear-gradient(135deg, #bd2121 0%, #8b1515 100%)'
                  }}>
                    <div className="d-flex align-items-center">
                      <MapPin className="text-white me-2" size={24} />
                      <h4 className="mb-0 text-white fw-semibold">{t('newClientForm.addresses.title')}</h4>
                    </div>
                  </div>
                  <div className="card-body p-4">
                    {/* Dirección Comercial */}
                    <div className="mb-4">
                      <h6 className="fw-bold mb-3 text-primary">{t('newClientForm.addresses.comercial')}</h6>
                      <div className="row g-3">
                        <div className="col-12">
                          <label className="form-label fw-semibold">{t('newClientForm.addresses.direccion')} <span className="text-danger">*</span></label>
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            name="direccionComercial"
                            value={formData.direccionComercial}
                            onChange={handleChange}
                            required
                            placeholder={t('newClientForm.addresses.direccionPlaceholder')}
                            style={{ borderRadius: '8px' }}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">{t('newClientForm.addresses.comuna')} <span className="text-danger">*</span></label>
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            name="comunaComercial"
                            value={formData.comunaComercial}
                            onChange={handleChange}
                            required
                            placeholder={t('newClientForm.addresses.comunaPlaceholder')}
                            style={{ borderRadius: '8px' }}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">{t('newClientForm.addresses.ciudad')} <span className="text-danger">*</span></label>
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            name="ciudadComercial"
                            value={formData.ciudadComercial}
                            onChange={handleChange}
                            required
                            placeholder={t('newClientForm.addresses.ciudadPlaceholder')}
                            style={{ borderRadius: '8px' }}
                          />
                        </div>
                      </div>
                    </div>

                    <hr className="my-4" />

                    {/* Entrega Carga */}
                    <div className="mb-4">
                      <h6 className="fw-bold mb-3 text-primary">{t('newClientForm.addresses.entregaCarga')}</h6>
                      <div className="row g-3">
                        <div className="col-12">
                          <label className="form-label fw-semibold">{t('newClientForm.addresses.direccion')}</label>
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            name="direccionEntregaCarga"
                            value={formData.direccionEntregaCarga}
                            onChange={handleChange}
                            placeholder={t('newClientForm.addresses.direccionPlaceholder')}
                            style={{ borderRadius: '8px' }}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">{t('newClientForm.addresses.comuna')}</label>
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            name="comunaEntregaCarga"
                            value={formData.comunaEntregaCarga}
                            onChange={handleChange}
                            placeholder={t('newClientForm.addresses.comunaPlaceholder')}
                            style={{ borderRadius: '8px' }}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">{t('newClientForm.addresses.ciudad')}</label>
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            name="ciudadEntregaCarga"
                            value={formData.ciudadEntregaCarga}
                            onChange={handleChange}
                            placeholder={t('newClientForm.addresses.ciudadPlaceholder')}
                            style={{ borderRadius: '8px' }}
                          />
                        </div>
                      </div>
                    </div>

                    <hr className="my-4" />

                    {/* Entrega Documentos */}
                    <div>
                      <h6 className="fw-bold mb-3 text-primary">{t('newClientForm.addresses.entregaDoctos')}</h6>
                      <div className="row g-3">
                        <div className="col-12">
                          <label className="form-label fw-semibold">{t('newClientForm.addresses.direccion')}</label>
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            name="direccionEntregaDoctos"
                            value={formData.direccionEntregaDoctos}
                            onChange={handleChange}
                            placeholder={t('newClientForm.addresses.direccionPlaceholder')}
                            style={{ borderRadius: '8px' }}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">{t('newClientForm.addresses.comuna')}</label>
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            name="comunaEntregaDoctos"
                            value={formData.comunaEntregaDoctos}
                            onChange={handleChange}
                            placeholder={t('newClientForm.addresses.comunaPlaceholder')}
                            style={{ borderRadius: '8px' }}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">{t('newClientForm.addresses.ciudad')}</label>
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            name="ciudadEntregaDoctos"
                            value={formData.ciudadEntregaDoctos}
                            onChange={handleChange}
                            placeholder={t('newClientForm.addresses.ciudadPlaceholder')}
                            style={{ borderRadius: '8px' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* CONTABILIDAD */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="card border-0 shadow-sm mb-4"
                  style={{ borderRadius: '16px', overflow: 'hidden' }}
                >
                  <div className="card-header border-0 py-3" style={{ 
                    background: 'linear-gradient(135deg, #bd2121 0%, #8b1515 100%)'
                  }}>
                    <div className="d-flex align-items-center">
                      <Users className="text-white me-2" size={24} />
                      <h4 className="mb-0 text-white fw-semibold">{t('newClientForm.accounting.title')}</h4>
                    </div>
                  </div>
                  <div className="card-body p-4">
                    {/* Responsable Contabilidad */}
                    <div className="mb-4">
                      <h6 className="fw-bold mb-3 text-primary">{t('newClientForm.accounting.responsableTitle')}</h6>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">{t('newClientForm.accounting.nombre')} <span className="text-danger">*</span></label>
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            name="nombreResponsableContabilidad"
                            value={formData.nombreResponsableContabilidad}
                            onChange={handleChange}
                            required
                            placeholder={t('newClientForm.accounting.nombrePlaceholder')}
                            style={{ borderRadius: '8px' }}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">{t('newClientForm.accounting.cargo')} <span className="text-danger">*</span></label>
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            name="cargoContabilidad"
                            value={formData.cargoContabilidad}
                            onChange={handleChange}
                            required
                            placeholder={t('newClientForm.accounting.cargoPlaceholder')}
                            style={{ borderRadius: '8px' }}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">{t('newClientForm.accounting.email')} <span className="text-danger">*</span></label>
                          <input
                            type="email"
                            className="form-control form-control-lg"
                            name="emailContabilidad"
                            value={formData.emailContabilidad}
                            onChange={handleChange}
                            required
                            placeholder={t('newClientForm.accounting.emailPlaceholder')}
                            style={{ borderRadius: '8px' }}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">{t('newClientForm.accounting.celular')}</label>
                          <input
                            type="tel"
                            className="form-control form-control-lg"
                            name="celularContabilidad"
                            value={formData.celularContabilidad}
                            onChange={handleChange}
                            placeholder={t('newClientForm.accounting.celularPlaceholder')}
                            style={{ borderRadius: '8px' }}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">{t('newClientForm.accounting.telefono')} <span className="text-danger">*</span></label>
                          <input
                            type="tel"
                            className="form-control form-control-lg"
                            name="fonoContabilidad"
                            value={formData.fonoContabilidad}
                            onChange={handleChange}
                            required
                            placeholder={t('newClientForm.accounting.telefonoPlaceholder')}
                            style={{ borderRadius: '8px' }}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">{t('newClientForm.accounting.fax')} <span className="text-danger">*</span></label>
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            name="faxContabilidad"
                            value={formData.faxContabilidad}
                            onChange={handleChange}
                            required
                            placeholder={t('newClientForm.accounting.faxPlaceholder')}
                            style={{ borderRadius: '8px' }}
                          />
                        </div>
                      </div>
                    </div>

                    <hr className="my-4" />

                    {/* Comex Exportaciones */}
                    <div className="mb-4">
                      <h6 className="fw-bold mb-3 text-primary">{t('newClientForm.accounting.comexTitle')}</h6>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">{t('newClientForm.accounting.comexNombre')} <span className="text-danger">*</span></label>
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            name="comexExportaciones"
                            value={formData.comexExportaciones}
                            onChange={handleChange}
                            required
                            placeholder={t('newClientForm.accounting.nombrePlaceholder')}
                            style={{ borderRadius: '8px' }}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">{t('newClientForm.accounting.comexCargo')} <span className="text-danger">*</span></label>
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            name="cargoComex"
                            value={formData.cargoComex}
                            onChange={handleChange}
                            required
                            placeholder={t('newClientForm.accounting.cargoPlaceholder')}
                            style={{ borderRadius: '8px' }}
                          />
                        </div>
                      </div>
                    </div>

                    <hr className="my-4" />

                    {/* Gerente Comercial */}
                    <div>
                      <h6 className="fw-bold mb-3 text-primary">{t('newClientForm.accounting.gerenteTitle')}</h6>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">{t('newClientForm.accounting.gerenteNombre')} <span className="text-danger">*</span></label>
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            name="gerenteComercial"
                            value={formData.gerenteComercial}
                            onChange={handleChange}
                            required
                            placeholder={t('newClientForm.accounting.nombrePlaceholder')}
                            style={{ borderRadius: '8px' }}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">{t('newClientForm.accounting.email')} <span className="text-danger">*</span></label>
                          <input
                            type="email"
                            className="form-control form-control-lg"
                            name="emailGerente"
                            value={formData.emailGerente}
                            onChange={handleChange}
                            required
                            placeholder={t('newClientForm.accounting.emailPlaceholder')}
                            style={{ borderRadius: '8px' }}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">{t('newClientForm.accounting.telefono')} <span className="text-danger">*</span></label>
                          <input
                            type="tel"
                            className="form-control form-control-lg"
                            name="fonoGerente"
                            value={formData.fonoGerente}
                            onChange={handleChange}
                            required
                            placeholder={t('newClientForm.accounting.telefonoPlaceholder')}
                            style={{ borderRadius: '8px' }}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">{t('newClientForm.accounting.fax')} <span className="text-danger">*</span></label>
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            name="faxGerente"
                            value={formData.faxGerente}
                            onChange={handleChange}
                            required
                            placeholder={t('newClientForm.accounting.faxPlaceholder')}
                            style={{ borderRadius: '8px' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* DATOS SOLICITANTE */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="card border-0 shadow-sm mb-4"
                  style={{ borderRadius: '16px', overflow: 'hidden' }}
                >
                  <div className="card-header border-0 py-3" style={{ 
                    background: 'linear-gradient(135deg, #bd2121 0%, #8b1515 100%)'
                  }}>
                    <div className="d-flex align-items-center">
                      <Calendar className="text-white me-2" size={24} />
                      <h4 className="mb-0 text-white fw-semibold">{t('newClientForm.applicant.title')}</h4>
                    </div>
                  </div>
                  <div className="card-body p-4">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">{t('newClientForm.applicant.nombre')} <span className="text-danger">*</span></label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          name="nombreSolicitante"
                          value={formData.nombreSolicitante}
                          onChange={handleChange}
                          required
                          placeholder={t('newClientForm.applicant.nombrePlaceholder')}
                          style={{ borderRadius: '8px' }}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">{t('newClientForm.applicant.fecha')}</label>
                        <input
                          type="date"
                          className="form-control form-control-lg"
                          name="fechaSolicitud"
                          value={formData.fechaSolicitud}
                          onChange={handleChange}
                          style={{ borderRadius: '8px' }}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">{t('newClientForm.applicant.celular')} <span className="text-danger">*</span></label>
                        <input
                          type="tel"
                          className="form-control form-control-lg"
                          name="celularSolicitante"
                          value={formData.celularSolicitante}
                          onChange={handleChange}
                          required
                          placeholder={t('newClientForm.accounting.celularPlaceholder')}
                          style={{ borderRadius: '8px' }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-center mt-4"
                >
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-danger btn-lg px-5 py-3 shadow-lg"
                    style={{
                      borderRadius: '12px',
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      minWidth: '250px',
                      background: isSubmitting 
                        ? '#6c757d' 
                        : 'linear-gradient(135deg, #bd2121 0%, #8b1515 100%)',
                      border: 'none',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        {t('newClientForm.submitting')}
                      </>
                    ) : (
                      <>
                        <Send size={20} className="me-2" style={{ display: 'inline-block', verticalAlign: 'middle' }} />
                        {t('newClientForm.submitButton')}
                      </>
                    )}
                  </button>
                  <p className="text-muted mt-3 mb-0" style={{ fontSize: '0.9rem' }}>
                    {t('newClientForm.privacyNote')}
                  </p>
                </motion.div>

              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewClientForm;

