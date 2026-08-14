import { useEffect, useRef, useState } from 'react';
import { 
  Activity, Users, TrendingUp, Clock, Trophy, Award, X, Check, Handshake, Monitor, ExternalLink, ArrowRight, ArrowUpRight, Rocket
} from 'lucide-react';
import { 
  webDevCapabilities, webDevClientWebsites, webDevCommitments, webDevCompareRows, webDevFootprint, webDevLiveSites 
} from '../../data/webDevelopmentContent';
import { useFormModal } from '../../context/FormModalContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { SectionHeader } from '../ui/SectionHeader';
import { PremiumImageHover } from '../PremiumImageHover';
import { ClientLogo } from '../ClientLogo';

// ----------------------------------------------------------------------
// Metrics Bar UI -> WebFootprintSection
// ----------------------------------------------------------------------
const METRIC_ICONS = [Users, TrendingUp, Clock, Trophy];

function WebFootprintSection() {
  const { ref, visible } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className={`relative z-10 border-y border-[#F0E0D6] bg-white py-12 shadow-lg shadow-[#1A1008]/5 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader icon={Activity} title1="Our Web Development" title2="Footprint" />
        <div className="grid grid-cols-1 divide-y divide-[#F0E0D6] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4 rounded-2xl overflow-hidden border border-[#F0E0D6]">
        {webDevFootprint.map(({ value, label }, index) => {
          const Icon = METRIC_ICONS[index % METRIC_ICONS.length];
          return (
            <div
              key={value}
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
// Client Results UI -> WebClientWebsitesSection
// ----------------------------------------------------------------------
function WebClientWebsitesSection() {
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

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section 
      ref={(el) => {
        ref.current = el;
      }} 
      className="relative bg-[#FFFAF7] pt-12 pb-0"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className={`mb-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionHeader icon={Monitor} title1="Client Websites" title2="Before & After" />
        </div>

        {/* Scroll-triggered stacked cards container */}
        <div className="relative pb-0 flex flex-col">
          {webDevClientWebsites.map((item, index) => {
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
                  {/* Background Image for BEFORE */}
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
                        <div className="grid h-12 w-12 place-items-center rounded-lg bg-white border border-[#F0E0D6] p-2 shadow-sm">
                          <ClientLogo src={item.logo} alt={item.title} className="h-full w-full object-contain" />
                        </div>
                        <div>
                          <h3 className="font-display text-2xl md:text-3xl font-extrabold leading-snug text-[#1F1408]">
                            {item.title}
                          </h3>
                          <p className="text-[11px] font-bold uppercase tracking-wide text-[#6B5E58]">{item.type}</p>
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
              top: `calc(120px + ${webDevClientWebsites.length * 24}px + 450px)`,
              zIndex: 10,
            }}
          />
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// Why Choose UI -> WebWhyChooseSection
// ----------------------------------------------------------------------
function WebWhyChooseSection() {
  const { ref, visible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#1A1008] py-12 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,102,0,0.12),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(255,102,0,0.08),transparent_35%)]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionHeader icon={Award} title1="Why Choose" title2="Inymart Labs" dark={true} />
        </div>

        <div className={`card-interactive overflow-hidden rounded-3xl border border-white/10 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="hidden grid-cols-2 border-b border-white/10 text-xs font-bold uppercase tracking-wider sm:grid">
            <div className="bg-red-950/40 p-5 text-red-400 border-r border-white/10 flex items-center gap-2">
              <X size={14} className="text-red-500" /> What Other Agencies Do
            </div>
            <div className="bg-emerald-950/40 p-5 text-emerald-400 flex items-center gap-2">
              <Check size={14} className="text-emerald-500" /> What We Do
            </div>
          </div>
          {webDevCompareRows.map(([other, ours], index) => (
            <div
              key={other}
              className="grid border-b border-white/10 last:border-0 sm:grid-cols-2"
            >
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
// Generic Section -> WebCapabilitiesSection
// ----------------------------------------------------------------------
function WebCapabilitiesSection() {
  const { ref, visible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#FFF4ED] py-12">
      <div className="absolute -right-20 top-0 h-64 w-64 rounded-full bg-[#FF6600]/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        
        {/* Top Heading */}
        <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionHeader icon={Monitor} title1="Our Development" title2="Capabilities" />
        </div>

        {/* 2-Column Grid */}
        <div className={`grid gap-12 lg:grid-cols-2 items-stretch transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Left Side: Content Card */}
          <div className={`card-interactive flex flex-col justify-center rounded-2xl border border-[#F0E0D6] bg-white p-8 md:p-10 transition-all duration-500 shadow-sm ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'}`} style={{ transitionDelay: '150ms' }}>
            <p className="text-lg leading-8 text-[#475569]">
              {webDevCapabilities}
            </p>
          </div>

          {/* Right Side: Image matching height */}
          <div className={`relative hidden lg:block rounded-3xl overflow-hidden shadow-xl transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`} style={{ transitionDelay: '300ms' }}>
             <img 
               src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80" 
               alt="Web Development" 
               className="absolute inset-0 w-full h-full object-cover"
             />
             {/* Subtle gradient overlay to make it look premium */}
             <div className="absolute inset-0 bg-gradient-to-tr from-[#1A1008]/40 to-transparent"></div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// Commitment UI -> WebCommitmentSection
// ----------------------------------------------------------------------
// Same images used in the CommitmentSection of Digital Marketing to keep UI consistent
const commitmentImages = [
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80',
];

function WebCommitmentSection() {
  const { ref, visible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="bg-white py-12 sm:py-20 border-t border-[#F0E0D6]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className={`mb-10 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionHeader icon={Handshake} title1="Our Client" title2="Commitment" />
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {webDevCommitments.map(({ title, text }, index) => {
            const image = commitmentImages[index] || commitmentImages[0];
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
// Generic Section -> WebLiveSitesSection
// ----------------------------------------------------------------------
function WebLiveSitesSection() {
  const { ref, visible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="bg-[#1A1008] py-12 sm:py-20 text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className={`mb-10 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionHeader icon={ExternalLink} title1="See The Work" title2="Live" dark={true} />
        </div>
        
        <p className={`mb-10 max-w-2xl text-white/70 transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Rather than quote quality secondhand, we&apos;d rather you see it directly. Explore the live websites built as part of these case studies:
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {webDevLiveSites.map(({ name, url }, index) => (
            <a
              key={url}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`card-interactive group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 transition hover:border-[#FF6600]/40 hover:bg-[#FF6600]/10 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${150 + index * 70}ms` }}
            >
              <div>
                <span className="font-display text-lg font-bold text-white block mb-1">{name}</span>
                <span className="text-xs text-white/50">{url.replace('https://', '')}</span>
              </div>
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#FF6600] group-hover:bg-[#FF6600] group-hover:text-white transition-colors">
                <ExternalLink size={16} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// Bottom CTA UI -> WebBottomCTASection
// ----------------------------------------------------------------------
function WebBottomCTASection({ onOpenForm }: { onOpenForm: () => void }) {
  const { ref, visible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="py-12 px-5 sm:px-8">
      <div 
        className={`relative mx-auto max-w-6xl overflow-hidden rounded-[32px] md:rounded-[48px] bg-[#0A1A24] transition-all duration-700 shadow-2xl ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=80" 
            alt="Workspace" 
            className="w-full h-full object-cover opacity-30" 
          />
          <div className="absolute inset-0 bg-[#0A1A24]/70 mix-blend-multiply" />
        </div>

        {/* Top Left Organic Shape */}
        <svg className="absolute top-0 left-0 text-[#FF6600] w-[200px] h-[250px] md:w-[300px] md:h-[400px] lg:w-[400px] lg:h-[500px] z-10" viewBox="0 0 100 100" preserveAspectRatio="none" fill="currentColor">
          <path d="M0,0 L100,0 C70,10 50,40 30,70 C15,90 0,100 0,100 Z" />
        </svg>

        {/* Bottom Right Organic Shape */}
        <svg className="absolute bottom-0 right-0 text-[#FF6600] w-[200px] h-[250px] md:w-[300px] md:h-[400px] lg:w-[400px] lg:h-[500px] z-10" viewBox="0 0 100 100" preserveAspectRatio="none" fill="currentColor">
          <path d="M100,100 L0,100 C30,90 50,60 70,30 C85,10 100,0 100,0 Z" />
        </svg>

        {/* Content */}
        <div className="relative z-20 mx-auto max-w-3xl px-6 py-16 md:py-24 text-center flex flex-col items-center">
          <SectionHeader icon={Rocket} title1="Ready for a Website That" title2="Works as Hard as Your Business?" dark={true} />
          <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-white/90">
            Book a free website review. We&apos;ll look at your current site&apos;s structure, UI/UX, and conversion path — no obligation.
          </p>
          
          {/* Action Buttons Row */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5">
            <button
              type="button"
              onClick={onOpenForm}
              className="group flex items-stretch bg-[#FF6600] shadow-lg transition-transform hover:-translate-y-1 w-full sm:w-auto overflow-hidden"
            >
              <span className="flex-1 px-6 py-4 text-sm font-bold uppercase tracking-wider text-white">
                Book My Free Website Review
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
export function WebDevelopmentTab() {
  const { openFormModal } = useFormModal();

  return (
    <div className="tab-panel animate-fade-in-up">
      <WebFootprintSection />
      <WebClientWebsitesSection />
      <WebWhyChooseSection />
      <WebCapabilitiesSection />
      <WebCommitmentSection />
      <WebLiveSitesSection />
      <WebBottomCTASection onOpenForm={openFormModal} />
    </div>
  );
}
