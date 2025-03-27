import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

const slides = [
  {link: 'https://www.kronenvet.com.ar/?Find=power%20ultra', img: '/assets/images/ofertas/OM 1.jpg', alt: 'Oferta 1'},
  { link: 'https://www.kronenvet.com.ar/?Find=power%20gold', img: '/assets/images/ofertas/OM 2.jpg', alt: 'Oferta 2' },
  { link: 'https://www.kronenvet.com.ar/?Find=dermomax', img: '/assets/images/ofertas/OM 3.jpg', alt: 'Oferta 3' },
  { link: 'https://www.kronenvet.com.ar/?Find=meltra%20gold', img: '/assets/images/ofertas/OM 4.jpg', alt: 'Oferta 4' },
  { link: 'https://www.kronenvet.com.ar/?Find=derramin', img: '/assets/images/ofertas/OM 5.jpg', alt: 'Oferta 5' },
  { link: 'https://www.kronenvet.com.ar/?Find=power%20comprimidos', img: '/assets/images/ofertas/OM 6.jpg', alt: 'Oferta 6' },
  { link: 'https://www.kronenvet.com.ar/?Find=kit%20diprogest', img: '/assets/images/ofertas/OM 7.jpg', alt: 'Oferta 7' },
  { link: 'https://www.kronenvet.com.ar/?Find=diazepam', img: '/assets/images/ofertas/OM 8.jpg', alt: 'Oferta 8' },
  { link: 'https://www.kronenvet.com.ar/?Find=lidocaina', img: '/assets/images/ofertas/OM 9.jpg', alt: 'Oferta 9'},
  { link: 'https://www.kronenvet.com.ar/?Find=batacas', img: '/assets/images/ofertas/OM 10.jpg', alt: 'Oferta 10' },
  { link: 'https://www.kronenvet.com.ar/?Find=triton', img: '/assets/images/ofertas/OM 11.jpg', alt: 'Oferta 11' },
  { link: 'https://www.kronenvet.com.ar/?Find=tea', img: '/assets/images/ofertas/OM 12.jpg', alt: 'Oferta 12' },
  { link: 'https://www.kronenvet.com.ar/?Find=agro%20insumos', img: '/assets/images/ofertas/OM 13.jpg', alt: 'Oferta 13' },
  { link: 'https://www.kronenvet.com.ar/?Find=dardox', img: '/assets/images/ofertas/OM 15.jpg', alt: 'Oferta 15' },
  { link: 'https://www.kronenvet.com.ar/?Find=derramin', img: '/assets/images/ofertas/OM 16.jpg', alt: 'Oferta 16' },
  { link: 'https://www.kronenvet.com.ar/?Find=yodacalcio', img: '/assets/images/ofertas/OM 17.jpg', alt: 'Oferta 17' },
  { link: 'https://www.kronenvet.com.ar/?Find=galmetrin', img: '/assets/images/ofertas/OM 18.jpg', alt: 'Oferta 18' },
  { link: 'https://www.kronenvet.com.ar/?Find=spinomax', img: '/assets/images/ofertas/OM 19.jpg', alt: 'Oferta 19' },
  { link: 'https://www.kronenvet.com.ar/?Find=prednovet', img: '/assets/images/ofertas/OM 20.jpg', alt: 'Oferta 20' },
  { link: 'https://www.kronenvet.com.ar/?Find=feligen', img: '/assets/images/ofertas/OM 21.jpg', alt: 'Oferta 21' },
  { link: 'https://www.kronenvet.com.ar/?Find=aciendel', img: '/assets/images/ofertas/OM 22.jpg', alt: 'Oferta 22' },
 
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
