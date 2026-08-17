import { useState } from 'react';
import { ArrowRight, Quote, Star, MessageSquare } from 'lucide-react';
import { testimonials } from '../../data/content';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { SectionHeader } from '../ui/SectionHeader';

// Extend the existing testimonials data with mock avatars and parsed roles for the UI
const augmentedTestimonials = testimonials.map((t, index) => {
  const parts = t.author.split(', ');
  return {
    ...t,
    authorRole: parts.length > 1 ? parts[0] : 'Client',
    authorName: parts.length > 1 ? parts.slice(1).join(', ') : parts[0],
    avatar: index === 0 
      ? 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80' // Professional woman
      : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'  // Professional man
  };
});

const collageImages = [
  'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=400&q=80',
];

export function TestimonialsSection() {
  const { ref, visible } = useScrollReveal<HTMLElement>();
  const [activeIndex, setActiveIndex] = useState(0);

  const current = augmentedTestimonials[activeIndex];

  return (
    <section id="testimonials" ref={ref} className="bg-[#F8F9FA] py-12 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionHeader icon={MessageSquare} title1="Trusted By" title2="The Best" />
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
            
            <div className="flex items-center gap-3 text-sm font-bold text-gray-500 uppercase tracking-wide">
               <div className="flex gap-1 text-[#FF6600]">
                 <Star size={18} className="fill-current" />
                 <Star size={18} className="fill-current" />
                 <Star size={18} className="fill-current" />
                 <Star size={18} className="fill-current" />
                 <Star size={18} className="fill-current" />
               </div>
               <span>(5) AVERAGE RATING</span>
            </div>

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
                className="absolute bottom-4 right-4 w-12 h-12 md:w-20 md:h-20 text-[#0F2E3C] fill-[#FF6600] text-transparent opacity-90 rotate-180 drop-shadow-xl" 
                style={{ filter: "drop-shadow(0px 10px 15px rgba(255, 102, 0, 0.2))" }}
              />
            </div>

            {/* Carousel Indicators and Navigation */}
            <div className="mt-12 flex items-center justify-end">
              <div className="hidden">
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setActiveIndex((prev) => (prev === 0 ? augmentedTestimonials.length - 1 : prev - 1))}
                  className="grid h-12 w-12 place-items-center rounded-full border border-[#1F1408]/20 text-[#1F1408] transition-colors hover:bg-[#FF6600] hover:text-white hover:border-[#FF6600]"
                  aria-label="Previous testimonial"
                >
                  <ArrowRight size={20} className="rotate-180" />
                </button>
                <button
                  onClick={() => setActiveIndex((prev) => (prev === augmentedTestimonials.length - 1 ? 0 : prev + 1))}
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
