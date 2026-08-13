import { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { ArrowDown } from 'lucide-react';
import { useFormModal } from '../context/FormModalContext';
import { useTab } from '../context/TabContext';
import 'swiper/css';
import 'swiper/css/effect-fade';

const ASSETS = {
  geo: 'https://solutek-wp.laralink.com/wp-content/themes/solutek/assets/images/home-3/hero-geo.png',
  shape: 'https://solutek-wp.laralink.com/wp-content/themes/solutek/assets/images/home-3/hero-rs.png',
};

const slides = [
  {
    id: 'digital',
    image: 'https://solutek-wp.laralink.com/wp-content/uploads/2024/08/hero-thum2.png',
    badge: 'Trusted by 50+ Growing Brands Across India',
    title: (
      <>
        Real Growth Stories. <span>Measurable Results.</span> No Vanity Metrics.
      </>
    ),
    description:
      'We help brands win on Search, AI Answer Engines, and Paid Ads — with strategies built on data, not guesswork. See how 50+ businesses across retail, real estate, EdTech, and B2B scaled with Inymart Labs.',
    primaryCta: 'Get Your Free Growth Audit',
    secondaryCta: 'See Real Client Results Below',
    scrollTarget: 'client-results',
  },
  {
    id: 'web',
    image: 'https://solutek-wp.laralink.com/wp-content/uploads/2024/08/hero-thum.png',
    badge: 'TRUSTED BY 50+ GROWING BRANDS ACROSS INDIA',
    title: (
      <>
        Websites Built to <span>Work.</span> Not Just Look Good.
      </>
    ),
    description:
      "We design and build websites that turn visitors into enquiries — with UI/UX and development decisions shaped by each client's real business, not generic templates. See how we've built websites for coworking, education, manufacturing, and interior design brands across Tamil Nadu.",
    primaryCta: 'Get a Free Website Review',
    secondaryCta: 'See Our Web Development Work Below',
    scrollTarget: 'web-client-websites',
  },
] as const;

function SlideContent({
  slide,
  isActive,
  onPrimary,
  onSecondary,
}: {
  slide: (typeof slides)[number];
  isActive: boolean;
  onPrimary: () => void;
  onSecondary: () => void;
}) {
  return (
    <div className="hero-area style-three overflow-hidden">
      <div className="hero-container h-full">
        <div className="hero-row h-full items-center">
          <div className="hero-col-content">
            <div className="hero-contant">
              <div className={`hero-anim hero-anim-1 ${isActive ? 'hero-anim-active' : ''}`}>
                <h6>{slide.badge}</h6>
              </div>
              <div className={`hero-anim hero-anim-2 ${isActive ? 'hero-anim-active' : ''}`}>
                <h1>{slide.title}</h1>
              </div>
              <div className={`hero-anim hero-anim-3 ${isActive ? 'hero-anim-active' : ''}`}>
                <p>{slide.description}</p>
              </div>
              <div className={`hero-anim hero-anim-4 ${isActive ? 'hero-anim-active' : ''}`}>
                <div className="hero-cta-row">
                  <button type="button" className="btn-2" onClick={onPrimary}>
                    {slide.primaryCta}
                  </button>
                  <button type="button" className="btn-hero-secondary" onClick={onSecondary}>
                    {slide.secondaryCta} <ArrowDown size={16} />
                  </button>
                </div>
              </div>
              <div className="hero-left-shape">
                <img src={ASSETS.geo} alt="" />
              </div>
            </div>
          </div>
          <div className="hero-col-thumb">
            <div className="hero-thumb-3">
              <div className={`hero-img hero-thumb-three ${isActive ? 'hero-img-active' : ''}`}>
                <img src={slide.image} alt="" />
              </div>
              <div className={`hero-thumb-shape ${isActive ? 'hero-shape-active' : ''}`}>
                <img src={ASSETS.shape} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroSlider() {
  const { openFormModal } = useFormModal();
  const { activeTab, selectTab } = useTab();
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    if (activeTab === 'digital') swiperRef.current?.slideTo(0);
    if (activeTab === 'web') swiperRef.current?.slideTo(1);
  }, [activeTab]);

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper?.autoplay) return;
    if (activeTab === 'software' || activeTab === 'contact') {
      swiper.autoplay.stop();
    } else {
      swiper.autoplay.start();
    }
  }, [activeTab]);

  const scrollToTarget = (targetId: string) => {
    if (activeTab !== 'digital' && targetId === 'client-results') {
      selectTab('digital', { scroll: false });
      window.setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
      return;
    }
    if (activeTab !== 'web' && targetId === 'web-client-websites') {
      selectTab('web', { scroll: false });
      window.setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
      return;
    }
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="hero-active">
      <Swiper
        modules={[EffectFade, Navigation, Autoplay]}
        effect="fade"
        speed={900}
        loop
        autoplay={{ delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        navigation={{
          nextEl: '.hero-active .owl-prev',
          prevEl: '.hero-active .owl-next',
        }}
        className="hero-active-swiper"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          if (activeTab === 'software' || activeTab === 'contact') return;
          const slide = slides[swiper.realIndex];
          if (slide.id === 'digital' || slide.id === 'web') {
            selectTab(slide.id, { scroll: false });
          }
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            {({ isActive }) => (
              <SlideContent
                slide={slide}
                isActive={isActive}
                onPrimary={openFormModal}
                onSecondary={() => scrollToTarget(slide.scrollTarget)}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="owl-nav" aria-hidden="true">
        <button type="button" className="owl-prev hero-nav-btn" aria-label="Next slide">
          next
        </button>
        <button type="button" className="owl-next hero-nav-btn" aria-label="Previous slide">
          prev
        </button>
      </div>
    </div>
  );
}
