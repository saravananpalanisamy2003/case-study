import { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { TABS, useTab, type TabId } from '../context/TabContext';
import { useFormModal } from '../context/FormModalContext';
import { useScrolledPastHero } from '../hooks/useScrolledPastHero';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { activeTab, selectTab } = useTab();
  const { openFormModal } = useFormModal();
  const pastHero = useScrolledPastHero();

  const solid = pastHero || mobileOpen;

  const handleNav = (tab: TabId) => {
    setMobileOpen(false);
    selectTab(tab);
  };

  const ctaLabel =
    activeTab === 'web' ? 'Book My Free Website Review' : 'Book My Free Growth Audit';

  return (
    <header
      className={`absolute inset-x-0 top-0 z-[100] transition-all duration-500 ${
        solid
          ? 'border-b border-[#E8E8E8]/80 bg-white/95 shadow-sm backdrop-blur-md'
          : 'border-b border-white/10 bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <button
          type="button"
          onClick={() => {
            setMobileOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center"
        >
          <img src={`${import.meta.env.BASE_URL}logo.webp`} alt="Inymart Logo" className="h-8 w-auto object-contain" />
        </button>
        <nav className="hidden items-center gap-5 text-sm font-semibold lg:flex lg:gap-7">
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => handleNav(id)}
              className={`transition duration-300 hover:text-[#FF6600] ${
                solid
                  ? activeTab === id
                  ? 'text-[#FF6600]'
                  : 'text-[#1A1008]/75'
                  : activeTab === id
                    ? 'text-[#FF6600]'
                    : 'text-white/85 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
          <button
            type="button"
            onClick={openFormModal}
            className="inline-flex items-center gap-2 rounded-full bg-[#FF6600] px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-[#FF6600]/30 transition hover:bg-[#E85D04] hover:shadow-[#FF6600]/40"
          >
            {ctaLabel} <ArrowUpRight size={15} />
          </button>
        </nav>
        <button
          type="button"
          className={`lg:hidden ${solid ? 'text-[#1A1008]' : 'text-white'}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>
      {mobileOpen && (
        <div className="border-t border-[#E8E8E8] bg-white px-5 pb-5 pt-3 lg:hidden">
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => handleNav(id)}
              className={`flex w-full border-b border-[#F0E0D6] py-4 text-left text-sm font-medium ${activeTab === id ? 'text-[#FF6600]' : 'text-[#1A1008]/80'}`}
            >
              {label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              openFormModal();
            }}
            className="mt-4 w-full rounded-full bg-[#FF6600] py-3 text-sm font-bold text-white"
          >
            {ctaLabel}
          </button>
        </div>
      )}
    </header>
  );
}
