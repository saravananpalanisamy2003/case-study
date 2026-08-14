import { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { ArrowRight } from 'lucide-react';
import { useFormModal } from '../context/FormModalContext';
import { useTab } from '../context/TabContext';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

const slides = [
  {
    id: 'digital',
    image: `${import.meta.env.BASE_URL}digital marketing.png`,
    badge: 'Trusted by 50+ Growing Brands Across India',
    title: (
      <>
        Real Growth Stories. <span>Measurable Results.</span><br/>No Vanity Metrics.
      </>
    ),
    description:
      'We help brands win on Search, AI Answer Engines, and Paid Ads — with strategies built on data, not guesswork. See how 50+ businesses across retail, real estate, EdTech, and B2B scaled with Inymart Labs.',
    primaryCta: 'Get Your Free Growth Audit',
    secondaryCta: 'Explore Services',
    scrollTarget: 'client-results',
  },
  {
    id: 'web',
    image: `${import.meta.env.BASE_URL}web development.png`,
    badge: 'Trusted by 50+ Growing Brands Across India',
    title: (
      <>
        Websites Built to <span>Work.</span><br/>Not Just Look Good.
      </>
    ),
    description:
      "We design and build websites that turn visitors into enquiries — with UI/UX and development decisions shaped by each client's real business, not generic templates. See how we've built websites for coworking, education, manufacturing, and interior design brands across Tamil Nadu.",
    primaryCta: 'Get a Free Website Review',
    secondaryCta: 'Explore Services',
    scrollTarget: 'web-client-websites',
  },
  {
    id: 'software',
    image: `${import.meta.env.BASE_URL}software.png`,
    badge: 'Enterprise Grade Solutions',
    title: (
      <>
        Custom Software <span>Development.</span><br/>Scalable & Secure.
      </>
    ),
    description:
      'We build robust, custom software solutions designed to streamline your operations and accelerate growth. From complex integrations to scalable SaaS platforms, our engineering team delivers excellence.',
    primaryCta: 'Discuss Your Project',
    secondaryCta: 'Explore Services',
    scrollTarget: 'software',
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
    <div className="relative w-full min-h-[700px] h-screen max-h-[900px] overflow-hidden flex items-center bg-[#f4f7f9]">
      {/* Background Image Area (Full Size) */}
      <div className={`absolute top-0 right-0 w-full h-full transition-transform duration-[1.5s] ease-out ${isActive ? 'scale-100' : 'scale-105'}`}>
         <img src={slide.image} alt="" className="w-full h-full object-cover object-[center_top] md:object-center" />
         {/* Gradient Overlay covering only the left side (content area) */}
         <div className="absolute inset-y-0 left-0 w-full md:w-4/5 lg:w-3/4 bg-gradient-to-r from-[#0A1A24]/95 via-[#0A1A24]/80 to-transparent"></div>
      </div>


      {/* Content */}
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 relative z-20">
        <div className="w-full md:w-[85%] lg:w-[80%] pt-32 pb-8 md:py-0">
          <div className={`hero-anim ${isActive ? 'hero-anim-active' : ''} mb-8`}>
             <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold text-white uppercase tracking-widest shadow-sm">
               <span className="w-2 h-2 rounded-full bg-[#FF6600]"></span>
               {slide.badge}
             </span>
          </div>

          <div className={`hero-anim hero-anim-2 ${isActive ? 'hero-anim-active' : ''} mb-6`}>
            <h1 className="text-[1.75rem] md:text-[2.1rem] lg:text-[2.6rem] font-extrabold text-white leading-[1.2] tracking-tight font-display [&>span]:text-[#FF6600]">
              {slide.title}
            </h1>
          </div>

          <div className={`hero-anim hero-anim-3 ${isActive ? 'hero-anim-active' : ''} mb-6 md:mb-10`}>
            <p className="text-base md:text-lg text-white/90 leading-relaxed max-w-md">
              {slide.description}
            </p>
          </div>

          <div className={`hero-anim hero-anim-4 ${isActive ? 'hero-anim-active' : ''}`}>
             <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
               <button onClick={onPrimary} className="bg-[#FF6600] hover:bg-[#E85D04] text-white px-7 py-3.5 rounded-full font-semibold transition-all flex items-center gap-2 text-sm shadow-xl hover:shadow-2xl">
                 {slide.primaryCta} <ArrowRight size={16} />
               </button>
               <button onClick={onSecondary} className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-7 py-3.5 rounded-full font-semibold transition-all flex items-center gap-2 text-sm hover:border-white/40 shadow-sm backdrop-blur-sm">
                 {slide.secondaryCta}
               </button>
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

  const scrollToTarget = (targetId: string) => {
    if (targetId === 'software') {
        selectTab('software', { scroll: false });
        window.setTimeout(() => {
          document.querySelector('.tab-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 120);
        return;
    }
    
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
    <div className="relative group">
      <Swiper
        modules={[EffectFade, Navigation, Autoplay]}
        effect="fade"
        speed={1000}
        loop
        autoplay={{ delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        navigation={{
          nextEl: '.vr-vert-next',
          prevEl: '.vr-vert-prev',
        }}
        className="w-full h-full"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
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

        {/* Desktop Navigation Controls */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-[60] hidden md:flex flex-col items-center gap-4">
           <button className="vr-vert-prev outline-none cursor-pointer w-14 h-14 flex items-center justify-center bg-[#FF6600] text-white rounded-full shadow-2xl hover:bg-[#E85D04] transition-all hover:scale-110">
             <ArrowRight className="-rotate-90" size={28} strokeWidth={3} />
           </button>
           <button className="vr-vert-next outline-none cursor-pointer w-14 h-14 flex items-center justify-center bg-[#FF6600] text-white rounded-full shadow-2xl hover:bg-[#E85D04] transition-all hover:scale-110">
             <ArrowRight className="rotate-90" size={28} strokeWidth={3} />
           </button>
        </div>

        {/* Mobile Navigation Controls */}
        <div className="md:hidden absolute bottom-6 right-6 z-[60] flex items-center gap-4">
          <button className="vr-vert-prev w-12 h-12 flex items-center justify-center bg-[#FF6600] text-white rounded-full shadow-xl hover:bg-[#E85D04] transition-all">
             <ArrowRight className="rotate-180" size={24} strokeWidth={3} />
          </button>
          <button className="vr-vert-next w-12 h-12 flex items-center justify-center bg-[#FF6600] text-white rounded-full shadow-xl hover:bg-[#E85D04] transition-all">
             <ArrowRight size={24} strokeWidth={3} />
          </button>
        </div>
      </Swiper>

    </div>
  );
}
