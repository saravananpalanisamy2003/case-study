import { ArrowRight } from 'lucide-react';
import { clientResults, clientResultsProof } from '../../data/content';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export function ClientResultsSection() {
  const { ref, visible } = useScrollReveal<HTMLElement>();

  return (
    <section id="client-results" ref={ref} className="scroll-mt-24 bg-[#FFFAF7] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className={`mb-14 max-w-3xl transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="font-display text-3xl font-extrabold leading-tight text-[#1F1408] sm:text-4xl">
            Client Results — Before vs After
          </h2>
        </div>

        <div className="space-y-5">
          {clientResults.map((item, index) => (
            <article
              key={item.title}
              className={`group overflow-hidden rounded-3xl border border-[#F0E0D6] bg-white transition-all duration-700 hover:-translate-y-1 hover:border-[#FF6600]/30 hover:shadow-xl hover:shadow-[#FF6600]/10 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${120 + index * 70}ms` }}
            >
              <div className="grid lg:grid-cols-[280px_1fr]">
                <div className="flex items-center border-b border-[#F0E0D6] bg-[#1A1008] p-6 text-white lg:border-b-0 lg:border-r">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF6600]">
                      0{index + 1}
                    </span>
                    <h3 className="mt-3 font-display text-lg font-bold leading-snug">{item.title}</h3>
                  </div>
                </div>
                <div className="grid gap-0 md:grid-cols-2">
                  <div className="border-b border-[#F0E0D6] p-6 md:border-b-0 md:border-r">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#8A7B74]">Before</p>
                    <p className="text-sm leading-7 text-[#6B5E58]">{item.before}</p>
                  </div>
                  <div className="relative bg-[#FFF4ED] p-6">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#FF6600]">
                      After Inymart Labs
                    </p>
                    <p className="text-sm leading-7 text-[#1F1408]">{item.after}</p>
                    <ArrowRight
                      size={18}
                      className="absolute bottom-6 right-6 text-[#FF6600] opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"
                    />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p
          className={`mt-10 rounded-2xl border border-[#FF6600]/20 bg-[#FFF4ED] px-6 py-5 text-sm leading-7 text-[#1F1408] transition-all duration-700 delay-500 sm:text-base ${visible ? 'opacity-100' : 'opacity-0'}`}
        >
          {clientResultsProof}
        </p>
      </div>
    </section>
  );
}
