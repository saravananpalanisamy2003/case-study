import { Check, X, Award } from 'lucide-react';
import { compareRows } from '../../data/content';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { SectionHeader } from '../ui/SectionHeader';

export function WhyChooseSection() {
  const { ref, visible } = useScrollReveal<HTMLElement>();

  return (
    <section id="why-us" ref={ref} className="scroll-mt-24 relative overflow-hidden bg-[#1A1008] py-12 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,102,0,0.12),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(255,102,0,0.08),transparent_35%)]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionHeader icon={Award} title1="Why Clients Choose" title2="Inymart Labs" dark={true} />
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
          {compareRows.map(([other, ours], index) => (
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
