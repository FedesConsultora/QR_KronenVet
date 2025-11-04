import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

const slides = [
  { link: 'https://kronenvet.com.ar/?IdArt=06850', img: '/assets/images/ofertas/OM 1.png', alt: 'Oferta 1'},
  { link: 'https://kronenvet.com.ar/?IdArt=02520', img: '/assets/images/ofertas/OM 2.png', alt: 'Oferta 2' },
  { link: 'https://kronenvet.com.ar/?IdArt=03449', img: '/assets/images/ofertas/OM 3.png', alt: 'Oferta 3' },
  { link: 'https://kronenvet.com.ar/?Find=ceva', img: '/assets/images/ofertas/OM 4.png', alt: 'Oferta 4' },
  { link: 'https://kronenvet.com.ar/?Find=oxifenac', img: '/assets/images/ofertas/OM 5.png', alt: 'Oferta 5' },
  { link: 'https://kronenvet.com.ar/?Find=tilmicovet', img: '/assets/images/ofertas/OM 6.png', alt: 'Oferta 6' },
  { link: 'https://kronenvet.com.ar/?IdArt=03411', img: '/assets/images/ofertas/OM 7.png', alt: 'Oferta 7' },
  { link: 'https://kronenvet.com.ar/?Find=vermex', img: '/assets/images/ofertas/OM 8.png', alt: 'Oferta 8' },
  { link: 'https://kronenvet.com.ar/?Find=prednovet', img: '/assets/images/ofertas/OM 9.png', alt: 'Oferta 9'},
  { link: 'https://kronenvet.com.ar/?IdArt=07748', img: '/assets/images/ofertas/OM 10.png', alt: 'Oferta 10' },
  { link: 'https://kronenvet.com.ar/?Find=aprax', img: '/assets/images/ofertas/OM 11.png', alt: 'Oferta 11' },
  { link: 'https://kronenvet.com.ar/?Find=fleanet', img: '/assets/images/ofertas/OM 12.png', alt: 'Oferta 12' },
  { link: 'https://kronenvet.com.ar/?IdArt=07280', img: '/assets/images/ofertas/OM 13.png', alt: 'Oferta 13' },
  { link: 'https://kronenvet.com.ar/?IdArt=05259', img: '/assets/images/ofertas/OM 14.png', alt: 'Oferta 14' },
  { link: 'https://kronenvet.com.ar/?Find=aprax%20ectopills', img: '/assets/images/ofertas/OM 15.png', alt: 'Oferta 15' },
  { link: 'https://kronenvet.com.ar/?Find=wondercat%20arena', img: '/assets/images/ofertas/OM 16.png', alt: 'Oferta 16' },
  { link: 'https://kronenvet.com.ar/?Find=big%20love', img: '/assets/images/ofertas/OM 17.png', alt: 'Oferta 17' },
  { link: 'https://kronenvet.com.ar/?Find=big%20love', img: '/assets/images/ofertas/OM 18.png', alt: 'Oferta 18' },
  { link: 'https://kronenvet.com.ar/?Find=t.i.u', img: '/assets/images/ofertas/OM 19.png', alt: 'Oferta 19' },
  { link: 'https://kronenvet.com.ar/?Find=fawna', img: '/assets/images/ofertas/OM 20.png', alt: 'Oferta 20' },
  { link: 'https://kronenvet.com.ar/index.html?Find=old%20prince', img: '/assets/images/ofertas/OM 21.png', alt: 'Oferta 21' },
  { link: 'https://kronenvet.com.ar/index.html?Find=Kualcos', img: '/assets/images/ofertas/OM 22.png', alt: 'Oferta 22' },
  { link: 'https://kronenvet.com.ar/index.html?Find=Kualcos', img: '/assets/images/ofertas/OM 23.png', alt: 'Oferta 23' },
  { link: 'https://kronenvet.com.ar/index.html?Find=Power%20Ultra', img: '/assets/images/ofertas/OM 24.png', alt: 'Oferta 24' },
  { link: 'https://kronenvet.com.ar/index.html?Find=Power%20comprimidos', img: '/assets/images/ofertas/OM 25.png', alt: 'Oferta 25' },
  { link: 'https://kronenvet.com.ar/index.html?Find=Power%20Gold', img: '/assets/images/ofertas/OM 26.png', alt: 'Oferta 26' },
  { link: 'https://kronenvet.com.ar/index.html?Find=Power%20Gold', img: '/assets/images/ofertas/OM 27.png', alt: 'Oferta 27' },
  { link: 'https://kronenvet.com.ar/index.html?IdArt=02482', img: '/assets/images/ofertas/OM 28.png', alt: 'Oferta 28' },
  { link: 'https://kronenvet.com.ar/index.html?Find=cidar', img: '/assets/images/ofertas/OM 29.png', alt: 'Oferta 29' },
  { link: 'https://kronenvet.com.ar/index.html?Find=cidar', img: '/assets/images/ofertas/OM 30.png', alt: 'Oferta 30'},
  { link: 'https://kronenvet.com.ar/index.html?Find=recombitek', img: '/assets/images/ofertas/OM 31.png', alt: 'Oferta 31' },
  { link: 'https://kronenvet.com.ar/index.html?Find=Power%20Ultra', img: '/assets/images/ofertas/OM 32.png', alt: 'Oferta 32' },
  { link: 'https://kronenvet.com.ar/index.html?Find=Power%20Ultra', img: '/assets/images/ofertas/OM 33.png', alt: 'Oferta 33' },
  { link: 'https://kronenvet.com.ar/index.html?IdArt=06396', img: '/assets/images/ofertas/OM 34.png', alt: 'Oferta 34' },
  { link: 'https://kronenvet.com.ar/index.html?Find=brouwer', img: '/assets/images/ofertas/OM 35.png', alt: 'Oferta 35' },
  { link: 'https://kronenvet.com.ar/index.html?Find=terravet', img: '/assets/images/ofertas/OM 36.png', alt: 'Oferta 36' },
  { link: 'https://kronenvet.com.ar/index.html?Find=tipertox', img: '/assets/images/ofertas/OM 37.png', alt: 'Oferta 37'},
  { link: 'https://kronenvet.com.ar/index.html?Find=bactrovet', img: '/assets/images/ofertas/OM 38.png', alt: 'Oferta 38' },
  { link: 'https://kronenvet.com.ar/index.html?Find=glypondin', img: '/assets/images/ofertas/OM 39.png', alt: 'Oferta 39' },
  { link: 'https://kronenvet.com.ar/index.html?Find=glypondin', img: '/assets/images/ofertas/OM 40.png', alt: 'Oferta 40' },
  { link: 'https://kronenvet.com.ar/index.html?Find=kuramicina', img: '/assets/images/ofertas/OM 41.png', alt: 'Oferta 41'},
  { link: 'https://kronenvet.com.ar/index.html?Find=ricoverm', img: '/assets/images/ofertas/OM 42.png', alt: 'Oferta 42' },
  { link: 'https://kronenvet.com.ar/index.html?Find=dkl', img: '/assets/images/ofertas/OM 43.png', alt: 'Oferta 43' }
];

const Ofertas = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <main className="landing-container">
      <section className="navContainer">
        <button className="btnBack" onClick={handleBack}>
          <img src="/assets/icons/iconoAtras.png" alt="Flecha atrás" />
        </button>

        <div className="carousel">
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={10} 
            slidesPerView={1}
            breakpoints={{
              1024: {
                slidesPerView: 3,
              }
            }}
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index} className="carousel-item">
                <a href={slide.link} target="_blank" rel="noreferrer">
                  <img src={slide.img} alt={slide.alt} />
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="border"></div>
      </section>

      <section className="socialMedia">
        <ul className="navSocial">
          <a href="https://www.instagram.com/kronenvet/" target="_blank" rel="noreferrer"><li><img src="/assets/icons/iconoInstagram.png" alt="Instagram kronen"/></li></a>
          <a href="https://www.linkedin.com/company/kronenvet" target="_blank" rel="noreferrer"><li><img src="/assets/icons/iconoLinkedin.png" alt="LinkedIn kronen" /></li></a>
          <a href="https://www.facebook.com/kronenvet" target="_blank" rel="noreferrer"><li><img src="/assets/icons/iconoFacebook.png" alt="Facebook kronen"/></li></a>
          <a href="https://www.kronenvet.com.ar/" target="_blank" rel="noreferrer"><li><img src="/assets/icons/iconoWeb.png" alt="Web kronen"/></li></a>
          <a href="https://apps.apple.com/ar/app/mikvet/id1473814533" target="_blank" rel="noreferrer"><li><img src="/assets/icons/iconoAppStore.png" alt="App Store kronen"/></li></a>
          <a href="https://play.google.com/store/apps/details?id=com.app.kronenvet" target="_blank" rel="noreferrer"><li><img src="/assets/icons/iconoGooglePlay.png" alt="Google Play kronen"/></li></a>
        </ul>
      </section>
    </main>
  );
};

export default Ofertas;
