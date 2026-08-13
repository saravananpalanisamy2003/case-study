import { ArrowUpRight, Quote } from 'lucide-react';
import { testimonials } from '../../data/content';
import { useFormModal } from '../../context/FormModalContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export function TestimonialsSection() {
  const { ref, visible } = useScrollReveal<HTMLElement>();
  const { openFormModal } = useFormModal();

  return (
    <section id="testimonials" ref={ref} className="scroll-mt-24 relative overflow-hidden bg-[#1A1008] py-20 text-white sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#FF6600] to-transparent" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className={`grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="lg:sticky lg:top-28">
            <Quote className="text-[#FF6600]" size={40} />
            <h2 className="mt-6 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
              Client Testimonials
            </h2>
            <button
              type="button"
              onClick={openFormModal}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#FF6600] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white hover:text-[#1A1008]"
            >
              Book My Free Growth Audit <ArrowUpRight size={16} />
            </button>
          </div>

          <div className="space-y-6">
            {testimonials.map(({ quote, author }, index) => (
              <blockquote
                key={author}
                className={`rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur transition-all duration-700 hover:border-[#FF6600]/30 hover:bg-white/10 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${150 + index * 100}ms` }}
              >
                <p className="text-lg leading-8 text-white/85">&ldquo;{quote}&rdquo;</p>
                <footer className="mt-6 text-xs font-bold uppercase tracking-[0.15em] text-[#FF6600]">
                  — {author}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
