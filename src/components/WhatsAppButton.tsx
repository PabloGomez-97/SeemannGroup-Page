import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  // Número de WhatsApp de Seemann (ajustar al real)
  const whatsappNumber = '+56226048386'; // Cambiar por el número real
  const message = encodeURIComponent('Hola, me gustaría obtener información sobre sus servicios logísticos.');

  const handleClick = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <motion.button
      className="whatsapp-float-button"
      onClick={handleClick}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={28} />
      <span className="whatsapp-pulse"></span>
    </motion.button>
  );
};

export default WhatsAppButton;

