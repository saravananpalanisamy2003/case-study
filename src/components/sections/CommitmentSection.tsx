import { ArrowUpRight, ZoomIn, Handshake } from 'lucide-react';
import { commitments } from '../../data/content';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useFormModal } from '../../context/FormModalContext';
import { SectionHeader } from '../ui/SectionHeader';
import { PremiumImageHover } from '../PremiumImageHover';

// Reusing content but adding relevant premium images to match the new UI
const commitmentImages = [
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80', // Analytics/Reporting
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80', // AI/Network
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80', // Direct Meeting
];

export function CommitmentSection() {
  const { ref, visible } = useScrollReveal<HTMLElement>();
  const { openFormModal } = useFormModal();

  return (
    <section ref={ref} className="bg-[#FFFAF7] py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionHeader icon={Handshake} title1="Our Client" title2="Commitment" />
        </div>

        <div className="grid gap-x-8 gap-y-12 lg:grid-cols-3">
          {commitments.map(({ title, text }, index) => (
            <div
              key={title}
              className={`group relative transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${120 + index * 90}ms` }}
            >
              {/* Image Container with Hover Effect */}
              <PremiumImageHover 
                src={commitmentImages[index]} 
                alt={title}
                className="overflow-hidden rounded-[20px] shadow-sm"
                imgClassName="h-[280px] w-full object-cover"
              />

              {/* Text & Button Area */}
              <div className="mt-6 flex items-start justify-between gap-4">
                <div className="border-l-[3px] border-[#FF6600] pl-4">
                  <h3 className="font-display text-[22px] font-extrabold leading-snug text-[#1F1408]">
                    {title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#6B5E58]">
                    {text}
                  </p>
                </div>
                <button 
                  onClick={openFormModal}
                  className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#0F2E3C] text-white transition-colors hover:bg-[#FF6600]"
                  aria-label="View Details"
                >
                  <ArrowUpRight size={22} strokeWidth={2} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
