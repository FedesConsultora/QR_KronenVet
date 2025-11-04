import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

/** Reemplazable luego por datos desde GAS */
const promosSlides = [
  { link: 'https://kronenvet.com.ar/?IdArt=06769',   img: '/assets/images/ofertas/OM Octubre-01.png', alt: 'Promo 1' },
  { link: 'https://kronenvet.com.ar/?Find=recombitek', img: '/assets/images/ofertas/OM Octubre-02.png', alt: 'Promo 2' },
  { link: 'https://kronenvet.com.ar/?IdArt=06103',   img: '/assets/images/ofertas/OM Octubre-03.png', alt: 'Promo 3' },
  { link: 'https://kronenvet.com.ar/?Find=tritonyl', img: '/assets/images/ofertas/OM Octubre-04.png', alt: 'Promo 4' },
];

/**
 * Props:
 * - inModal?: boolean
 * - slidesPerViewInModal?: number (default 2)
 * - onSlideClick?: (link: string) => void
 * - className?: string
 */
export default function PromoCarousel({
  inModal = false,
  slidesPerViewInModal = 2,
  onSlideClick,
  className = '',
}) {
  const wrapClass = `carousel promos ${inModal ? 'promos--in-modal' : ''} ${className}`.trim();

  const handleClick = (e, link) => {
    if (onSlideClick) {
      e.preventDefault();
      onSlideClick(link);
    }
  };

  // En modal: 1 en mobile, 2 desde 640px+
  // Fuera del modal: 1 mobile, 3 desktop (como antes)
  const modalBreakpoints = {
    0:   { slidesPerView: 1 },
    640: { slidesPerView: slidesPerViewInModal },
    1024:{ slidesPerView: slidesPerViewInModal },
  };
  const pageBreakpoints = {
    0:   { slidesPerView: 1 },
    1024:{ slidesPerView: 3 },
  };

  return (
    <section className={wrapClass}>
      <div className="promos-inner">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={16}
          slidesPerView={inModal ? 1 : 1}
          breakpoints={inModal ? modalBreakpoints : pageBreakpoints}
          observer
          observeParents
          resizeObserver
          watchOverflow
          style={{ width: '100%' }}
        >
          {promosSlides.map((s, i) => (
            <SwiperSlide key={i} className="carousel-item">
              <a
                href={s.link}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => handleClick(e, s.link)}
                className="carousel-card"
              >
                <img src={s.img} alt={s.alt} loading="lazy" />
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
