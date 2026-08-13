import { Megaphone } from 'lucide-react';
import { socialBrands } from '../../data/content';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export function SocialMediaSection() {
  const { ref, visible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#FFF4ED] py-20 sm:py-24">
      <div className="absolute -right-20 top-0 h-64 w-64 rounded-full bg-[#FF6600]/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className={`grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FF6600] text-white">
              <Megaphone size={24} />
            </div>
            <h2 className="font-display text-3xl font-extrabold leading-tight text-[#1F1408] sm:text-4xl">
              Brand & Social Media Management
            </h2>
          </div>
          <ul className="space-y-4">
            {socialBrands.map((item, index) => {
              const [name, ...rest] = item.split(' — ');
              const description = rest.join(' — ');
              return (
                <li
                  key={item}
                  className={`flex gap-4 rounded-2xl border border-[#F0E0D6] bg-white p-5 transition-all duration-500 hover:-translate-x-1 hover:border-[#FF6600]/30 hover:shadow-lg ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'}`}
                  style={{ transitionDelay: `${150 + index * 70}ms` }}
                >
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#FF6600]" />
                  <div>
                    <p className="font-display font-bold text-[#1F1408]">{name}</p>
                    <p className="mt-1 text-sm leading-6 text-[#6B5E58]">{description}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
