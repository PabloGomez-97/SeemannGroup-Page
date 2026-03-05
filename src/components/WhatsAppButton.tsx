import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const whatsappNumber = "+56226048386";
  const message = encodeURIComponent(
    "Hola, me gustaría obtener información sobre sus servicios logísticos.",
  );

  const handleClick = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  return (
    <button
      className="whatsapp-float-button"
      onClick={handleClick}
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={26} />
    </button>
  );
};

export default WhatsAppButton;
