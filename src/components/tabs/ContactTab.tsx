import { Check, Send } from 'lucide-react';
import { useState } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export function ContactTab() {
  const { ref, visible } = useScrollReveal<HTMLElement>();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="tab-panel animate-fade-in-up">
      <section ref={ref} className="bg-[#FFFAF7] py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <h2
            className={`font-display text-4xl font-extrabold text-[#1F1408] transition-all duration-700 sm:text-5xl ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            Contact
          </h2>
          {sent ? (
            <div className={`mt-10 flex flex-col items-center justify-center space-y-4 rounded-3xl border border-[#F0E0D6] bg-white p-12 text-center shadow-lg shadow-[#1A1008]/5 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="grid h-20 w-20 place-items-center rounded-full bg-green-500 text-white shadow-[0_10px_30px_rgba(34,197,94,0.3)]">
                <Check size={40} strokeWidth={3} />
              </div>
              <h3 className="font-display text-3xl font-extrabold text-[#1F1408]">Request Sent Successfully!</h3>
              <p className="max-w-md text-[16px] leading-relaxed text-[#6B5E58]">
                Thank you for reaching out to Inymart Labs. Our team will review your details and get back to you shortly.
              </p>
            </div>
          ) : (
            <form
              className={`mt-10 space-y-4 rounded-3xl border border-[#F0E0D6] bg-white p-6 shadow-lg shadow-[#1A1008]/5 transition-all duration-700 sm:p-8 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              onSubmit={async (event) => {
                event.preventDefault();
                setLoading(true);
                setError(null);
                
                const formData = new FormData(event.currentTarget);
                const data = Object.fromEntries(formData.entries());

                try {
                  const response = await fetch(`${import.meta.env.BASE_URL}contact.php`, {
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
                    throw new Error("Invalid response from server. Make sure you are running on a PHP-enabled server.");
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
              {error && <div className="text-sm font-semibold text-red-500 bg-red-50 p-3 rounded-xl">{error}</div>}
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-semibold text-[#1F1408]">
                  Your name
                  <input
                    required
                    name="name"
                    className="mt-2 w-full rounded-xl border border-[#F0E0D6] bg-[#FFFAF7] px-4 py-3 outline-none transition focus:border-[#FF6600]"
                    placeholder="Your name"
                  />
                </label>
                <label className="block text-sm font-semibold text-[#1F1408]">
                  Work email
                  <input
                    required
                    name="email"
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
                  name="phone"
                  type="tel"
                  className="mt-2 w-full rounded-xl border border-[#F0E0D6] bg-[#FFFAF7] px-4 py-3 outline-none transition focus:border-[#FF6600]"
                  placeholder="+91 00000 00000"
                />
              </label>
              <label className="block text-sm font-semibold text-[#1F1408]">
                What can we help with?
                <select required name="service" className="mt-2 w-full rounded-xl border border-[#F0E0D6] bg-[#FFFAF7] px-4 py-3 outline-none focus:border-[#FF6600]">
                  <option value="" disabled>Select Service</option>
                  <option value="digital">Digital marketing</option>
                  <option value="web">Web development</option>
                  <option value="software">Software</option>
                </select>
              </label>
              <label className="block text-sm font-semibold text-[#1F1408]">
                Tell us about your goals
                <textarea
                  required
                  name="comments"
                  rows={4}
                  className="mt-2 w-full resize-none rounded-xl border border-[#F0E0D6] bg-[#FFFAF7] px-4 py-3 outline-none focus:border-[#FF6600]"
                  placeholder="What would you like to achieve?"
                />
              </label>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF6600] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#E85D04] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Submit details'}
                <Send size={17} />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
