import { Share2, Coffee, MessageSquare, Briefcase, Factory, Camera } from 'lucide-react';
import { socialBrands } from '../../data/content';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { SectionHeader } from '../ui/SectionHeader';

export function SocialMediaSection() {
  const { ref, visible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#FFF4ED] py-12">
      <div className="absolute -right-20 top-0 h-64 w-64 rounded-full bg-[#FF6600]/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        
        {/* Top Heading */}
        <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionHeader icon={Share2} title1="Brand & Social Media" title2="Management" />
        </div>

        {/* 2-Column Grid */}
        <div className={`grid gap-12 lg:grid-cols-2 items-stretch transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Left Side: Cards */}
          <ul className="flex flex-col justify-between space-y-4">
            {socialBrands.map((item, index) => {
              const [name, ...rest] = item.split(' — ');
              const description = rest.join(' — ');
              const Icons = [Coffee, MessageSquare, Briefcase, Factory, Camera];
              const Icon = Icons[index % Icons.length];
              return (
                <li
                  key={item}
                  className={`card-interactive flex-1 flex gap-5 rounded-2xl border border-[#F0E0D6] bg-white p-5 md:p-6 transition-all duration-500 shadow-sm ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'}`}
                  style={{ transitionDelay: `${150 + index * 70}ms` }}
                >
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF4ED] text-[#FF6600]">
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="font-display text-lg font-bold text-[#1F1408]">{name}</p>
                    <p className="mt-1 text-sm leading-6 text-[#6B5E58]">{description}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Right Side: Image matching height */}
          <div className={`relative hidden lg:block rounded-3xl overflow-hidden shadow-xl transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`} style={{ transitionDelay: '300ms' }}>
             <img 
               src={`${import.meta.env.BASE_URL}SMM (home).png`} 
               alt="Social Media Management" 
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
