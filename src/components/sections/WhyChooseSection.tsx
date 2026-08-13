import { Check, X } from 'lucide-react';
import { compareRows } from '../../data/content';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export function WhyChooseSection() {
  const { ref, visible } = useScrollReveal<HTMLElement>();

  return (
    <section id="why-us" ref={ref} className="scroll-mt-24 relative overflow-hidden bg-[#1A1008] py-20 text-white sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,102,0,0.12),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(255,102,0,0.08),transparent_35%)]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className={`mb-12 max-w-2xl transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            Why Clients Choose Inymart Labs
          </h2>
        </div>

        <div className={`overflow-hidden rounded-3xl border border-white/10 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="hidden grid-cols-2 border-b border-white/10 text-xs font-bold uppercase tracking-wider sm:grid">
            <div className="bg-white/5 p-5 text-white/50">What Other Agencies Do</div>
            <div className="bg-[#FF6600]/20 p-5 text-[#FF6600]">What We Do</div>
          </div>
          {compareRows.map(([other, ours], index) => (
            <div
              key={other}
              className={`grid border-b border-white/10 last:border-0 sm:grid-cols-2 ${index % 2 === 0 ? 'bg-white/[0.02]' : 'bg-transparent'}`}
            >
              <div className="flex gap-3 border-b border-white/10 p-5 text-sm leading-6 text-white/55 sm:border-b-0 sm:border-r sm:p-6">
                <X size={16} className="mt-1 shrink-0 text-red-400/80" />
                <span>{other}</span>
              </div>
              <div className="flex gap-3 p-5 text-sm font-medium leading-6 text-white/90 sm:p-6">
                <Check size={16} className="mt-1 shrink-0 text-[#FF6600]" />
                <span>{ours}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
