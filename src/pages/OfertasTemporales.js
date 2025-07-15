// src/pages/OfertasTemporales.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

const slidesTemporales = [
  { img: '/assets/images/ofertasTemporales/OS Julio 1.jpg', alt: 'Oferta 1' },
  { img: '/assets/images/ofertasTemporales/OS Julio 2.jpg', alt: 'Oferta 2' },
  { img: '/assets/images/ofertasTemporales/OS Julio 3.jpg', alt: 'Oferta 3' },
  { img: '/assets/images/ofertasTemporales/OS Julio 4.jpg', alt: 'Oferta 4' },
  { img: '/assets/images/ofertasTemporales/OS Julio 5.jpg', alt: 'Oferta 5' },
  { img: '/assets/images/ofertasTemporales/OS Julio 6.jpg', alt: 'Oferta 6' },
  { img: '/assets/images/ofertasTemporales/OS Julio 7.jpg', alt: 'Oferta 7' },
  { img: '/assets/images/ofertasTemporales/OS Julio 8.jpg', alt: 'Oferta 8' },
  { img: '/assets/images/ofertasTemporales/OS Julio 9.jpg', alt: 'Oferta 9' },
  { img: '/assets/images/ofertasTemporales/OS Julio 10.jpg', alt: 'Oferta 10' },
  
];

const OfertasTemporales = () => {
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
              },
            }}
          >
            {slidesTemporales.map((slide, index) => (
              <SwiperSlide key={index} className="carousel-item">
                {/* Estas ofertas no tienen link, solo la imagen */}
                <img src={slide.img} alt={slide.alt} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="border"></div>
      </section>

      <section className="socialMedia">
        <ul className="navSocial">
          <a href="https://www.instagram.com/kronenvet/" target="_blank" rel="noreferrer">
            <li><img src="/assets/icons/iconoInstagram.png" alt="Instagram kronen"/></li>
          </a>
          <a href="https://www.linkedin.com/company/kronenvet" target="_blank" rel="noreferrer">
            <li><img src="/assets/icons/iconoLinkedin.png" alt="LinkedIn kronen" /></li>
          </a>
          <a href="https://www.facebook.com/kronenvet" target="_blank" rel="noreferrer">
            <li><img src="/assets/icons/iconoFacebook.png" alt="Facebook kronen"/></li>
          </a>
          <a href="https://www.kronenvet.com.ar/" target="_blank" rel="noreferrer">
            <li><img src="/assets/icons/iconoWeb.png" alt="Web kronen"/></li>
          </a>
          <a href="https://apps.apple.com/ar/app/mikvet/id1473814533" target="_blank" rel="noreferrer">
            <li><img src="/assets/icons/iconoAppStore.png" alt="App Store kronen"/></li>
          </a>
          <a href="https://play.google.com/store/apps/details?id=com.app.kronenvet" target="_blank" rel="noreferrer">
            <li><img src="/assets/icons/iconoGooglePlay.png" alt="Google Play kronen"/></li>
          </a>
        </ul>
      </section>
    </main>
  );
};

export default OfertasTemporales;