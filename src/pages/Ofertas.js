import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

const slides = [
  { link: 'https://kronenvet.com.ar/?IdArt=06769', img: '/assets/images/ofertas/OM Octubre-01.png', alt: 'Oferta 1'},
  { link: 'https://kronenvet.com.ar/?Find=recombitek', img: '/assets/images/ofertas/OM Octubre-02.png', alt: 'Oferta 2' },
  { link: 'https://kronenvet.com.ar/?IdArt=06103', img: '/assets/images/ofertas/OM Octubre-03.png', alt: 'Oferta 3' },
  { link: 'https://kronenvet.com.ar/?Find=tritonyl', img: '/assets/images/ofertas/OM Octubre-04.png', alt: 'Oferta 4' },
  { link: 'https://kronenvet.com.ar/?Find=power%20gold', img: '/assets/images/ofertas/OM Octubre-05.png', alt: 'Oferta 5' },
  { link: 'https://kronenvet.com.ar/?Find=power%20gold', img: '/assets/images/ofertas/OM Octubre-06.png', alt: 'Oferta 6' },
  { link: 'https://kronenvet.com.ar/?IdArt=06103', img: '/assets/images/ofertas/OM Octubre-07.png', alt: 'Oferta 7' },
  { link: 'https://kronenvet.com.ar/?Find=dominal%20max', img: '/assets/images/ofertas/OM Octubre-08.png', alt: 'Oferta 8' },
  { link: 'https://kronenvet.com.ar/?Find=cidar', img: '/assets/images/ofertas/OM Octubre-09.png', alt: 'Oferta 9'},
  { link: 'https://kronenvet.com.ar/?Find=bravecto', img: '/assets/images/ofertas/OM Octubre-10.png', alt: 'Oferta 10' },
  { link: 'https://kronenvet.com.ar/?Find=power%20comprimidos', img: '/assets/images/ofertas/OM Octubre-11.png', alt: 'Oferta 11' },
  { link: 'https://kronenvet.com.ar/?Find=power%20ultra', img: '/assets/images/ofertas/OM Octubre-12.png', alt: 'Oferta 12' },
  { link: 'https://kronenvet.com.ar/?Find=power%20ultra', img: '/assets/images/ofertas/OM Octubre-13.png', alt: 'Oferta 13' },
  { link: 'https://kronenvet.com.ar/?Find=ceva', img: '/assets/images/ofertas/OM Octubre-14.png', alt: 'Oferta 14' },
  { link: 'https://kronenvet.com.ar/?Find=power%20ultra', img: '/assets/images/ofertas/OM Octubre-15.png', alt: 'Oferta 15' },
  { link: 'https://kronenvet.com.ar/?Find=vermex%20oral', img: '/assets/images/ofertas/OM Octubre-16.png', alt: 'Oferta 16' },
  { link: 'https://kronenvet.com.ar/?Find=oxisol', img: '/assets/images/ofertas/OM Octubre-17.png', alt: 'Oferta 17' },
  { link: 'https://kronenvet.com.ar/?Find=cuzinc', img: '/assets/images/ofertas/OM Octubre-18.png', alt: 'Oferta 18' },
  { link: 'https://kronenvet.com.ar/?IdArt=03411', img: '/assets/images/ofertas/OM Octubre-19.png', alt: 'Oferta 19' },
  { link: 'https://kronenvet.com.ar/?Find=meltra%20endectocida', img: '/assets/images/ofertas/OM Octubre-20.png', alt: 'Oferta 20' },
  { link: 'https://kronenvet.com.ar/?Find=terravet', img: '/assets/images/ofertas/OM Octubre-21.png', alt: 'Oferta 21' },
  { link: 'https://kronenvet.com.ar/?IdArt=06396', img: '/assets/images/ofertas/OM Octubre-22.png', alt: 'Oferta 22' },
  { link: 'https://kronenvet.com.ar/?IdArt=07337', img: '/assets/images/ofertas/OM Octubre-24.png', alt: 'Oferta 24' },
  { link: 'https://kronenvet.com.ar/?Find=gets%20palatable', img: '/assets/images/ofertas/OM Octubre-25.png', alt: 'Oferta 25' },
  { link: 'https://kronenvet.com.ar/?Find=feline%20full%20spot', img: '/assets/images/ofertas/OM Octubre-26.png', alt: 'Oferta 26' },
  { link: 'https://kronenvet.com.ar/?Find=ascaricida%20gotas', img: '/assets/images/ofertas/OM Octubre-27.png', alt: 'Oferta 27' },
  { link: 'https://kronenvet.com.ar/?Find=fleanet', img: '/assets/images/ofertas/OM Octubre-28.png', alt: 'Oferta 28' },
  { link: 'https://kronenvet.com.ar/?Find=aprax', img: '/assets/images/ofertas/OM Octubre-29.png', alt: 'Oferta 29' },
  { link: 'https://kronenvet.com.ar/?Find=fipro', img: '/assets/images/ofertas/OM Octubre-30.png', alt: 'Oferta 30'},
  { link: 'https://kronenvet.com.ar/?Find=brouwer', img: '/assets/images/ofertas/OM Octubre-31.png', alt: 'Oferta 31' },
  { link: 'https://kronenvet.com.ar/?Find=dermovet', img: '/assets/images/ofertas/OM Octubre-32.png', alt: 'Oferta 32' },
  { link: 'https://kronenvet.com.ar/?Find=t.i.u', img: '/assets/images/ofertas/OM Octubre-33.png', alt: 'Oferta 33' },
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
