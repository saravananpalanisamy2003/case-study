import { Code2 } from 'lucide-react';
import { useFormModal } from '../../context/FormModalContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export function SoftwareTab() {
  const { ref, visible } = useScrollReveal<HTMLElement>();
  const { openFormModal } = useFormModal();

  return (
    <div className="tab-panel animate-fade-in-up">
      <section ref={ref} className="relative min-h-[420px] overflow-hidden bg-[#050A1E] py-24 sm:min-h-[520px] sm:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,102,0,0.08)_0%,transparent_40%),radial-gradient(circle_at_70%_60%,rgba(255,102,0,0.06),transparent_45%)]" />
        <div className="pointer-events-none absolute left-0 top-0 h-full w-1/3 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.03)_0,rgba(255,255,255,0.03)_1px,transparent_1px,transparent_48px)]" />
        <div
          className={`relative mx-auto flex max-w-7xl flex-col items-center px-5 text-center sm:px-8 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-700`}
        >
          <div className="mb-8 grid h-16 w-16 place-items-center rounded-2xl border border-[#FF6600]/30 bg-[#FF6600]/10 text-[#FF6600]">
            <Code2 size={32} />
          </div>
          <h2 className="font-display text-4xl font-extrabold text-white sm:text-5xl">Software</h2>
          <button
            type="button"
            onClick={openFormModal}
            className="mt-10 rounded-full border border-white/20 px-8 py-3.5 text-sm font-bold text-white transition hover:border-[#FF6600] hover:bg-[#FF6600]"
          >
            Open enquiry form
          </button>
        </div>
      </section>
    </div>
  );
}
