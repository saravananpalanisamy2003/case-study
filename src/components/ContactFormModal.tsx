import { useEffect, useState } from 'react';
import { Check, Send, X } from 'lucide-react';

type ContactFormModalProps = {
  open: boolean;
  onClose: () => void;
};

export function ContactFormModal({ open, onClose }: ContactFormModalProps) {
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!open) {
      const timer = window.setTimeout(() => setSent(false), 300);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="form-modal-backdrop fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="form-modal-panel relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="form-modal-title"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-[#FFF4ED] text-[#1F1408] transition hover:bg-[#FF6600] hover:text-white"
          aria-label="Close form"
        >
          <X size={18} />
        </button>

        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF6600]">Get in touch</p>
        <h2 id="form-modal-title" className="mt-2 font-display text-2xl font-extrabold text-[#1F1408] sm:text-3xl">
          Tell us about your project
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#6B5E58]">
          Share a few details and our team will reach out within one business day.
        </p>

        <form
          className="mt-6 space-y-4"
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
    </div>
  );
}
