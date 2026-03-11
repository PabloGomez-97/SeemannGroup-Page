import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowLeft } from "lucide-react";

const ThankYou = () => {
  const { t } = useTranslation();

  return (
    <div
      className="thank-you-page"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0a1628 0%, #1a2d4a 100%)",
        color: "white",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ maxWidth: 600 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          style={{ marginBottom: "1.5rem" }}
        >
          <CheckCircle2 size={80} color="#28a745" />
        </motion.div>

        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
          {t("thankYou.title", "¡Muchas gracias por contactarnos!")}
        </h1>

        <p style={{ fontSize: "1.2rem", opacity: 0.9, marginBottom: "2rem" }}>
          {t(
            "thankYou.message",
            "Uno de nuestros ejecutivos se contactará con usted prontamente.",
          )}
        </p>

        <Link
          to="/"
          className="btn btn-outline-light btn-lg"
          style={{ borderRadius: "50px", padding: "0.75rem 2rem" }}
        >
          <ArrowLeft size={20} className="me-2" />
          {t("thankYou.backHome", "Volver al Inicio")}
        </Link>
      </motion.div>
    </div>
  );
};

export default ThankYou;
