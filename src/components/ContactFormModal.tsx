import { useEffect, useState } from 'react';
import { ArrowRight, Check, Phone, X } from 'lucide-react';

type ContactFormModalProps = {
  open: boolean;
  onClose: () => void;
};

export function ContactFormModal({ open, onClose }: ContactFormModalProps) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      const timer = window.setTimeout(() => {
        setSent(false);
        setError(null);
      }, 300);
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
      className="form-modal-backdrop fixed inset-0 z-[100] overflow-y-auto bg-black/70 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        <div
          className="form-modal-panel relative w-full max-w-5xl rounded-[24px] md:rounded-[40px] overflow-hidden shadow-2xl bg-[#0F2E3C]"
          onClick={(event) => event.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="form-modal-title"
        >
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0 hidden md:block">
          <img 
            src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1200&q=80" 
            alt="Customer Support" 
            className="absolute inset-0 w-full h-full object-cover object-right"
          />
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0F2E3C] to-[#0F2E3C] md:bg-gradient-to-r md:from-[#0F2E3C] md:via-[#0F2E3C]/95 md:to-transparent md:w-3/4" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 md:right-6 md:top-6 z-50 grid h-10 w-10 md:h-12 md:w-12 place-items-center rounded-full bg-white text-[#1F1408] shadow-lg transition hover:bg-[#FF6600] hover:text-white"
          aria-label="Close form"
        >
          <X size={20} strokeWidth={2.5} />
        </button>

        {/* Floating Contact Badge (hidden on mobile) */}
        <div className="absolute right-[5%] top-[20%] lg:right-[18%] lg:top-[25%] z-20 hidden md:flex items-center gap-3 bg-[#FF6600] rounded-full p-2 pr-6 shadow-[0_20px_40px_rgba(255,102,0,0.3)] -rotate-12 transition-transform hover:rotate-0 duration-300">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#FF6600]">
            <Phone size={20} strokeWidth={2.5} className="rotate-12" />
          </div>
          <div className="text-white text-[13px] font-extrabold leading-tight">
            Get Contact Now <br/> +11234 751 328
          </div>
        </div>

        {/* Form Content */}
        <div className="relative z-10 w-full p-5 sm:p-8 md:p-10 lg:p-12 lg:w-3/5">
          <div className="flex items-center gap-2 text-[#FF6600] font-bold text-[10px] md:text-xs tracking-widest uppercase">
            <ArrowRight size={14} strokeWidth={3} className="shrink-0" /> OUR CONTACT US
          </div>
          <h2 id="form-modal-title" className="mt-2 font-display text-2xl font-extrabold text-white sm:text-4xl lg:text-[40px] leading-[1.15]">
            Request a Free Quote
          </h2>
          <p className="mt-2 text-[15px] text-white/80">
            Get in touch with us today.
          </p>

          {sent ? (
            <div className="mt-8 flex flex-col items-center justify-center space-y-4 rounded-3xl bg-white/5 p-8 text-center border border-white/10">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                <Check size={32} strokeWidth={3} />
              </div>
              <h3 className="font-display text-2xl font-bold text-white">Request Sent Successfully!</h3>
              <p className="text-[15px] text-white/80 max-w-sm">
                Thank you for reaching out. Our team will review your details and get back to you shortly.
              </p>
              <button
                onClick={onClose}
                className="mt-4 rounded-full bg-white/10 px-8 py-3 text-sm font-bold text-white transition hover:bg-white/20"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form
              className="mt-6 space-y-3"
              onSubmit={async (event) => {
                event.preventDefault();
                setLoading(true);
                setError(null);
                
                const formData = new FormData(event.currentTarget);
                const data = Object.fromEntries(formData.entries());

                try {
                  const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                  });
                  
                  const text = await response.text();
                  let result;
                  
                  try {
                    result = JSON.parse(text);
                  } catch (parseError) {
                    throw new Error("Invalid response from server. Make sure the backend server is running.");
                  }
                  
                  if (response.ok && result.status === 'success') {
                    setSent(true);
                    (event.target as HTMLFormElement).reset();
                  } else {
                    setError(result.message || 'Something went wrong. Please try again.');
                  }
                } catch (err: any) {
                  console.error("Submission error:", err);
                  setError(err.message || 'Failed to send request. Please check your connection and try again.');
                } finally {
                  setLoading(false);
                }
              }}
            >
              {error && <div className="text-sm font-semibold text-red-400 bg-red-400/10 px-4 py-2 rounded-xl mb-3">{error}</div>}
              
              <input
                required
                name="name"
                className="w-full rounded-full border-2 border-transparent bg-white px-5 py-3 text-sm font-medium text-[#1F1408] outline-none placeholder:text-gray-400 focus:border-[#FF6600]"
                placeholder="Your Name *"
              />
              
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  required
                  name="phone"
                  type="tel"
                  className="w-full rounded-full border-2 border-transparent bg-white px-5 py-3 text-sm font-medium text-[#1F1408] outline-none placeholder:text-gray-400 focus:border-[#FF6600]"
                  placeholder="Your Phone *"
                />
                <input
                  required
                  name="email"
                  type="email"
                  className="w-full rounded-full border-2 border-transparent bg-white px-5 py-3 text-sm font-medium text-[#1F1408] outline-none placeholder:text-gray-400 focus:border-[#FF6600]"
                  placeholder="Your Email *"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  required
                  name="subject"
                  className="w-full rounded-full border-2 border-transparent bg-white px-5 py-3 text-sm font-medium text-[#1F1408] outline-none placeholder:text-gray-400 focus:border-[#FF6600]"
                  placeholder="Your Subjects *"
                />
                <select 
                  required
                  name="service"
                  className="w-full rounded-full border-2 border-transparent bg-white px-5 py-3 text-sm font-medium text-gray-400 outline-none focus:border-[#FF6600] appearance-none"
                  defaultValue=""
                >
                  <option value="" disabled>Select Service</option>
                  <option value="digital">Digital marketing</option>
                  <option value="web">Web development</option>
                  <option value="software">Software</option>
                </select>
              </div>

              <textarea
                required
                name="comments"
                rows={3}
                className="w-full resize-none rounded-[20px] border-2 border-transparent bg-white px-5 py-3 text-sm font-medium text-[#1F1408] outline-none placeholder:text-gray-400 focus:border-[#FF6600]"
                placeholder="Your Comments *"
              />

              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-3 rounded-full bg-[#FF6600] py-3.5 text-sm font-extrabold uppercase tracking-widest text-white transition hover:bg-[#E85D04] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Request'} 
                <ArrowRight size={18} strokeWidth={3} className={`transition-transform ${loading ? '' : 'group-hover:translate-x-1'}`} />
              </button>
            </form>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
