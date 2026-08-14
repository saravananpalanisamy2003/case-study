import { ArrowUpRight, Briefcase } from 'lucide-react';
import { caseStudies } from '../../data/content';
import { useFormModal } from '../../context/FormModalContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { ClientLogo } from '../ClientLogo';
import { PremiumImageHover } from '../PremiumImageHover';
import { SectionHeader } from '../ui/SectionHeader';

const accents = [
  'from-orange-500/10 to-transparent',
  'from-amber-500/10 to-transparent',
  'from-rose-500/10 to-transparent',
  'from-sky-500/10 to-transparent',
  'from-blue-500/10 to-transparent',
  'from-emerald-500/10 to-transparent',
];

export function CaseStudiesSection() {
  const { ref, visible } = useScrollReveal<HTMLElement>();
  const { openFormModal } = useFormModal();

  return (
    <section id="case-studies" ref={ref} className="scroll-mt-24 bg-white py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionHeader icon={Briefcase} title1="Proven Strategies." title2="Measurable Impact." />
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {caseStudies.map((item, index) => (
            <article
              key={item.title}
              className={`card-interactive group relative flex min-h-[340px] flex-col overflow-hidden rounded-3xl border border-[#F0E0D6] bg-gradient-to-br ${accents[index % accents.length]} transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${100 + index * 60}ms` }}
            >
              <PremiumImageHover className="flex-1 min-h-[220px]" src={item.image}>
                <div className="absolute bottom-6 left-6 z-[5] flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-xl border border-white/20 bg-white p-1.5 shadow-lg">
                    <ClientLogo src={item.logo} alt={item.title} className="h-full w-full object-contain" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-extrabold text-white">{item.title}</h3>
                    <p className="text-[10px] font-bold uppercase tracking-wide text-white/75">{item.type}</p>
                  </div>
                </div>
              </PremiumImageHover>
              <div className="bg-white px-6 pb-6 pt-5 border-t border-[#F0E0D6]/80 z-10 relative">
                <p className="text-sm leading-6 text-[#6B5E58]">
                  <strong className="text-[#1F1408]">Services:</strong> {item.services}
                </p>
                <p className="mt-3 text-sm font-bold leading-6 text-[#E85D04]">
                  <strong className="text-[#1F1408]">Result:</strong> {item.result}
                </p>
              </div>
              <a
                href={item.website}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-[#1F1408] opacity-0 shadow transition group-hover:opacity-100 hover:bg-[#FF6600] hover:text-white"
                aria-label={`Visit ${item.title} website`}
              >
                <ArrowUpRight size={18} />
              </a>
            </article>
          ))}
        </div>

        <div className={`mt-12 flex justify-center transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <button
            type="button"
            onClick={openFormModal}
            className="inline-flex shrink-0 items-center gap-2 rounded-full border-2 border-[#1A1008] px-8 py-4 text-sm font-bold text-[#1A1008] transition hover:bg-[#1A1008] hover:text-white"
          >
            Get Your Free Growth Audit <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
