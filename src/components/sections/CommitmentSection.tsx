import { BarChart3, MousePointer2, Sparkles } from 'lucide-react';
import { commitments } from '../../data/content';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const icons = [BarChart3, Sparkles, MousePointer2];

export function CommitmentSection() {
  const { ref, visible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="bg-[#FFFAF7] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className={`mb-12 max-w-2xl transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="font-display text-3xl font-extrabold leading-tight text-[#1F1408] sm:text-4xl">
            Our Client Commitment
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {commitments.map(({ title, text }, index) => {
            const Icon = icons[index];
            return (
              <div
                key={title}
                className={`group relative overflow-hidden rounded-3xl border border-[#F0E0D6] bg-white p-8 transition-all duration-700 hover:-translate-y-2 hover:border-[#FF6600]/30 hover:shadow-xl ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${120 + index * 90}ms` }}
              >
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#FF6600]/5 transition group-hover:scale-150" />
                <div className="relative mb-8 grid h-12 w-12 place-items-center rounded-xl bg-[#1A1008] text-[#FF6600]">
                  <Icon size={22} />
                </div>
                <h3 className="relative font-display text-xl font-extrabold text-[#1F1408]">{title}</h3>
                <p className="relative mt-3 text-sm leading-7 text-[#6B5E58]">{text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
