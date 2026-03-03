import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Calendar, Eye, TrendingUp, Clock } from 'lucide-react';
import { getRecentPosts } from '../services/contentful';
import { Asset } from 'contentful';
import { format } from 'date-fns';
import { es, enUS } from 'date-fns/locale';

const InsightsHero = () => {
  const { t, i18n } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      const insights = await getRecentPosts(5); // Máximo 5 últimos posts
      setPosts(insights);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (posts.length === 0) return;
    
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % posts.length);
    }, 7000); // Cambio cada 7 segundos

    return () => clearInterval(interval);
  }, [posts.length, currentSlide]); // Se resetea cuando cambia currentSlide manualmente

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % posts.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + posts.length) % posts.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const locale = i18n.language === 'es' ? es : enUS;
    return format(date, 'dd MMM yyyy', { locale });
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  if (loading) {
    return (
      <div className="insights-hero-loading" style={{ height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)' }}>
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    // Fallback: Mostrar CTA simple si no hay posts
    return (
      <div className="insights-hero-fallback">
        <div 
          className="position-relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #bd2121 0%, #8b1515 100%)',
            paddingTop: '120px',
            paddingBottom: '120px'
          }}
        >
          <div className="container">
            <div className="row align-items-center justify-content-center text-center">
              <div className="col-lg-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1 className="display-3 fw-bold text-white mb-4">
                    {t('hero.welcome', 'Conectamos tu negocio con el mundo')}
                  </h1>
                  <p className="lead text-white mb-5" style={{ opacity: 0.9 }}>
                    {t('hero.experience', 'Experiencia comprobada en logística internacional')}
                  </p>
                  <div className="d-flex gap-3 justify-content-center flex-wrap">
                    <Link to="/team">
                      <motion.button
                        className="btn btn-light btn-lg px-5 py-3"
                        whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
                        whileTap={{ scale: 0.95 }}
                        style={{ fontWeight: '600', fontSize: '1.1rem' }}
                      >
                        {t('hero.quoteBtn', 'Solicitar Cotización')}
                        <ArrowRight className="ms-2" size={20} />
                      </motion.button>
                    </Link>
                  </div>
                  <p className="text-white mt-4" style={{ opacity: 0.8, fontSize: '0.95rem' }}>
                    {t('hero.clientPortalMessage', 'Si eres un cliente de Seemann, entra al')}{' '}
                    <a 
                      href="https://portalclientes.seemanngroup.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white fw-bold"
                      style={{ textDecoration: 'underline' }}
                    >
                      {t('hero.clientPortal', 'Portal de Clientes')}
                    </a>
                    {' '}{t('hero.quoteNow', 'para Cotizar Ahora')}
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentPost = posts[currentSlide];
  const { title, slug, publishDate, featuredImage, excerpt, category } = currentPost.fields;
  const imageAsset = featuredImage as Asset | undefined;
  const imageUrl = imageAsset?.fields?.file?.url 
    ? `https:${imageAsset.fields.file.url}` 
    : '/images/default-blog.jpg';

  return (
    <div className="insights-hero-section">
      <div className="position-relative overflow-hidden" style={{ height: '70vh', minHeight: '550px', maxHeight: '650px' }}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.4 }
            }}
            className="position-absolute top-0 start-0 w-100 h-100"
          >
            {/* Background Image con overlay gradiente */}
            <div 
              className="position-absolute top-0 start-0 w-100 h-100"
              style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'brightness(0.5)'
              }}
            />
            
            {/* Overlay gradiente oscuro para legibilidad */}
            <div 
              className="position-absolute top-0 start-0 w-100 h-100"
              style={{
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)'
              }}
            />

            {/* Contenido */}
            <div className="container position-relative h-100">
              <div className="row align-items-center h-100">
                <div className="col-lg-8 offset-lg-2">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-center text-white"
                  >
                    {/* Badge de categoría o "Nuevo Insight" */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4, type: 'spring', stiffness: 500 }}
                      className="mb-4"
                    >
                      <span 
                        className="d-inline-flex align-items-center gap-2 px-4 py-2"
                        style={{
                          background: 'rgba(189, 33, 33, 0.9)',
                          borderRadius: '50px',
                          fontSize: '0.85rem',
                          fontWeight: '700',
                          letterSpacing: '1px',
                          textTransform: 'uppercase',
                          boxShadow: '0 4px 20px rgba(189, 33, 33, 0.5)',
                          backdropFilter: 'blur(10px)'
                        }}
                      >
                        <TrendingUp size={16} />
                        {category || t('insights.newInsight', 'Nuevo Insight')}
                      </span>
                    </motion.div>

                    {/* Título del post */}
                    <h1 
                      className="display-4 fw-bold mb-4"
                      style={{
                        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                        lineHeight: '1.2',
                        textShadow: '2px 4px 8px rgba(0,0,0,0.3)'
                      }}
                    >
                      {title}
                    </h1>

                    {/* Excerpt */}
                    {excerpt && (
                      <p 
                        className="lead mb-4"
                        style={{
                          fontSize: '1.2rem',
                          opacity: 0.95,
                          maxWidth: '700px',
                          margin: '0 auto 2rem',
                          textShadow: '1px 2px 4px rgba(0,0,0,0.5)'
                        }}
                      >
                        {excerpt}
                      </p>
                    )}

                    {/* Meta info */}
                    <div className="d-flex align-items-center justify-content-center gap-4 mb-5">
                      {publishDate && (
                        <div className="d-flex align-items-center gap-2">
                          <Calendar size={18} />
                          <span style={{ fontSize: '0.95rem' }}>{formatDate(publishDate)}</span>
                        </div>
                      )}
                      <div className="d-flex align-items-center gap-2">
                        <Eye size={18} />
                        <span style={{ fontSize: '0.95rem' }}>{t('insights.readTime', '5 min lectura')}</span>
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="d-flex gap-3 justify-content-center flex-wrap">
                      <Link to={`/insights/${slug}`}>
                        <motion.button
                          className="btn btn-light btn-lg px-5 py-3"
                          whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(255,255,255,0.3)' }}
                          whileTap={{ scale: 0.95 }}
                          style={{ 
                            fontWeight: '700',
                            fontSize: '1rem',
                            borderRadius: '50px',
                            border: 'none'
                          }}
                        >
                          {t('insights.readFull', 'Leer Insight Completo')}
                          <ArrowRight className="ms-2" size={20} />
                        </motion.button>
                      </Link>
                      
                      <Link to="/insights">
                        <motion.button
                          className="btn btn-outline-light btn-lg px-5 py-3"
                          whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.1)' }}
                          whileTap={{ scale: 0.95 }}
                          style={{ 
                            fontWeight: '600',
                            fontSize: '1rem',
                            borderRadius: '50px',
                            borderWidth: '2px'
                          }}
                        >
                          {t('insights.seeAll', 'Ver Todos los Insights')}
                        </motion.button>
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controles de navegación */}
        <div className="position-absolute top-50 start-0 translate-middle-y w-100" style={{ zIndex: 10 }}>
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <motion.button
                onClick={prevSlide}
                className="btn btn-light rounded-circle p-3"
                whileHover={{ scale: 1.1, boxShadow: '0 5px 20px rgba(255,255,255,0.3)' }}
                whileTap={{ scale: 0.9 }}
                style={{ 
                  width: '60px', 
                  height: '60px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <ChevronLeft size={28} />
              </motion.button>

              <motion.button
                onClick={nextSlide}
                className="btn btn-light rounded-circle p-3"
                whileHover={{ scale: 1.1, boxShadow: '0 5px 20px rgba(255,255,255,0.3)' }}
                whileTap={{ scale: 0.9 }}
                style={{ 
                  width: '60px', 
                  height: '60px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <ChevronRight size={28} />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Dots indicadores */}
        <div 
          className="position-absolute bottom-0 start-50 translate-middle-x mb-4"
          style={{ zIndex: 10 }}
        >
          <div className="d-flex gap-2">
            {posts.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className="rounded-pill"
                whileHover={{ scale: 1.2 }}
                style={{
                  width: currentSlide === index ? '40px' : '12px',
                  height: '12px',
                  background: currentSlide === index ? '#bd2121' : 'rgba(255, 255, 255, 0.5)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: currentSlide === index ? '0 0 10px rgba(189, 33, 33, 0.8)' : 'none'
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Sección de CTA permanente debajo del hero - Diseño mejorado */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="position-relative"
        style={{
          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
          padding: '30px 0',
          marginTop: '-1px'
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 mb-3 mb-lg-0">
              <div className="d-flex align-items-center gap-3 mb-2">
                <div 
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <Clock size={26} className="text-white" />
                </div>
                <div>
                  <h3 className="text-white mb-1 fw-bold" style={{ fontSize: '1.5rem' }}>
                    {t('hero.saveTime', 'Ahorra Tiempo, Optimiza tu Logística')}
                  </h3>
                  <p className="text-white mb-0" style={{ opacity: 0.9, fontSize: '0.95rem' }}>
                    {t('hero.saveTimeDescription', 'Con Seemann Group, ganas velocidad y eficiencia en cada envío')}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-lg-5 text-lg-end">
              <div className="d-flex gap-3 justify-content-lg-end justify-content-center flex-wrap align-items-stretch">
                <Link to="/team" style={{ textDecoration: 'none' }}>
                  <motion.button
                    className="btn btn-light px-5 py-3 d-flex align-items-center"
                    whileHover={{ 
                      scale: 1.08, 
                      boxShadow: '0 12px 35px rgba(255,255,255,0.4)',
                      y: -3
                    }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      boxShadow: [
                        '0 8px 25px rgba(255,255,255,0.3)',
                        '0 12px 30px rgba(255,255,255,0.5)',
                        '0 8px 25px rgba(255,255,255,0.3)'
                      ]
                    }}
                    transition={{
                      boxShadow: {
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }
                    }}
                    style={{ 
                      fontWeight: '800',
                      fontSize: '1.1rem',
                      borderRadius: '50px',
                      border: 'none',
                      boxShadow: '0 8px 25px rgba(255,255,255,0.3)',
                      background: '#ffffff',
                      color: '#ef4444'
                    }}
                  >
                    {t('hero.quoteBtn', 'Cotizar Ahora')}
                    <ArrowRight className="ms-2" size={20} />
                  </motion.button>
                </Link>
                
                <motion.a
                  href="https://portalclientes.seemanngroup.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn px-4 py-3 d-flex flex-column align-items-center justify-content-center"
                  whileHover={{ 
                    scale: 1.05,
                    background: 'rgba(255, 255, 255, 0.25)',
                    y: -3
                  }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    border: '2px solid rgba(255, 255, 255, 0.9)',
                    borderRadius: '15px',
                    textDecoration: 'none',
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(10px)',
                    minWidth: '180px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <span 
                    className="text-white fw-normal" 
                    style={{ fontSize: '0.85rem', opacity: 0.95, marginBottom: '4px' }}
                  >
                    {t('hero.clientMessage', '¿Ya eres cliente?')}
                  </span>
                  <span 
                    className="text-white fw-bold d-flex align-items-center gap-1" 
                    style={{ fontSize: '1rem' }}
                  >
                    {t('hero.clientPortal', 'Portal de Clientes')}
                    <ArrowRight size={16} />
                  </span>
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InsightsHero;

