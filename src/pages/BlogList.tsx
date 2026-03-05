import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getBlogPosts } from "../services/contentful";
import { Asset } from "contentful";
import { Calendar, User, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { es, enUS } from "date-fns/locale";
import AOS from "aos";

const BlogList = () => {
  const { t, i18n } = useTranslation();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Function to normalize Unicode fancy/italic characters to regular text
  const normalizeText = (text: string): string => {
    if (!text) return text;

    // Map of Unicode fancy characters to normal characters
    const fancyToNormal: { [key: string]: string } = {
      // Mathematical Bold Italic
      "𝙇": "L",
      "𝙤": "o",
      "𝙜": "g",
      "𝙞": "i",
      "𝙨": "s",
      "𝙩": "t",
      "𝙘": "c",
      "𝙖": "a",
      "𝙙": "d",
      "𝙚": "e",
      "𝙢": "m",
      "𝙥": "p",
      "𝙧": "r",
      "𝙮": "y",
      "𝙗": "b",
      "𝙣": "n",
      "𝙡": "l",
      "𝙛": "f",
    };

    return text
      .split("")
      .map((char) => fancyToNormal[char] || char)
      .join("");
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease",
      delay: 0,
    });
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const blogPosts = await getBlogPosts(20);
      setPosts(blogPosts);
      setLoading(false);
    };

    fetchPosts();
    window.scrollTo(0, 0);
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const locale = i18n.language === "es" ? es : enUS;
    return format(date, "dd MMMM yyyy", { locale });
  };

  return (
    <div className="site-wrap">
      {/* Hero Section - Modern & Minimalist */}
      <div
        className="position-relative overflow-hidden"
        style={{
          background: "var(--primary-color)",
          paddingTop: "80px",
          paddingBottom: "80px",
        }}
      >
        <div className="container position-relative">
          <div className="row align-items-center justify-content-center text-center">
            <div className="col-lg-8">
              <div>
                <span
                  className="d-inline-block mb-3 px-4 py-2"
                  style={{
                    fontSize: "0.75rem",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "rgba(255, 255, 255, 0.9)",
                    background: "rgba(255, 255, 255, 0.15)",
                    borderRadius: "20px",
                    fontWeight: "600",
                  }}
                >
                  {t("blog.subtitle", "Noticias y Novedades")}
                </span>
                <h1
                  className="mb-3 text-white"
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: "700",
                    lineHeight: "1.2",
                  }}
                >
                  {t("blog.title", "Nuestros Insights")}
                </h1>
                <p
                  className="text-white mb-0"
                  style={{
                    fontSize: "1rem",
                    opacity: "0.9",
                    maxWidth: "560px",
                    margin: "0 auto",
                    lineHeight: "1.6",
                  }}
                >
                  {t(
                    "blog.description",
                    "Mantente informado con las últimas novedades del comercio internacional y la logística global",
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="site-section bg-light py-5">
        <div className="container">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-5">
              <h3>{t("blog.noPosts")}</h3>
              <p>{t("blog.noPostsMessage")}</p>
            </div>
          ) : (
            <div className="row g-4">
              {posts.map((post: any) => {
                const {
                  title,
                  slug,
                  author,
                  publishDate,
                  featuredImage,
                  excerpt,
                  category,
                } = post.fields;
                const imageAsset = featuredImage as Asset | undefined;
                const imageUrl = imageAsset?.fields?.file?.url
                  ? `https:${imageAsset.fields.file.url}`
                  : "/images/default-blog.jpg";

                return (
                  <div key={post.sys.id} className="col-lg-4 col-md-6">
                    <article className="blog-card">
                      <Link
                        to={`/insights/${slug}`}
                        className="blog-card-image-link"
                      >
                        <div
                          className="blog-card-image"
                          style={{ backgroundImage: `url(${imageUrl})` }}
                        >
                          {category && (
                            <span className="blog-card-category">
                              {category}
                            </span>
                          )}
                        </div>
                      </Link>

                      <div className="blog-card-content">
                        <div className="blog-card-meta">
                          {publishDate && (
                            <span className="blog-meta-item">
                              <Calendar size={14} />
                              {formatDate(publishDate)}
                            </span>
                          )}
                          {author && (
                            <span className="blog-meta-item">
                              <User size={14} />
                              {author}
                            </span>
                          )}
                        </div>

                        <h3 className="blog-card-title">
                          <Link to={`/insights/${slug}`}>
                            {normalizeText(title)}
                          </Link>
                        </h3>

                        {excerpt && (
                          <p className="blog-card-excerpt">{excerpt}</p>
                        )}

                        <Link
                          to={`/insights/${slug}`}
                          className="blog-card-link"
                        >
                          {t("blog.readMore")}
                          <ArrowRight size={16} className="ms-2" />
                        </Link>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
