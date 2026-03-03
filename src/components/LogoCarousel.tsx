import { useTranslation } from 'react-i18next';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const LogoCarousel = () => {
  const { t } = useTranslation();

  const settings = {
    dots: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: 'linear',
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2.5,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.5,
        }
      }
    ]
  };

  const logos = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="logo-carousel-section py-5 bg-light">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center mb-4">
            <div className="block-heading-1" data-aos="fade-up">
              <span>{t('logoCarousel.subtitle')}</span>
              <h2 style={{ color: '#000' }}>{t('logoCarousel.title')}</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Slider {...settings}>
              {logos.map((num) => (
                <div key={num} className="logo-slide-item">
                  <div className="logo-wrapper">
                    <img
                      src={`/images/train/${num}.png`}
                      alt={`Partner ${num}`}
                      className="img-fluid"
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoCarousel;
