import { ArrowRight, Mail, MapPin, Phone, Linkedin, Facebook, Instagram, Youtube } from 'lucide-react';
import { useFormModal } from '../context/FormModalContext';

export function Footer() {
  const { openFormModal } = useFormModal();

  return (
    <footer className="relative bg-[#0A1A24] text-white pt-24 pb-8 min-h-[60vh] h-auto flex flex-col justify-between overflow-hidden">
      
      {/* Background Graphic */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,102,0,0.15)_0,transparent_70%)] blur-3xl -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,102,0,0.1)_0,transparent_70%)] blur-3xl translate-y-1/2 -translate-x-1/4"></div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 flex-1 flex flex-col justify-center">
        
        {/* Top Section */}
        <div className="grid gap-16 lg:grid-cols-2 mb-20">
          <div>
            <div className="mb-6">
              <img src={`${import.meta.env.BASE_URL}logo.webp`} alt="Inymart Logo" className="h-8 w-auto object-contain" />
            </div>
            <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-extrabold leading-tight text-white mb-5">
              Let's Build Your <span className="text-[#FF6600]">Digital Future.</span>
            </h2>
            <p className="text-base text-white/70 max-w-md mb-6 leading-relaxed">
              Partner with the leading growth agency to scale your brand through data-driven SEO, ads, and web development.
            </p>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12 text-[13px]">
            <div>
              <h3 className="font-bold text-white uppercase tracking-wider mb-5 text-xs">Services</h3>
              <ul className="space-y-3 text-white/60 mb-8">
                <li><a href="#" className="hover:text-[#FF6600] transition-colors">Digital Marketing</a></li>
                <li><a href="#" className="hover:text-[#FF6600] transition-colors">Web Development</a></li>
                <li><a href="#" className="hover:text-[#FF6600] transition-colors">Software</a></li>
              </ul>
              <button
                onClick={openFormModal}
                className="inline-flex items-center gap-2 bg-[#FF6600] text-white px-6 py-3 rounded-full font-bold uppercase tracking-wider text-xs transition-all hover:bg-white hover:text-[#0A1A24] group"
              >
                Start a Project
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            <div>
              <h3 className="font-bold text-white uppercase tracking-wider mb-5 text-xs">Connect</h3>
              <ul className="space-y-3 text-white/60 mb-6">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#FF6600] shrink-0 mt-0.5" />
                  <span>Trichy, Tamil Nadu<br />India</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-[#FF6600] shrink-0" />
                  <a href="mailto:hello@inymart.com" className="hover:text-white transition-colors">hello@inymart.com</a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-[#FF6600] shrink-0" />
                  <span>+91 98765 43210</span>
                </li>
              </ul>
              
              <div className="flex items-center gap-4 text-white/60">
                <a href="https://www.linkedin.com/company/inymartlabs/" aria-label="LinkedIn" className="hover:text-[#FF6600] transition-colors" target="_blank" rel="noopener noreferrer"><Linkedin size={20} /></a>
                <a href="https://www.facebook.com/people/Inymart-Labs/61583856676865/" aria-label="Facebook" className="hover:text-[#FF6600] transition-colors" target="_blank" rel="noopener noreferrer"><Facebook size={20} /></a>
                <a href="https://www.instagram.com/inymart_labs/" aria-label="Instagram" className="hover:text-[#FF6600] transition-colors" target="_blank" rel="noopener noreferrer"><Instagram size={20} /></a>
                <a href="https://www.youtube.com/@InymartLabs" aria-label="YouTube" className="hover:text-[#FF6600] transition-colors" target="_blank" rel="noopener noreferrer"><Youtube size={20} /></a>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Legal Row */}
      <div className="relative z-10 border-t border-white/10 mt-8 pt-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-5 sm:flex-row sm:px-8 text-sm text-white/40">
          <p>© {new Date().getFullYear()} Inymart Labs. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
      
    </footer>
  );
}
