import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

interface LanguageSwitcherProps {
  variant?: "default" | "navbar";
}

const LanguageSwitcher = ({ variant = "default" }: LanguageSwitcherProps) => {
  const { i18n } = useTranslation();

  const currentLanguage = i18n.language;
  const isEnglish = currentLanguage === "en";

  const toggleLanguage = () => {
    const newLang = isEnglish ? "es" : "en";
    i18n.changeLanguage(newLang);
  };

  if (variant === "navbar") {
    return (
      <button
        onClick={toggleLanguage}
        className="navbar-utility-link"
        aria-label="Change language"
        title={isEnglish ? "Cambiar a Español" : "Switch to English"}
      >
        <Globe size={16} strokeWidth={1.5} />
        <span>{isEnglish ? "EN" : "ES"}</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleLanguage}
      aria-label="Change language"
      title={isEnglish ? "Cambiar a Español" : "Switch to English"}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "8px 14px",
        border: "1px solid #dee2e6",
        borderRadius: "20px",
        background: "white",
        color: "#333",
        fontSize: "0.9rem",
        fontWeight: "500",
        cursor: "pointer",
        transition: "all 0.3s ease",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#f8f9fa";
        e.currentTarget.style.borderColor = "#1a1a1a";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "white";
        e.currentTarget.style.borderColor = "#dee2e6";
      }}
    >
      <Globe size={16} />
      <span>{isEnglish ? "English" : "Español"}</span>
    </button>
  );
};

export default LanguageSwitcher;
