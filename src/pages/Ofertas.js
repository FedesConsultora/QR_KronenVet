import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

const slides = [
  { link: 'https://kronenvet.com.ar/?IdArt=06850', img: '/assets/images/ofertas/OM -Diciembre (1).png', alt: 'Oferta 1' },
  { link: 'https://kronenvet.com.ar/?IdArt=05057', img: '/assets/images/ofertas/OM -Diciembre (2).png', alt: 'Oferta 2' },
  { link: 'https://kronenvet.com.ar/?IdArt=03449', img: '/assets/images/ofertas/OM -Diciembre (3).png', alt: 'Oferta 3' },
  { link: 'https://kronenvet.com.ar/?Find=vermex', img: '/assets/images/ofertas/OM -Diciembre (4).png', alt: 'Oferta 4' },
  { link: 'https://kronenvet.com.ar/?Find=diazepan', img: '/assets/images/ofertas/OM -Diciembre (5).png', alt: 'Oferta 5' },
  { link: 'https://kronenvet.com.ar/?Find=aprax', img: '/assets/images/ofertas/OM -Diciembre (6).png', alt: 'Oferta 6' },
  { link: 'https://kronenvet.com.ar/?Find=fleanet%20dog', img: '/assets/images/ofertas/OM -Diciembre (7).png', alt: 'Oferta 7' },
  { link: 'https://kronenvet.com.ar/?IdArt=07280', img: '/assets/images/ofertas/OM -Diciembre (8).png', alt: 'Oferta 8' },
  { link: 'https://kronenvet.com.ar/?IdArt=05259', img: '/assets/images/ofertas/OM -Diciembre (9).png', alt: 'Oferta 9' },
  { link: 'https://kronenvet.com.ar/?Find=ectopills', img: '/assets/images/ofertas/OM -Diciembre (10).png', alt: 'Oferta 10' },
  { link: 'https://kronenvet.com.ar/?IdArt=06800', img: '/assets/images/ofertas/OM -Diciembre (11).png', alt: 'Oferta 11' },
  { link: 'https://kronenvet.com.ar/?IdArt=02482', img: '/assets/images/ofertas/OM -Diciembre (12).png', alt: 'Oferta 12' },
  { link: 'https://kronenvet.com.ar/?Find=POWER%20ULTRA', img: '/assets/images/ofertas/OM -Diciembre (13).png', alt: 'Oferta 13' },
  { link: 'https://kronenvet.com.ar/?Find=POWER%20ULTRA', img: '/assets/images/ofertas/OM -Diciembre (14).png', alt: 'Oferta 14' },
  { link: 'https://kronenvet.com.ar/?Find=bactrovet%20plata%20iny', img: '/assets/images/ofertas/OM -Diciembre (15).png', alt: 'Oferta 15' },
  { link: 'https://kronenvet.com.ar/?Find=glypondin%204', img: '/assets/images/ofertas/OM -Diciembre (16).png', alt: 'Oferta 16' },
  { link: 'https://kronenvet.com.ar/?IdArt=00246', img: '/assets/images/ofertas/OM -Diciembre (17).png', alt: 'Oferta 17' },
  { link: 'https://kronenvet.com.ar/?IdArt=00992', img: '/assets/images/ofertas/OM -Diciembre (18).png', alt: 'Oferta 18' },
  { link: 'https://kronenvet.com.ar/?IdArt=05316', img: '/assets/images/ofertas/OM -Diciembre (19).png', alt: 'Oferta 19' },
  { link: 'https://kronenvet.com.ar/?Find=DKL', img: '/assets/images/ofertas/OM -Diciembre (20).png', alt: 'Oferta 20' },
  { link: 'https://kronenvet.com.ar/?Find=PETS%20PROTECTOR%2090', img: '/assets/images/ofertas/OM -Diciembre (21).png', alt: 'Oferta 21' },
  { link: 'https://kronenvet.com.ar/?IdArt=05264', img: '/assets/images/ofertas/OM -Diciembre (22).png', alt: 'Oferta 22' },
  { link: 'https://kronenvet.com.ar/?Find=ENROPLUS%20HOSPITALARIO', img: '/assets/images/ofertas/OM -Diciembre (23).png', alt: 'Oferta 23' },
  { link: 'https://kronenvet.com.ar/?IdArt=04862', img: '/assets/images/ofertas/OM -Diciembre (24).png', alt: 'Oferta 24' },
  { link: 'https://kronenvet.com.ar/?Find=FENOBARBITAL%20P', img: '/assets/images/ofertas/OM -Diciembre (25).png', alt: 'Oferta 25' },
  { link: 'https://kronenvet.com.ar/?IdArt=07608', img: '/assets/images/ofertas/OM -Diciembre (26).png', alt: 'Oferta 26' },
  { link: 'https://kronenvet.com.ar/?Find=FAWNA', img: '/assets/images/ofertas/OM -Diciembre (27).png', alt: 'Oferta 27' },
  { link: 'https://kronenvet.com.ar/?Find=BRAVECTO', img: '/assets/images/ofertas/OM -Diciembre (28).png', alt: 'Oferta 28' },
  { link: 'https://kronenvet.com.ar/?Find=T%204%20TRITON', img: '/assets/images/ofertas/OM -Diciembre (29).png', alt: 'Oferta 29' },
  { link: 'https://kronenvet.com.ar/?Find=FAWNA', img: '/assets/images/ofertas/OM -Diciembre (30).png', alt: 'Oferta 30' },
  { link: 'https://kronenvet.com.ar/?Find=CIDAR', img: '/assets/images/ofertas/OM -Diciembre (31).png', alt: 'Oferta 31' },
  { link: 'https://kronenvet.com.ar/?Find=CIDAR', img: '/assets/images/ofertas/OM -Diciembre (32).png', alt: 'Oferta 32' },
  { link: 'https://kronenvet.com.ar/?Find=CIDAR', img: '/assets/images/ofertas/OM -Diciembre (33).png', alt: 'Oferta 33' },
  { link: 'https://kronenvet.com.ar/?Find=POWER%20GOLD', img: '/assets/images/ofertas/OM -Diciembre (34).png', alt: 'Oferta 34' },
  { link: 'https://kronenvet.com.ar/?Find=POWER%20GOLD%201%20MES', img: '/assets/images/ofertas/OM -Diciembre (35).png', alt: 'Oferta 35' },
  { link: 'https://kronenvet.com.ar/?Find=POWER%20GOLD', img: '/assets/images/ofertas/OM -Diciembre (36).png', alt: 'Oferta 36' },
  { link: 'https://kronenvet.com.ar/?Find=POWER%20GOLD', img: '/assets/images/ofertas/OM -Diciembre (37).png', alt: 'Oferta 37' },
  { link: 'https://kronenvet.com.ar/?Find=MELTRA%20GOLD', img: '/assets/images/ofertas/OM -Diciembre (38).png', alt: 'Oferta 38' },
  { link: 'https://kronenvet.com.ar/?Find=MELTRA%20GOLD', img: '/assets/images/ofertas/OM -Diciembre (39).png', alt: 'Oferta 39' },
  { link: 'https://kronenvet.com.ar/?Find=GROOMERS%20EXPERT', img: '/assets/images/ofertas/OM -Diciembre (40).png', alt: 'Oferta 40' },
  { link: 'https://kronenvet.com.ar/?Find=PRIUS', img: '/assets/images/ofertas/OM -Diciembre (41).png', alt: 'Oferta 41' },
  { link: 'https://kronenvet.com.ar/?IdArt=07287', img: '/assets/images/ofertas/OM -Diciembre (42).png', alt: 'Oferta 42' },
  { link: 'https://kronenvet.com.ar/?Find=SPINOMAX%20DUO', img: '/assets/images/ofertas/OM -Diciembre (43).png', alt: 'Oferta 43' },
  { link: 'https://kronenvet.com.ar/?Find=KUALCOS', img: '/assets/images/ofertas/OM -Diciembre (44).png', alt: 'Oferta 44' },
  { link: 'https://kronenvet.com.ar/?Find=TECNOVAX', img: '/assets/images/ofertas/OM -Diciembre (45).png', alt: 'Oferta 45' },
  { link: 'https://kronenvet.com.ar/?IdArt=06220', img: '/assets/images/ofertas/OM -Diciembre (46).png', alt: 'Oferta 46' },
  { link: 'https://kronenvet.com.ar/?Find=MELTRA', img: '/assets/images/ofertas/OM -Diciembre (47).png', alt: 'Oferta 47' },
  { link: 'https://kronenvet.com.ar/?Find=DERRAMIN', img: '/assets/images/ofertas/OM -Diciembre (48).png', alt: 'Oferta 48' },
  { link: 'https://kronenvet.com.ar/?Find=POWER%20GOLD%201%20MES', img: '/assets/images/ofertas/OM -Diciembre (49).png', alt: 'Oferta 49' },
  { link: 'https://kronenvet.com.ar/?Find=OCLADERM', img: '/assets/images/ofertas/OM -Diciembre (50).png', alt: 'Oferta 50' },
  { link: 'https://kronenvet.com.ar/?IdArt=00598', img: '/assets/images/ofertas/OM -Diciembre (51).png', alt: 'Oferta 51' },
  { link: 'https://kronenvet.com.ar/?IdArt=06396', img: '/assets/images/ofertas/OM -Diciembre (52).png', alt: 'Oferta 52' },
  { link: 'https://kronenvet.com.ar/?Find=POWER%20ULTRA', img: '/assets/images/ofertas/OM -Diciembre (53).png', alt: 'Oferta 53' },
  { link: 'https://kronenvet.com.ar/?Find=ACIENDEL', img: '/assets/images/ofertas/OM -Diciembre (54).png', alt: 'Oferta 54' },
  { link: 'https://kronenvet.com.ar/?Find=CEVA', img: '/assets/images/ofertas/OM -Diciembre (55).png', alt: 'Oferta 55' },
  { link: 'https://kronenvet.com.ar/?IdArt=03542', img: '/assets/images/ofertas/OM -Diciembre (56).png', alt: 'Oferta 56' },
  { link: 'https://kronenvet.com.ar/?IdArt=06169', img: '/assets/images/ofertas/OM -Diciembre (57).png', alt: 'Oferta 57' },
  { link: 'https://kronenvet.com.ar/?IdArt=07878', img: '/assets/images/ofertas/OM -Diciembre (58).png', alt: 'Oferta 58' },
  { link: 'https://kronenvet.com.ar/?IdArt=07564', img: '/assets/images/ofertas/OM -Diciembre (59).png', alt: 'Oferta 59' },
  { link: 'https://kronenvet.com.ar/?IdArt=00272', img: '/assets/images/ofertas/OM -Diciembre (60).png', alt: 'Oferta 60' },
  { link: 'https://kronenvet.com.ar/?IdArt=02921', img: '/assets/images/ofertas/OM -Diciembre (61).png', alt: 'Oferta 61' },
  { link: 'https://kronenvet.com.ar/?IdArt=02918', img: '/assets/images/ofertas/OM -Diciembre (62).png', alt: 'Oferta 62' },
  { link: 'https://kronenvet.com.ar/?IdArt=02920', img: '/assets/images/ofertas/OM -Diciembre (63).png', alt: 'Oferta 63' },
  { link: 'https://kronenvet.com.ar/?IdArt=07780', img: '/assets/images/ofertas/OM -Diciembre (64).png', alt: 'Oferta 64' },
  { link: 'https://kronenvet.com.ar/?IdArt=07785', img: '/assets/images/ofertas/OM -Diciembre (65).png', alt: 'Oferta 65' },
  { link: 'https://kronenvet.com.ar/?IdArt=07783', img: '/assets/images/ofertas/OM -Diciembre (66).png', alt: 'Oferta 66' },
  { link: 'https://kronenvet.com.ar/?Find=POWER%20ULTRA', img: '/assets/images/ofertas/OM -Diciembre (67).png', alt: 'Oferta 67' },
  { link: 'https://kronenvet.com.ar/?Find=BROUWER', img: '/assets/images/ofertas/OM -Diciembre (68).png', alt: 'Oferta 68' }
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
