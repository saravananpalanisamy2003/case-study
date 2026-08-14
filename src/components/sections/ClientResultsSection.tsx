import { useEffect, useRef, useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { clientResults, clientResultsProof } from '../../data/content';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { SectionHeader } from '../ui/SectionHeader';

const beforeImages = [
  'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80', // Organic farming
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80', // Real Estate
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80', // Coworking
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80', // Office
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80', // Industrial
  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80', // EdTech
];

export function ClientResultsSection() {
  const { ref, visible } = useScrollReveal<HTMLElement>();
  const [activeCard, setActiveCard] = useState(0);
  const [sectionInView, setSectionInView] = useState(false);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement | null>(null);

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

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        setSectionInView(entries[0].isIntersecting);
      },
      { rootMargin: '-10% 0px -10% 0px' }
    );
    if (sectionRef.current) sectionObserver.observe(sectionRef.current);

    return () => {
      observer.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  return (
    <section 
      id="client-results" 
      ref={(el) => {
        ref.current = el;
      }} 
      className="relative bg-[#FFFAF7] pt-12 pb-0"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className={`mb-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionHeader icon={TrendingUp} title1="Real Client" title2="Results" />
        </div>

        {/* Scroll-triggered stacked cards container */}
        <div className="relative pb-0 flex flex-col">
          {clientResults.map((item, index) => {
            return (
              <div
                key={item.title}
                ref={(el) => (cardsRef.current[index] = el)}
                className="static md:sticky transition-all duration-700 ease-out will-change-transform mb-8 md:mb-[60vh]"
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
                    <img src={beforeImages[index]} alt="Before context" className="w-full h-full object-cover opacity-80 mix-blend-normal" />
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
                  
                  <div className="relative z-10">
                    <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-[#8A7B74] mb-3">
                      After Inymart Labs
                    </span>
                    <h3 className="font-display text-2xl md:text-3xl font-extrabold leading-snug text-[#1F1408] mb-6">
                      {item.title}
                    </h3>
                    <p className="text-base md:text-lg text-[#6B5E58] leading-relaxed">
                      {item.after}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>
            );
          })}
          
          {/* Treat the proof box as the final "7th card" to eliminate empty space while preserving Card 6's runway */}
          <div
            className="static md:sticky transition-all duration-700 ease-out will-change-transform mb-0"
            style={{
              top: `calc(120px + ${5 * 24}px + 450px)`,
              zIndex: 10,
            }}
          >
            <div
              className={`rounded-3xl border border-[#FF6600]/20 bg-[#FFF4ED] px-8 py-6 text-sm leading-7 text-[#1F1408] transition-all duration-700 delay-500 sm:text-base shadow-sm ${visible ? 'opacity-100' : 'opacity-0'}`}
            >
              {clientResultsProof}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
