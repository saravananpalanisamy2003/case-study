import { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { TABS, useTab, type TabId } from '../context/TabContext';
import { useFormModal } from '../context/FormModalContext';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { activeTab, selectTab } = useTab();
  const { openFormModal } = useFormModal();

  const handleNav = (tab: TabId) => {
    setMobileOpen(false);
    selectTab(tab);
  };

  const ctaLabel =
    activeTab === 'web' ? 'Book My Free Website Review' : 'Book My Free Growth Audit';

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#E8E8E8] bg-white/95 text-[#1A1008] shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <button
          type="button"
          onClick={() => {
            setMobileOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center"
        >
          <img src="/logo.webp" alt="Inymart Logo" className="h-8 w-auto object-contain" />
        </button>
        <nav className="hidden items-center gap-5 text-sm font-semibold text-[#1A1008]/75 lg:flex lg:gap-7">
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => handleNav(id)}
              className={`transition hover:text-[#FF6600] ${activeTab === id ? 'text-[#FF6600]' : ''}`}
            >
              {label}
            </button>
          ))}
          <button
            type="button"
            onClick={openFormModal}
            className="inline-flex items-center gap-2 rounded-full bg-[#FF6600] px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#E85D04]"
          >
            {ctaLabel} <ArrowUpRight size={15} />
          </button>
        </nav>
        <button
          type="button"
          className="text-[#1A1008] lg:hidden"
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
