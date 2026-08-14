import { ArrowUpRight, Rocket } from 'lucide-react';
import { useFormModal } from '../../context/FormModalContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { SectionHeader } from '../ui/SectionHeader';

export function BottomCTASection() {
  const { ref, visible } = useScrollReveal<HTMLElement>();
  const { openFormModal } = useFormModal();

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
        <div className="relative z-20 mx-auto max-w-3xl px-6 py-16 md:py-24 text-center">
          <SectionHeader icon={Rocket} title1="Ready to Accelerate" title2="Your Growth?" dark={true} />
          <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-white/90">
            Book a free 30-minute strategy call. We&apos;ll review your current search rankings, ad performance, and where you&apos;re losing potential customers — no obligation.
          </p>
          
          {/* Action Buttons Row */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5">
            
            <button
              type="button"
              onClick={openFormModal}
              className="group flex items-stretch bg-[#FF6600] shadow-lg transition-transform hover:-translate-y-1 w-full sm:w-auto overflow-hidden"
            >
              <span className="flex-1 px-4 py-3 md:px-6 md:py-4 text-xs md:text-sm font-bold uppercase tracking-wider text-white">
                Get Growth Audit
              </span>
              <div className="flex shrink-0 items-center justify-center bg-white px-3 md:px-4 text-[#FF6600] transition-colors group-hover:bg-gray-50">
                <ArrowUpRight size={20} />
              </div>
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}
