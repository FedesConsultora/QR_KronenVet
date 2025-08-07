import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

const slides = [
  { link: 'https://www.kronenvet.com.ar/?Find=cobrexilin', img: '/assets/images/ofertas/OM AGOSTO-01.jpg', alt: 'Oferta 1'},
  { link: 'https://www.kronenvet.com.ar/?Find=neumoflogin', img: '/assets/images/ofertas/OM AGOSTO-02.jpg', alt: 'Oferta 2' },
  { link: 'https://www.kronenvet.com.ar/?Find=spinomax', img: '/assets/images/ofertas/OM AGOSTO-03.png', alt: 'Oferta 3' },
  { link: 'https://www.kronenvet.com.ar/?Find=ketamina', img: '/assets/images/ofertas/OM AGOSTO-04.jpg', alt: 'Oferta 4' },
  { link: 'https://www.kronenvet.com.ar/?Find=pets%20protector', img: '/assets/images/ofertas/OM AGOSTO-05.jpg', alt: 'Oferta 5' },
  { link: 'https://www.kronenvet.com.ar/?Find=Power%20Comprimidos', img: '/assets/images/ofertas/OM AGOSTO-06.jpg', alt: 'Oferta 6' },
  { link: 'https://www.kronenvet.com.ar/?Find=Power%20Gold', img: '/assets/images/ofertas/OM AGOSTO-07.jpg', alt: 'Oferta 7' },
  { link: 'https://www.kronenvet.com.ar/?Find=Power%20Gold', img: '/assets/images/ofertas/OM AGOSTO-08.jpg', alt: 'Oferta 8' },
  { link: 'https://www.kronenvet.com.ar/?Find=terraVet', img: '/assets/images/ofertas/OM AGOSTO-09.jpg', alt: 'Oferta 9'},
  { link: 'https://www.kronenvet.com.ar/?Find=providean', img: '/assets/images/ofertas/OM AGOSTO-10.jpg', alt: 'Oferta 10' },
  { link: 'https://www.kronenvet.com.ar/?Find=INJECTION%20iny.%20x%20500%20ml', img: '/assets/images/ofertas/OM AGOSTO-11.jpg', alt: 'Oferta 11' },
  { link: 'https://www.kronenvet.com.ar/?IdArt=06314', img: '/assets/images/ofertas/OM AGOSTO-12.jpg', alt: 'Oferta 12' },
  { link: 'https://www.kronenvet.com.ar/?Find=cidar', img: '/assets/images/ofertas/OM AGOSTO-13.jpg', alt: 'Oferta 13' },
  { link: 'https://www.kronenvet.com.ar/?Find=guantes%20de%20tacto', img: '/assets/images/ofertas/OM AGOSTO-14.jpg', alt: 'Oferta 14' },
  { link: 'https://www.kronenvet.com.ar/?Find=cetfur', img: '/assets/images/ofertas/OM AGOSTO-15.jpg', alt: 'Oferta 15' },
  { link: 'https://www.kronenvet.com.ar/?Find=butterfly', img: '/assets/images/ofertas/OM AGOSTO-16.jpg', alt: 'Oferta 16' },
  { link: 'https://www.kronenvet.com.ar/?Find=providean%20viratec', img: '/assets/images/ofertas/OM AGOSTO-17.jpg', alt: 'Oferta 17' },
  { link: 'https://www.kronenvet.com.ar/?Find=recombitek', img: '/assets/images/ofertas/OM AGOSTO-18.jpg', alt: 'Oferta 18' },
  { link: 'https://www.kronenvet.com.ar/?IdArt=07282', img: '/assets/images/ofertas/OM AGOSTO-19.jpg', alt: 'Oferta 19' },
  { link: 'https://www.kronenvet.com.ar/?Find=kit%20full%20reproductivo', img: '/assets/images/ofertas/OM AGOSTO-20.jpg', alt: 'Oferta 20' },
  { link: 'https://www.kronenvet.com.ar/?Find=KIT%20FULL%20REPRODUCTIVO%20ZOOVET%20x%2050%20ds.', img: '/assets/images/ofertas/OM AGOSTO-21.jpg', alt: 'Oferta 21' },
  { link: 'https://www.kronenvet.com.ar/?Find=derramin', img: '/assets/images/ofertas/OM AGOSTO-22.jpg', alt: 'Oferta 22' },
  { link: 'https://www.kronenvet.com.ar/?Find=derramin', img: '/assets/images/ofertas/OM AGOSTO-23.jpg', alt: 'Oferta 23' },
  { link: 'https://www.kronenvet.com.ar/?Find=derramin', img: '/assets/images/ofertas/OM AGOSTO-24.jpg', alt: 'Oferta 24' },
  { link: '', img: '/assets/images/ofertas/OM AGOSTO-25.jpg', alt: 'Oferta 25' },
  { link: 'https://www.kronenvet.com.ar/?IdArt=04669', img: '/assets/images/ofertas/OM AGOSTO-26.jpg', alt: 'Oferta 26' },
  { link: 'https://www.kronenvet.com.ar/?Find=cobre', img: '/assets/images/ofertas/OM AGOSTO-27.jpg', alt: 'Oferta 27' },
  { link: 'https://www.kronenvet.com.ar/?Find=cidar', img: '/assets/images/ofertas/OM AGOSTO-28.jpg', alt: 'Oferta 28' },
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
