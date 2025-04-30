import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

const slides = [
  {link: 'https://www.kronenvet.com.ar/?Find=power%20ultra', img: '/assets/images/ofertas/OM ABRIL1.jpg', alt: 'Oferta 1'},
  { link: 'https://www.kronenvet.com.ar/?Find=power%20gold', img: '/assets/images/ofertas/OM ABRIL2.jpg', alt: 'Oferta 2' },
  { link: 'https://www.kronenvet.com.ar/?Find=spinomax', img: '/assets/images/ofertas/OM ABRIL3.jpg', alt: 'Oferta 3' },
  { link: 'https://www.kronenvet.com.ar/?Find=pets%20protector', img: '/assets/images/ofertas/OM ABRIL4.jpg', alt: 'Oferta 4' },
  { link: 'https://www.kronenvet.com.ar/?Find=diazepan', img: '/assets/images/ofertas/OM ABRIL5.jpg', alt: 'Oferta 5' },
  { link: 'https://www.kronenvet.com.ar/?Find=trivermex', img: '/assets/images/ofertas/OM ABRIL6.jpg', alt: 'Oferta 6' },
  { link: 'https://www.kronenvet.com.ar/?Find=yodacalcio', img: '/assets/images/ofertas/OM ABRIL7.jpg', alt: 'Oferta 7' },
  { link: 'https://www.kronenvet.com.ar/?Find=feline%20full', img: '/assets/images/ofertas/OM ABRIL8.jpg', alt: 'Oferta 8' },
  { link: 'https://www.kronenvet.com.ar/?Find=diafin', img: '/assets/images/ofertas/OM ABRIL9.jpg', alt: 'Oferta 9'},
  { link: 'https://www.kronenvet.com.ar/?Find=diafin', img: '/assets/images/ofertas/OM ABRIL10.jpg', alt: 'Oferta 10' },
  { link: 'https://www.kronenvet.com.ar/?Find=K%C3%B6nig', img: '/assets/images/ofertas/OM ABRIL11.jpg', alt: 'Oferta 11' },
  { link: 'https://www.kronenvet.com.ar/?Find=tecnovax', img: '/assets/images/ofertas/OM ABRIL12.jpg', alt: 'Oferta 12' },
  { link: 'https://www.kronenvet.com.ar/?GRANDES%20ANIMALES=MenuRb_2', img: '/assets/images/ofertas/OM ABRIL13.jpg', alt: 'Oferta 13' },
  { link: 'https://www.kronenvet.com.ar/?Find=vacunas', img: '/assets/images/ofertas/OM ABRIL15.jpg', alt: 'Oferta 15' },
  { link: 'https://www.kronenvet.com.ar/?Find=triton', img: '/assets/images/ofertas/OM ABRIL16.jpg', alt: 'Oferta 16' },
  { link: 'https://www.kronenvet.com.ar/?Find=artrin', img: '/assets/images/ofertas/OM ABRIL17.jpg', alt: 'Oferta 17' },
  { link: 'https://www.kronenvet.com.ar/?Find=brouwer', img: '/assets/images/ofertas/OM ABRIL18.jpg', alt: 'Oferta 18' },
  { link: 'https://www.kronenvet.com.ar/?Find=prednovet', img: '/assets/images/ofertas/OM ABRIL19.jpg', alt: 'Oferta 19' },
  { link: 'https://www.kronenvet.com.ar/?Find=osspret', img: '/assets/images/ofertas/OM ABRIL20.jpg', alt: 'Oferta 20' },
  { link: 'https://www.kronenvet.com.ar/?Find=derramin', img: '/assets/images/ofertas/OM ABRIL21.jpg', alt: 'Oferta 21' },
  { link: 'https://www.kronenvet.com.ar/?Find=feligen', img: '/assets/images/ofertas/OM ABRIL22.jpg', alt: 'Oferta 22' },
  { link: 'https://www.kronenvet.com.ar/?Find=endofour', img: '/assets/images/ofertas/OM ABRIL23.jpg', alt: 'Oferta 23' },
  { link: 'https://www.kronenvet.com.ar/?Find=K%C3%B6nig', img: '/assets/images/ofertas/OM ABRIL24.jpg', alt: 'Oferta 24' },
  { link: 'https://www.kronenvet.com.ar/?Find=nogastrol', img: '/assets/images/ofertas/OM ABRIL25.jpg', alt: 'Oferta 25' },
  { link: 'https://www.kronenvet.com.ar/?Find=feligen', img: '/assets/images/ofertas/OM ABRIL26.jpg', alt: 'Oferta 26' },
  { link: 'https://www.kronenvet.com.ar/?Find=sulfadim', img: '/assets/images/ofertas/OM ABRIL27.jpg', alt: 'Oferta 27' },
  { link: 'https://www.kronenvet.com.ar/?Find=tea', img: '/assets/images/ofertas/OM ABRIL28.jpg', alt: 'Oferta 28' },
  { link: 'https://www.kronenvet.com.ar/?IdArt=05101' ,img: '/assets/images/ofertas/OM ABRIL34.jpg', alt: 'Oferta 34' },
  { link: 'https://www.kronenvet.com.ar/?IdArt=05101' ,img: '/assets/images/ofertas/OM ABRIL35.jpg', alt: 'Oferta 35' },
  { link: 'https://www.kronenvet.com.ar/?IdArt=05129' ,img: '/assets/images/ofertas/OM ABRIL36.jpg', alt: 'Oferta 36' },
  { link: 'https://www.kronenvet.com.ar/?IdArt=05129' ,img: '/assets/images/ofertas/OM ABRIL37.jpg', alt: 'Oferta 37' },
  { link: 'https://www.kronenvet.com.ar/?IdArt=05833' ,img: '/assets/images/ofertas/OM ABRIL38.jpg', alt: 'Oferta 38' },
  { link: 'https://www.kronenvet.com.ar/?IdArt=05833' ,img: '/assets/images/ofertas/OM ABRIL39.jpg', alt: 'Oferta 39' },
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
