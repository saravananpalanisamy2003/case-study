import { ArrowUpRight, Check, ExternalLink, Globe2, Layers3, MapPin, Monitor, X } from 'lucide-react';
import {
  webDevCapabilities,
  webDevClientWebsites,
  webDevCommitments,
  webDevCompareRows,
  webDevFootprint,
  webDevLiveSites,
} from '../../data/webDevelopmentContent';
import { useFormModal } from '../../context/FormModalContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export function WebDevelopmentTab() {
  const { openFormModal } = useFormModal();

  return (
    <div className="tab-panel animate-fade-in-up">
      <WebFootprintSection />
      <WebClientWebsitesSection />
      <WebWhyChooseSection />
      <WebCapabilitiesSection />
      <WebCommitmentSection />
      <WebLiveSitesSection />
      <WebBottomCTASection onOpenForm={openFormModal} />
    </div>
  );
}

function WebFootprintSection() {
  const { ref, visible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="relative z-10 -mt-6 border-y border-[#E0E8F0] bg-[#F4F8FC] py-14 sm:-mt-8 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className={`mb-10 max-w-3xl transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="font-display text-3xl font-extrabold leading-tight text-[#0F172A] sm:text-4xl">
            Our Web Development Footprint
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#64748B] sm:text-base">
            We only publish numbers we can stand behind. Here&apos;s what&apos;s genuinely true about our web development practice today:
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {webDevFootprint.map(({ value, label }, index) => (
            <div
              key={value}
              className={`rounded-2xl border border-[#DDE7F0] bg-white p-6 shadow-sm transition-all duration-700 hover:-translate-y-1 hover:border-[#FF6600]/30 hover:shadow-lg ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${80 + index * 70}ms` }}
            >
              <p className="font-display text-3xl font-extrabold text-[#FF6600] sm:text-4xl">{value}</p>
              <p className="mt-2 text-sm leading-6 text-[#64748B]">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WebClientWebsitesSection() {
  const { ref, visible } = useScrollReveal<HTMLElement>();

  return (
    <section id="web-client-websites" ref={ref} className="scroll-mt-32 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <h2
          className={`mb-14 font-display text-3xl font-extrabold leading-tight text-[#0F172A] transition-all duration-700 sm:text-4xl ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          Client Websites — Before &amp; After Inymart Labs
        </h2>
        <div className="space-y-8">
          {webDevClientWebsites.map((item, index) => (
            <article
              key={item.title}
              className={`overflow-hidden rounded-3xl border border-[#E2E8F0] transition-all duration-700 hover:shadow-xl ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${100 + index * 80}ms` }}
            >
              <div className="grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
                <div className="border-b border-[#E2E8F0] bg-[#F8FAFC] p-6 lg:border-b-0 lg:border-r">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">Before</p>
                  <h3 className="mt-3 font-display text-xl font-extrabold text-[#0F172A]">{item.title}</h3>
                  <p className="mt-1 text-xs font-bold uppercase tracking-wide text-[#FF6600]">{item.type}</p>
                  <p className="mt-4 text-sm leading-7 text-[#64748B]">{item.before}</p>
                </div>
                <div className="hidden items-center justify-center bg-[#FF6600] px-4 lg:flex">
                  <ArrowUpRight className="rotate-90 text-white lg:rotate-0" size={28} />
                </div>
                <div className="bg-[#0F172A] p-6 text-white">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#FF6600]">After Inymart Labs</p>
                  <p className="mt-4 text-sm leading-7 text-white/85">{item.after}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WebWhyChooseSection() {
  const { ref, visible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#0F172A] py-20 text-white sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,102,0,0.15),transparent_45%)]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <h2
          className={`mb-12 max-w-3xl font-display text-3xl font-extrabold leading-tight sm:text-4xl ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          Why Clients Choose Inymart Labs for Web Development
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {webDevCompareRows.map(([other, ours], index) => (
            <div
              key={other}
              className={`rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-700 sm:p-6 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${100 + index * 60}ms` }}
            >
              <div className="mb-4 flex gap-3 text-sm leading-6 text-white/55">
                <X size={16} className="mt-0.5 shrink-0 text-red-400" />
                <div>
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-white/40">What Other Agencies Do</p>
                  <span>{other}</span>
                </div>
              </div>
              <div className="flex gap-3 border-t border-white/10 pt-4 text-sm font-medium leading-6 text-white/90">
                <Check size={16} className="mt-0.5 shrink-0 text-[#FF6600]" />
                <div>
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#FF6600]">What We Do</p>
                  <span>{ours}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WebCapabilitiesSection() {
  const { ref, visible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="bg-[#FFFAF7] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div
          className={`grid items-center gap-10 lg:grid-cols-[280px_1fr] ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="flex flex-col gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#0F172A] text-[#FF6600]">
              <Monitor size={24} />
            </div>
            <h2 className="font-display text-3xl font-extrabold leading-tight text-[#0F172A] sm:text-4xl">
              Our Web Development Capabilities
            </h2>
          </div>
          <p className="rounded-3xl border border-[#F0E0D6] bg-white p-6 text-sm leading-8 text-[#475569] sm:p-8 sm:text-base">
            {webDevCapabilities}
          </p>
        </div>
      </div>
    </section>
  );
}

function WebCommitmentSection() {
  const { ref, visible } = useScrollReveal<HTMLElement>();
  const icons = [Layers3, Globe2, MapPin];

  return (
    <section ref={ref} className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <h2
          className={`mb-12 font-display text-3xl font-extrabold leading-tight text-[#0F172A] sm:text-4xl ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          Our Client Commitment
        </h2>
        <div className="grid gap-6 lg:grid-cols-3">
          {webDevCommitments.map(({ title, text }, index) => {
            const Icon = icons[index];
            return (
              <div
                key={title}
                className={`rounded-3xl border border-[#E2E8F0] bg-gradient-to-br from-[#F8FAFC] to-white p-8 transition-all duration-700 hover:-translate-y-1 hover:border-[#FF6600]/30 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${100 + index * 80}ms` }}
              >
                <div className="mb-6 grid h-12 w-12 place-items-center rounded-xl bg-[#FF6600]/10 text-[#FF6600]">
                  <Icon size={22} />
                </div>
                <h3 className="font-display text-xl font-extrabold text-[#0F172A]">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#64748B]">{text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WebLiveSitesSection() {
  const { ref, visible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="bg-[#0F172A] py-20 text-white sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className={`max-w-3xl transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl">See the Work for Yourself</h2>
          <p className="mt-4 text-sm leading-7 text-white/65 sm:text-base">
            Rather than quote quality secondhand, we&apos;d rather you see it directly. Explore the live websites built as part of these case studies:
          </p>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {webDevLiveSites.map(({ name, url }, index) => (
            <li
              key={url}
              className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${120 + index * 70}ms` }}
            >
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 transition hover:border-[#FF6600]/40 hover:bg-[#FF6600]/10"
              >
                <span className="font-display text-lg font-bold">
                  {name} — {url.replace('https://', '')}
                </span>
                <ExternalLink size={18} className="shrink-0 text-[#FF6600] transition group-hover:translate-x-0.5" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function WebBottomCTASection({ onOpenForm }: { onOpenForm: () => void }) {
  const { ref, visible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#FF6600] py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.12),transparent_50%)]" />
      <div
        className={`relative mx-auto max-w-4xl px-5 text-center transition-all duration-700 sm:px-8 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <h2 className="font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
          Ready for a Website That Works as Hard as Your Business?
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/90">
          Book a free website review. We&apos;ll look at your current site&apos;s structure, UI/UX, and conversion path — no obligation.
        </p>
        <button
          type="button"
          onClick={onOpenForm}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0F172A] px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:scale-105 hover:bg-white hover:text-[#0F172A]"
        >
          Book My Free Website Review <ArrowUpRight size={18} />
        </button>
      </div>
    </section>
  );
}
