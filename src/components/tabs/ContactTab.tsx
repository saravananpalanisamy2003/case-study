import { Check, Send } from 'lucide-react';
import { useState } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export function ContactTab() {
  const { ref, visible } = useScrollReveal<HTMLElement>();
  const [sent, setSent] = useState(false);

  return (
    <div className="tab-panel animate-fade-in-up">
      <section ref={ref} className="bg-[#FFFAF7] py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <h2
            className={`font-display text-4xl font-extrabold text-[#1F1408] transition-all duration-700 sm:text-5xl ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            Contact
          </h2>
          <form
            className={`mt-10 space-y-4 rounded-3xl border border-[#F0E0D6] bg-white p-6 shadow-lg shadow-[#1A1008]/5 transition-all duration-700 sm:p-8 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            onSubmit={(event) => {
              event.preventDefault();
              setSent(true);
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-semibold text-[#1F1408]">
                Your name
                <input
                  required
                  className="mt-2 w-full rounded-xl border border-[#F0E0D6] bg-[#FFFAF7] px-4 py-3 outline-none transition focus:border-[#FF6600]"
                  placeholder="Your name"
                />
              </label>
              <label className="block text-sm font-semibold text-[#1F1408]">
                Work email
                <input
                  required
                  type="email"
                  className="mt-2 w-full rounded-xl border border-[#F0E0D6] bg-[#FFFAF7] px-4 py-3 outline-none transition focus:border-[#FF6600]"
                  placeholder="you@company.com"
                />
              </label>
            </div>
            <label className="block text-sm font-semibold text-[#1F1408]">
              Phone
              <input
                required
                type="tel"
                className="mt-2 w-full rounded-xl border border-[#F0E0D6] bg-[#FFFAF7] px-4 py-3 outline-none transition focus:border-[#FF6600]"
                placeholder="+91 00000 00000"
              />
            </label>
            <label className="block text-sm font-semibold text-[#1F1408]">
              What can we help with?
              <select className="mt-2 w-full rounded-xl border border-[#F0E0D6] bg-[#FFFAF7] px-4 py-3 outline-none focus:border-[#FF6600]">
                <option>Digital marketing</option>
                <option>Web development</option>
                <option>Software</option>
              </select>
            </label>
            <label className="block text-sm font-semibold text-[#1F1408]">
              Tell us about your goals
              <textarea
                required
                rows={4}
                className="mt-2 w-full resize-none rounded-xl border border-[#F0E0D6] bg-[#FFFAF7] px-4 py-3 outline-none focus:border-[#FF6600]"
                placeholder="What would you like to achieve?"
              />
            </label>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF6600] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#E85D04]"
            >
              {sent ? 'Thanks — we’ll be in touch.' : 'Submit details'}
              {sent ? <Check size={17} /> : <Send size={17} />}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
