import { useEffect, useRef, useState } from 'react';
import { 
  Activity, Users, TrendingUp, Award, X, Check, Handshake, ArrowRight, ArrowUpRight, Rocket, Database, Layers, BarChart, Settings, Code, FileText, Quote
} from 'lucide-react';
import { 
  softwareHero, softwareMetrics, softwareBeforeAfter, softwareCompareRows, softwareModules, softwareCommitments, softwareTestimonial, softwareCTA
} from '../../data/softwareContent';
import { useFormModal } from '../../context/FormModalContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { SectionHeader } from '../ui/SectionHeader';
import { PremiumImageHover } from '../PremiumImageHover';

// Extend the existing software testimonial data with mock avatar and parsed roles
const augmentedSoftwareTestimonials = [
  {
    ...softwareTestimonial,
    authorRole: 'Management Team',
    authorName: 'Aarush Infotech',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80'
  }
];

const collageImages = [
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
];

// ----------------------------------------------------------------------
// Metrics Bar UI -> SoftwareMetricsSection
// ----------------------------------------------------------------------
const METRIC_ICONS = [Users, Handshake, Code, FileText];

function SoftwareMetricsSection() {
  const { ref, visible } = useScrollReveal<HTMLElement>();

  return (
    <section
      id="metrics"
      ref={ref}
      className={`relative z-10 bg-white py-12 shadow-lg shadow-[#1A1008]/5 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader icon={Activity} title1="Dashboard" title2="Live Tracking" />
        <div className="grid grid-cols-1 divide-y divide-[#F0E0D6] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4 rounded-2xl overflow-hidden border border-[#F0E0D6]">
        {softwareMetrics.map(({ value, label }, index) => {
          const Icon = METRIC_ICONS[index % METRIC_ICONS.length];
          return (
            <div
              key={label}
              className="group px-5 py-7 transition card-interactive hover:bg-[#FFF4ED] sm:px-7"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="flex items-center gap-3 mb-2 text-[#FF6600]">
                <Icon size={24} className="opacity-80 transition-transform group-hover:scale-110" />
                <p className="font-display text-3xl font-extrabold tracking-tight transition group-hover:scale-105 sm:text-4xl">
                  {value}
                </p>
              </div>
              <p className="text-xs leading-5 text-[#6B5E58] sm:text-sm">{label}</p>
            </div>
          );
        })}
      </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// Client Results UI -> SoftwareBeforeAfterSection
// ----------------------------------------------------------------------
function SoftwareBeforeAfterSection() {
  const { ref, visible } = useScrollReveal<HTMLElement>();
  const [activeCard, setActiveCard] = useState(0);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardsRef.current.indexOf(entry.target as HTMLElement);
            if (index !== -1) setActiveCard(index);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0.1 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={(el) => { ref.current = el; }} className="relative bg-[#FFFAF7] pt-12 pb-0">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className={`mb-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionHeader icon={TrendingUp} title1="What Changed" title2="Before vs After" />
        </div>

        {/* Scroll-triggered stacked cards container */}
        <div className="relative pb-0 flex flex-col">
          {softwareBeforeAfter.map((item, index) => {
            return (
              <div
                key={item.title}
                ref={(el) => (cardsRef.current[index] = el)}
                className={`static md:sticky transition-all duration-700 ease-out will-change-transform mb-8 md:mb-[60vh]`}
                style={{
                  top: `calc(120px + ${index * 24}px)`,
                  zIndex: index + 1,
                }}
              >
                <article className="shadow-[0_30px_60px_rgba(0,0,0,0.08)] rounded-3xl overflow-hidden border border-[#F0E0D6] bg-white group">
              <div className="grid lg:grid-cols-2 min-h-[400px]">
                {/* Left Side: Dark Before Presentation */}
                <div className="relative bg-[#1A1008] p-10 md:p-14 flex flex-col justify-center overflow-hidden">
                  <div className="absolute inset-0">
                    <img src={item.image} alt="Before context" className="w-full h-full object-cover opacity-80 mix-blend-normal grayscale group-hover:grayscale-0 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1008] via-[#1A1008]/70 to-black/30"></div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8">
                      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF6600] bg-[#FF6600]/10 px-4 py-1.5 rounded-full">
                        Before
                      </span>
                      <span className="text-4xl font-display font-bold text-white/10">0{index + 1}</span>
                    </div>
                    <p className="text-xl md:text-2xl font-light text-white/90 leading-relaxed">
                      "{item.before}"
                    </p>
                  </div>
                </div>

                {/* Right Side: Light After Presentation */}
                <div className="relative bg-white p-10 md:p-14 flex flex-col justify-center">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(255,102,0,0.03),transparent_50%)] pointer-events-none" />
                  
                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                      <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-[#8A7B74] mb-3">
                        After Inymart Labs
                      </span>
                      <div className="flex items-center gap-4 mb-6">
                        <div>
                          <h3 className="font-display text-2xl md:text-3xl font-extrabold leading-snug text-[#1F1408]">
                            {item.title}
                          </h3>
                          <p className="text-[11px] font-bold uppercase tracking-wide text-[#FF6600] mt-1">{item.type}</p>
                        </div>
                      </div>
                      <p className="text-base md:text-lg text-[#6B5E58] leading-relaxed">
                        {item.after}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
            );
          })}
          
          {/* Invisible anchor to cap the scroll stack */}
          <div
            className="static md:sticky mb-0 h-1 w-full pointer-events-none opacity-0"
            style={{
              top: `calc(120px + ${softwareBeforeAfter.length * 24}px + 450px)`,
              zIndex: 10,
            }}
          />
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// Why Choose UI -> SoftwareWhyChooseSection
// ----------------------------------------------------------------------
function SoftwareWhyChooseSection() {
  const { ref, visible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#1A1008] py-12 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,102,0,0.12),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(255,102,0,0.08),transparent_35%)]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionHeader icon={Award} title1="Why This Dashboard," title2="Not a Generic Tool" dark={true} />
        </div>

        <div className={`card-interactive overflow-hidden rounded-3xl border border-white/10 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="hidden grid-cols-2 border-b border-white/10 text-xs font-bold uppercase tracking-wider sm:grid">
            <div className="bg-red-950/40 p-5 text-red-400 border-r border-white/10 flex items-center gap-2">
              <X size={14} className="text-red-500" /> What Off-the-Shelf Software Does
            </div>
            <div className="bg-emerald-950/40 p-5 text-emerald-400 flex items-center gap-2">
              <Check size={14} className="text-emerald-500" /> What Inymart Labs Built
            </div>
          </div>
          {softwareCompareRows.map(([other, ours], index) => (
            <div key={other} className="grid border-b border-white/10 last:border-0 sm:grid-cols-2">
              <div className={`flex gap-3 border-b border-white/10 p-5 text-sm leading-6 text-white/70 sm:border-b-0 sm:border-r sm:p-6 transition-colors ${index % 2 === 0 ? 'bg-red-950/20' : 'bg-red-950/10'} hover:bg-red-900/30`}>
                <X size={18} className="mt-0.5 shrink-0 text-red-500" />
                <span>{other}</span>
              </div>
              <div className={`flex gap-3 p-5 text-sm font-medium leading-6 text-white/90 sm:p-6 transition-colors ${index % 2 === 0 ? 'bg-emerald-950/20' : 'bg-emerald-950/10'} hover:bg-emerald-900/30`}>
                <Check size={18} className="mt-0.5 shrink-0 text-emerald-400" />
                <span>{ours}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// Capabilities 2-Col UI -> SoftwareModulesSection
// ----------------------------------------------------------------------
function SoftwareModulesSection() {
  const { ref, visible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#FFF4ED] py-12 sm:py-20">
      <div className="absolute -right-20 top-0 h-64 w-64 rounded-full bg-[#FF6600]/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        
        {/* Top Heading */}
        <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionHeader icon={Database} title1="Featured Dashboard" title2="Modules" />
        </div>

        {/* 2-Column Grid */}
        <div className={`grid gap-12 lg:grid-cols-2 items-stretch transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Left Side: Cards */}
          <ul className="flex flex-col justify-between space-y-4">
            {softwareModules.map((item, index) => {
              const Icons = [Users, Layers, BarChart, Settings, FileText];
              const Icon = Icons[index % Icons.length];
              return (
                <li
                  key={item.name}
                  className={`card-interactive flex-1 flex gap-5 rounded-2xl border border-[#F0E0D6] bg-white p-5 md:p-6 transition-all duration-500 shadow-sm ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'}`}
                  style={{ transitionDelay: `${150 + index * 70}ms` }}
                >
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF4ED] text-[#FF6600]">
                    <Icon size={20} />
                  </div>
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                      <p className="font-display text-lg font-bold text-[#1F1408]">{item.name}</p>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#FF6600] bg-[#FF6600]/10 px-2 py-0.5 rounded-full inline-block w-max">{item.type}</span>
                    </div>
                    <p className="mt-1 text-sm leading-6 text-[#6B5E58] font-medium">{item.features}</p>
                    <p className="mt-2 text-xs leading-5 text-[#8A7B74] border-t border-[#F0E0D6] pt-2">Result: {item.result}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Right Side: Image matching height */}
          <div className={`relative hidden lg:block rounded-3xl overflow-hidden shadow-xl transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`} style={{ transitionDelay: '300ms' }}>
             <img 
               src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80" 
               alt="Dashboard Software" 
               className="absolute inset-0 w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-tr from-[#1A1008]/40 to-transparent"></div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// Commitment UI -> SoftwareCommitmentSection
// ----------------------------------------------------------------------
const softwareCommitmentImages = [
  'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
];

function SoftwareCommitmentSection() {
  const { ref, visible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="bg-white py-12 sm:py-20 border-t border-[#F0E0D6]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className={`mb-10 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionHeader icon={Handshake} title1="Our Commitment" title2="On This Build" />
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {softwareCommitments.map(({ title, text }, index) => {
            const image = softwareCommitmentImages[index] || softwareCommitmentImages[0];
            return (
              <div
                key={title}
                className={`card-interactive group rounded-3xl border border-[#F0E0D6] bg-[#FFFAF7] overflow-hidden transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <PremiumImageHover className="h-48" src={image} />
                <div className="p-8">
                  <h3 className="mb-4 font-display text-xl font-extrabold text-[#1F1408]">{title}</h3>
                  <p className="text-sm leading-relaxed text-[#6B5E58]">{text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// Testimonial UI (Adapted from WebLiveSitesSection) -> SoftwareTestimonialSection
// ----------------------------------------------------------------------
function SoftwareTestimonialSection() {
  const { ref, visible } = useScrollReveal<HTMLElement>();
  const [activeIndex, setActiveIndex] = useState(0);

  const current = augmentedSoftwareTestimonials[activeIndex];

  return (
    <section id="testimonials" ref={ref} className="bg-[#F8F9FA] py-12 overflow-hidden border-t border-[#F0E0D6]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionHeader icon={Quote} title1="Trusted By" title2="The Best" />
        </div>
        <div className={`mt-4 grid gap-16 lg:grid-cols-2 lg:items-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          
          {/* Left Column: 4-Image Collage */}
          <div className="relative w-full max-w-lg mx-auto lg:max-w-none grid grid-cols-2 grid-rows-2 gap-4">
            <img 
              src={collageImages[0]} 
              alt="Workspace Team" 
              className="w-full h-48 md:h-64 object-cover rounded-tl-[80px] rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px]" 
            />
            <img 
              src={collageImages[1]} 
              alt="Professional Women" 
              className="w-full h-48 md:h-64 object-cover rounded-tr-[80px] rounded-br-[20px] rounded-bl-[20px] rounded-tl-[20px]" 
            />
            <img 
              src={collageImages[2]} 
              alt="Workspace Meeting" 
              className="w-full h-48 md:h-64 object-cover rounded-bl-[80px] rounded-br-[20px] rounded-tr-[20px] rounded-tl-[20px]" 
            />
            <img 
              src={collageImages[3]} 
              alt="Professional Man" 
              className="w-full h-48 md:h-64 object-cover rounded-br-[80px] rounded-bl-[20px] rounded-tl-[20px] rounded-tr-[20px]" 
            />
            
            {/* Center Orange Quote Badge */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 bg-[#FF6600] rounded-full flex items-center justify-center border-8 border-[#F8F9FA] z-10 shadow-lg">
               <Quote size={48} className="text-white fill-white" />
            </div>
          </div>

          {/* Right Column: Testimonial Content & Carousel */}
          <div className="flex flex-col justify-center">
            
            <div className="mt-10 relative">
              <p className="text-xl md:text-2xl text-[#6B5E58] leading-relaxed pr-12 min-h-[160px]">
                {current.quote}
              </p>
              
              <div className="mt-10 flex items-center gap-5">
                <img src={current.avatar} alt={current.authorName} className="w-16 h-16 rounded-full object-cover shadow-sm" />
                <div>
                  <p className="font-display font-extrabold text-xl text-[#1F1408]">{current.authorName}</p>
                  <p className="text-sm font-medium text-gray-500 mt-1">{current.authorRole}</p>
                </div>
              </div>
              
              {/* Decorative Quote Mark */}
              <Quote 
                size={80} 
                className="absolute bottom-4 right-4 text-[#0F2E3C] fill-[#FF6600] text-transparent opacity-90 rotate-180 drop-shadow-xl" 
                style={{ filter: "drop-shadow(0px 10px 15px rgba(255, 102, 0, 0.2))" }}
              />
            </div>

            {/* Carousel Indicators and Navigation */}
            <div className="mt-12 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {augmentedSoftwareTestimonials.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`w-3.5 h-3.5 border transition-all ${
                      activeIndex === idx 
                        ? 'bg-[#FF6600] border-[#FF6600]' 
                        : 'bg-transparent border-[#1F1408] hover:border-[#FF6600]'
                    }`}
                    aria-label={`View testimonial ${idx + 1}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setActiveIndex((prev) => (prev === 0 ? augmentedSoftwareTestimonials.length - 1 : prev - 1))}
                  className="grid h-12 w-12 place-items-center rounded-full border border-[#1F1408]/20 text-[#1F1408] transition-colors hover:bg-[#FF6600] hover:text-white hover:border-[#FF6600]"
                  aria-label="Previous testimonial"
                >
                  <ArrowRight size={20} className="rotate-180" />
                </button>
                <button
                  onClick={() => setActiveIndex((prev) => (prev === augmentedSoftwareTestimonials.length - 1 ? 0 : prev + 1))}
                  className="grid h-12 w-12 place-items-center rounded-full border border-[#1F1408]/20 text-[#1F1408] transition-colors hover:bg-[#FF6600] hover:text-white hover:border-[#FF6600]"
                  aria-label="Next testimonial"
                >
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// Bottom CTA UI -> SoftwareBottomCTASection
// ----------------------------------------------------------------------
function SoftwareBottomCTASection({ onOpenForm }: { onOpenForm: () => void }) {
  const { ref, visible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="py-12 px-5 sm:px-8 bg-white">
      <div 
        className={`relative mx-auto max-w-6xl overflow-hidden rounded-[32px] md:rounded-[48px] bg-[#0A1A24] transition-all duration-700 shadow-2xl ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=80" 
            alt="Workspace" 
            className="w-full h-full object-cover opacity-30" 
          />
          <div className="absolute inset-0 bg-[#0A1A24]/70 mix-blend-multiply" />
        </div>

        <svg className="absolute top-0 left-0 text-[#FF6600] w-[200px] h-[250px] md:w-[300px] md:h-[400px] lg:w-[400px] lg:h-[500px] z-10" viewBox="0 0 100 100" preserveAspectRatio="none" fill="currentColor">
          <path d="M0,0 L100,0 C70,10 50,40 30,70 C15,90 0,100 0,100 Z" />
        </svg>

        <svg className="absolute bottom-0 right-0 text-[#FF6600] w-[200px] h-[250px] md:w-[300px] md:h-[400px] lg:w-[400px] lg:h-[500px] z-10" viewBox="0 0 100 100" preserveAspectRatio="none" fill="currentColor">
          <path d="M100,100 L0,100 C30,90 50,60 70,30 C85,10 100,0 100,0 Z" />
        </svg>

        <div className="relative z-20 mx-auto max-w-3xl px-6 py-16 md:py-24 text-center flex flex-col items-center">
          <SectionHeader icon={Rocket} title1={softwareCTA.headline} title2="" dark={true} />
          <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-white/90">
            {softwareCTA.subtext}
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5">
            <button
              type="button"
              onClick={onOpenForm}
              className="group flex items-stretch bg-[#FF6600] shadow-lg transition-transform hover:-translate-y-1 w-full sm:w-auto overflow-hidden"
            >
              <span className="flex-1 px-6 py-4 text-sm font-bold uppercase tracking-wider text-white">
                {softwareCTA.button}
              </span>
              <div className="flex shrink-0 items-center justify-center bg-white px-4 text-[#FF6600] transition-colors group-hover:bg-gray-50">
                <ArrowUpRight size={20} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// Main Tab Component
// ----------------------------------------------------------------------
export function SoftwareTab() {
  const { openFormModal } = useFormModal();

  return (
    <div className="tab-panel animate-fade-in-up">
      <SoftwareMetricsSection />
      <SoftwareBeforeAfterSection />
      <SoftwareWhyChooseSection />
      <SoftwareModulesSection />
      <SoftwareCommitmentSection />
      <SoftwareTestimonialSection />
      <SoftwareBottomCTASection onOpenForm={openFormModal} />
    </div>
  );
}
