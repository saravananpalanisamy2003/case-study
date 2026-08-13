import { ArrowUpRight } from 'lucide-react';
import { useFormModal } from '../../context/FormModalContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export function BottomCTASection() {
  const { ref, visible } = useScrollReveal<HTMLElement>();
  const { openFormModal } = useFormModal();

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#FF6600] py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent_50%)]" />
      <div
        className={`relative mx-auto max-w-4xl px-5 text-center transition-all duration-700 sm:px-8 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <h2 className="font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
          Ready to See What a Results-Focused Agency Can Do for Your Brand?
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/85">
          Book a free 30-minute strategy call. We&apos;ll review your current search rankings, ad performance, and where you&apos;re losing potential customers — no obligation.
        </p>
        <button
          type="button"
          onClick={openFormModal}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#1A1008] px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:scale-105 hover:bg-white hover:text-[#1A1008]"
        >
          Book My Free Growth Audit <ArrowUpRight size={18} />
        </button>
      </div>
    </section>
  );
}
