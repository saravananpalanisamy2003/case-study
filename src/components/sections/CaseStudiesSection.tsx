import { ArrowUpRight } from 'lucide-react';
import { caseStudies } from '../../data/content';
import { useFormModal } from '../../context/FormModalContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';

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
    <section id="case-studies" ref={ref} className="scroll-mt-24 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className={`mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="max-w-2xl font-display text-3xl font-extrabold leading-tight text-[#1F1408] sm:text-4xl">
            Featured Case Studies
          </h2>
          <button
            type="button"
            onClick={openFormModal}
            className="inline-flex shrink-0 items-center gap-2 rounded-full border-2 border-[#1A1008] px-5 py-3 text-sm font-bold text-[#1A1008] transition hover:bg-[#1A1008] hover:text-white"
          >
            Get Your Free Growth Audit <ArrowUpRight size={16} />
          </button>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {caseStudies.map((item, index) => (
            <article
              key={item.title}
              className={`group relative flex min-h-[300px] flex-col overflow-hidden rounded-3xl border border-[#F0E0D6] bg-gradient-to-br ${accents[index % accents.length]} p-6 transition-all duration-700 hover:-translate-y-2 hover:border-[#FF6600]/40 hover:shadow-2xl hover:shadow-[#FF6600]/10 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${100 + index * 60}ms` }}
            >
              <h3 className="font-display text-2xl font-extrabold text-[#1F1408]">{item.title}</h3>
              <p className="mt-1 text-xs font-bold uppercase tracking-wide text-[#8A7B74]">{item.type}</p>
              <div className="mt-auto border-t border-[#F0E0D6]/80 pt-5">
                <p className="text-sm leading-6 text-[#6B5E58]">
                  <strong className="text-[#1F1408]">Services:</strong> {item.services}
                </p>
                <p className="mt-3 text-sm font-bold leading-6 text-[#E85D04]">
                  <strong className="text-[#1F1408]">Result:</strong> {item.result}
                </p>
              </div>
              <button
                type="button"
                onClick={openFormModal}
                className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-white/80 text-[#1F1408] opacity-0 shadow transition group-hover:opacity-100 hover:bg-[#FF6600] hover:text-white"
                aria-label="Open enquiry form"
              >
                <ArrowUpRight size={18} />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
