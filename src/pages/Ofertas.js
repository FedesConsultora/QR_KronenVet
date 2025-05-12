import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

const slides = [
  { link: 'https://www.kronenvet.com.ar/?Find=power%20gold', img: '/assets/images/ofertas/OM MAYO-01.jpg', alt: 'Oferta 1'},
  { link: 'https://www.kronenvet.com.ar/?Find=power%20gold', img: '/assets/images/ofertas/OM MAYO-02.jpg', alt: 'Oferta 2' },
  { link: 'https://www.kronenvet.com.ar/?Find=power%20gold', img: '/assets/images/ofertas/OM MAYO-03.jpg', alt: 'Oferta 3' },
  { link: 'https://www.kronenvet.com.ar/?Find=diazepan', img: '/assets/images/ofertas/OM MAYO-04.jpg', alt: 'Oferta 4' },
  { link: 'https://www.kronenvet.com.ar/?Find=yodacalcio', img: '/assets/images/ofertas/OM MAYO-05.jpg', alt: 'Oferta 5' },
  { link: 'https://www.kronenvet.com.ar/?Find=feline', img: '/assets/images/ofertas/OM MAYO-06.jpg', alt: 'Oferta 6' },
  { link: 'https://www.kronenvet.com.ar/?Find=dardox', img: '/assets/images/ofertas/OM MAYO-07.jpg', alt: 'Oferta 7' },
  { link: 'https://www.kronenvet.com.ar/?Find=pets%20protector', img: '/assets/images/ofertas/OM MAYO-08.jpg', alt: 'Oferta 8' },
  { link: 'https://www.kronenvet.com.ar/?Find=respi%208', img: '/assets/images/ofertas/OM MAYO-09.jpg', alt: 'Oferta 9'},
  { link: 'https://www.kronenvet.com.ar/?Find=respi%208', img: '/assets/images/ofertas/OM MAYO-10.jpg', alt: 'Oferta 10' },
  { link: 'https://www.kronenvet.com.ar/?Find=tritonyl', img: '/assets/images/ofertas/OM MAYO-11.jpg', alt: 'Oferta 11' },
  { link: 'https://www.kronenvet.com.ar/?Find=cobrexilin', img: '/assets/images/ofertas/OM MAYO-12.jpg', alt: 'Oferta 12' },
  { link: 'https://www.kronenvet.com.ar/?Find=oxisol', img: '/assets/images/ofertas/OM MAYO-13.jpg', alt: 'Oferta 13' },
  { link: 'https://www.kronenvet.com.ar/?Find=meltra%20endectocida', img: '/assets/images/ofertas/OM MAYO-14.jpg', alt: 'Oferta 14' },
  { link: 'https://www.kronenvet.com.ar/?Find=cetfur', img: '/assets/images/ofertas/OM MAYO-15.jpg', alt: 'Oferta 15' },
  { link: 'https://www.kronenvet.com.ar/?Find=tilmec', img: '/assets/images/ofertas/OM MAYO-16.jpg', alt: 'Oferta 16' },
  { link: 'https://www.kronenvet.com.ar/?Find=brouwer', img: '/assets/images/ofertas/OM MAYO-17.jpg', alt: 'Oferta 17' },
  { link: 'https://www.kronenvet.com.ar/?Find=prednovet', img: '/assets/images/ofertas/OM MAYO-18.jpg', alt: 'Oferta 18' },
  { link: 'https://www.kronenvet.com.ar/?Find=enroplus', img: '/assets/images/ofertas/OM MAYO-19.jpg', alt: 'Oferta 19' },
  { link: 'https://www.kronenvet.com.ar/?Find=pets%20protector%2090', img: '/assets/images/ofertas/OM MAYO-20.jpg', alt: 'Oferta 20' },
  { link: 'https://www.kronenvet.com.ar/?Find=Rochy%20aerosol', img: '/assets/images/ofertas/OM MAYO-21.jpg', alt: 'Oferta 21' },
  { link: 'https://www.kronenvet.com.ar/?Find=Rochy%20aerosol', img: '/assets/images/ofertas/OM MAYO-22.jpg', alt: 'Oferta 22' },
  { link: 'https://www.kronenvet.com.ar/?Find=feligen', img: '/assets/images/ofertas/OM MAYO-23.jpg', alt: 'Oferta 23' },
  { link: 'https://www.kronenvet.com.ar/?Find=glypondin', img: '/assets/images/ofertas/OM MAYO-24.jpg', alt: 'Oferta 24' },
  { link: 'https://www.kronenvet.com.ar/?Find=basken', img: '/assets/images/ofertas/OM MAYO-25.jpg', alt: 'Oferta 25' },
  { link: 'https://www.kronenvet.com.ar/?IdArt=04669', img: '/assets/images/ofertas/OM MAYO-26.jpg', alt: 'Oferta 26' },
  { link: 'https://www.kronenvet.com.ar/?Find=cobre%20plus', img: '/assets/images/ofertas/OM MAYO-27.jpg', alt: 'Oferta 27' },
  { link: 'https://www.kronenvet.com.ar/?Find=providean', img: '/assets/images/ofertas/OM MAYO-28.jpg', alt: 'Oferta 28' },
  { link: 'https://www.kronenvet.com.ar/?Find=bagovac' ,img: '/assets/images/ofertas/OM MAYO-29.jpg', alt: 'Oferta 29' },
  { link: 'https://www.kronenvet.com.ar/?IdArt=02388' ,img: '/assets/images/ofertas/OM MAYO-30.jpg', alt: 'Oferta 30' },
  { link: 'https://www.kronenvet.com.ar/?Find=GUANTES%20DE%20TACTO%20PREMIUM%20x%20100%20Und.' ,img: '/assets/images/ofertas/OM MAYO-31.jpg', alt: 'Oferta 31' },
  { link: 'https://www.kronenvet.com.ar/?Find=sulfadim' ,img: '/assets/images/ofertas/OM MAYO-32.jpg', alt: 'Oferta 32' },
  { link: 'https://www.kronenvet.com.ar/?Find=cardiobendan' ,img: '/assets/images/ofertas/OM MAYO-33.jpg', alt: 'Oferta 33' },
  { link: 'https://www.kronenvet.com.ar/?Find=perfos%20max' ,img: '/assets/images/ofertas/OM MAYO-34.jpg', alt: 'Oferta 34' },
  { link: 'https://www.kronenvet.com.ar/?Find=brouwer' ,img: '/assets/images/ofertas/OM MAYO-35.jpg', alt: 'Oferta 35' },
  
  { link: 'https://www.kronenvet.com.ar/?Find=kit%20full%20reproductivo' ,img: '/assets/images/ofertas/OM MAYO-36.jpg', alt: 'Oferta 36' },
  { link: 'https://www.kronenvet.com.ar/?Find=kit%20full%20reproductivo' ,img: '/assets/images/ofertas/OM MAYO-37.jpg', alt: 'Oferta 37' },
  { link: 'https://www.kronenvet.com.ar/?IdArt=05129' ,img: '/assets/images/ofertas/OM MAYO-38.jpg', alt: 'Oferta 38' },
  { link: 'https://www.kronenvet.com.ar/?IdArt=05129' ,img: '/assets/images/ofertas/OM MAYO-39.jpg', alt: 'Oferta 39' },
  { link: 'https://www.kronenvet.com.ar/?IdArt=05833' ,img: '/assets/images/ofertas/OM MAYO-40.jpg', alt: 'Oferta 40' },
  { link: 'https://www.kronenvet.com.ar/?IdArt=05833' ,img: '/assets/images/ofertas/OM MAYO-41.jpg', alt: 'Oferta 41' },
  { link: 'https://www.kronenvet.com.ar/?Find=providean%20bh-pur' ,img: '/assets/images/ofertas/OM MAYO-42.jpg', alt: 'Oferta 42' },
  
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
