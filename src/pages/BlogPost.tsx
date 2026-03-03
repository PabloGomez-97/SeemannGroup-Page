import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getBlogPostBySlug } from '../services/contentful';
import { Asset } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { Calendar, User, ArrowLeft, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { es, enUS } from 'date-fns/locale';
import AOS from 'aos';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const [post, setPost] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Function to normalize Unicode fancy/italic characters to regular text
  const normalizeText = (text: string): string => {
    if (!text) return text;
    
    // Map of Unicode Mathematical Bold Italic characters to normal characters
    const fancyToNormal: { [key: string]: string } = {
      '𝙇': 'L', '𝙤': 'o', '𝙜': 'g', '𝙞': 'i', '𝙨': 's', '𝙩': 't', '𝙘': 'c', '𝙖': 'a',
      '𝙙': 'd', '𝙚': 'e', '𝙢': 'm', '𝙥': 'p', '𝙧': 'r', '𝙮': 'y', '𝙗': 'b', '𝙣': 'n', '𝙡': 'l', '𝙛': 'f'
    };
    
    return text.split('').map(char => fancyToNormal[char] || char).join('');
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease',
      delay: 0
    });
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      
      setLoading(true);
      const blogPost = await getBlogPostBySlug(slug);
      setPost(blogPost);
      setLoading(false);
      window.scrollTo(0, 0);
    };

    fetchPost();
  }, [slug]);

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const locale = i18n.language === 'es' ? es : enUS;
    return format(date, 'dd MMMM yyyy', { locale });
  };

  const richTextOptions = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_node: any, children: any) => (
        <p className="blog-content-paragraph">{children}</p>
      ),
      [BLOCKS.HEADING_1]: (_node: any, children: any) => (
        <h1 className="blog-content-h1">{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (_node: any, children: any) => (
        <h2 className="blog-content-h2">{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (_node: any, children: any) => (
        <h3 className="blog-content-h3">{children}</h3>
      ),
      [BLOCKS.UL_LIST]: (_node: any, children: any) => (
        <ul className="blog-content-ul">{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (_node: any, children: any) => (
        <ol className="blog-content-ol">{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (_node: any, children: any) => (
        <li className="blog-content-li">{children}</li>
      ),
      [BLOCKS.QUOTE]: (_node: any, children: any) => (
        <blockquote className="blog-content-quote">{children}</blockquote>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const { file, title } = node.data.target.fields;
        return (
          <img
            src={`https:${file.url}`}
            alt={title || 'Blog image'}
            className="blog-content-image img-fluid rounded my-4"
          />
        );
      },
      [INLINES.HYPERLINK]: (node: any, children: any) => (
        <a href={node.data.uri} target="_blank" rel="noopener noreferrer" className="blog-content-link">
          {children}
        </a>
      ),
    },
  };

  if (loading) {
    return (
      <div className="site-wrap">
        <div className="container py-5">
          <div className="text-center" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="site-wrap">
        <div className="container py-5">
          <div className="text-center" style={{ minHeight: '60vh' }}>
            <h1 className="mb-4">{t('blog.notFound')}</h1>
            <p className="mb-4">{t('blog.notFoundMessage')}</p>
            <Link to="/insights" className="btn btn-primary">
              <ArrowLeft size={16} className="me-2" />
              {t('blog.backToBlog')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { title, author, publishDate, featuredImage, content, category } = post.fields;
  const imageAsset = featuredImage as Asset | undefined;
  const imageUrl = imageAsset?.fields?.file?.url 
    ? `https:${imageAsset.fields.file.url}` 
    : null;

  return (
    <div className="site-wrap">
      {imageUrl && (
        <div 
          className="blog-post-hero"
          style={{ backgroundImage: `url(${imageUrl})` }}
          data-aos="fade"
        >
          <div className="blog-post-hero-overlay"></div>
        </div>
      )}

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-8">
            
            <div className="blog-post-back" data-aos="fade-up">
              <Link to="/insights" className="blog-back-link">
                <ArrowLeft size={18} />
                {t('blog.backToBlog')}
              </Link>
            </div>

            <article className="blog-post-article">
              <header className="blog-post-header" data-aos="fade-up">
                {category && (
                  <span className="blog-post-category">
                    <Tag size={14} />
                    {category}
                  </span>
                )}
                
                <h1 className="blog-post-title">{normalizeText(title)}</h1>

                <div className="blog-post-meta">
                  {publishDate && (
                    <span className="blog-post-meta-item">
                      <Calendar size={16} />
                      {formatDate(publishDate)}
                    </span>
                  )}
                  {author && (
                    <span className="blog-post-meta-item">
                      <User size={16} />
                      {author}
                    </span>
                  )}
                </div>
              </header>

              <div className="blog-post-content" data-aos="fade-up" data-aos-delay="100">
                {documentToReactComponents(content, richTextOptions)}
              </div>

              <div className="blog-post-share" data-aos="fade-up">
                <p className="mb-3">{t('blog.shareArticle')}</p>
                <div className="blog-share-buttons">
                  <a 
                    href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="blog-share-btn"
                  >
                    <i className="fab fa-facebook"></i>
                  </a>
                  <a 
                    href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="blog-share-btn"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a 
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="blog-share-btn"
                  >
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a 
                    href={`https://wa.me/?text=${title} ${window.location.href}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="blog-share-btn"
                  >
                    <i className="fab fa-whatsapp"></i>
                  </a>
                </div>
              </div>

              <div className="blog-post-footer" data-aos="fade-up">
                <Link to="/insights" className="btn btn-outline-danger">
                  <ArrowLeft size={16} className="me-2" />
                  {t('blog.backToBlog')}
                </Link>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
