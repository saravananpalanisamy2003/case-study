import { Megaphone, Monitor, Code2, Mail } from 'lucide-react';
import { TABS, useTab, type TabId } from '../context/TabContext';

const TAB_ICONS: Record<TabId, typeof Megaphone> = {
  digital: Megaphone,
  web: Monitor,
  software: Code2,
  contact: Mail,
};

export function TabNav() {
  const { activeTab, selectTab } = useTab();

  return (
    <>
      {/* Inline styles for the complex folder-tab S-curves */}
      <style>{`
        .folder-tab {
          position: relative;
          border-top-left-radius: 16px;
          border-top-right-radius: 16px;
          transition: all 0.3s ease;
        }
        
        .folder-tab::before,
        .folder-tab::after {
          content: '';
          position: absolute;
          bottom: 0;
          width: 20px;
          height: 20px;
          background-color: transparent;
          pointer-events: none;
          z-index: 0;
        }
        
        /* Left flare (S-curve) */
        .folder-tab::before {
          left: -20px;
        }
        
        /* Right flare (S-curve) */
        .folder-tab::after {
          right: -20px;
        }

        /* Active Tab Styling */
        .folder-tab-active {
          background-color: #FF6600;
          color: white;
          z-index: 10;
        }
        .folder-tab-active::before {
          background-image: radial-gradient(circle at 0 0, transparent 20px, #FF6600 20.5px);
        }
        .folder-tab-active::after {
          background-image: radial-gradient(circle at 20px 0, transparent 20px, #FF6600 20.5px);
        }

        /* Inactive Tab Styling */
        .folder-tab-inactive {
          background-color: #0F2E3C;
          color: rgba(255, 255, 255, 0.7);
          z-index: 1;
        }
        /* Only apply flares to the first/last inactive tabs if they aren't covered by active */
        .folder-tab-inactive:first-child::before {
          background-image: radial-gradient(circle at 0 0, transparent 20px, #0F2E3C 20.5px);
        }
        .folder-tab-inactive:last-child::after {
          background-image: radial-gradient(circle at 20px 0, transparent 20px, #0F2E3C 20.5px);
        }
      `}</style>

      <div className="sticky -top-[21px] sm:-top-[29px] z-40 bg-[#FFFAF7] border-b border-[#E8E8E8] pt-6 sm:pt-8 overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          
          <div
            className="flex justify-start md:justify-center items-end pl-5 pr-5 [-ms-overflow-style:none] [scrollbar-width:none] overflow-x-auto [&::-webkit-scrollbar]:hidden"
            role="tablist"
            aria-label="Service categories"
          >
            {TABS.map(({ id, label }) => {
              const Icon = TAB_ICONS[id];
              const isActive = activeTab === id;
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => selectTab(id as TabId)}
                  className={`folder-tab group flex shrink-0 items-center gap-2 px-4 py-3 sm:px-8 sm:py-5 font-display text-[11px] sm:text-sm font-extrabold uppercase tracking-widest ${
                    isActive ? 'folder-tab-active' : 'folder-tab-inactive hover:text-[#FF6600]'
                  }`}
                >
                  <Icon
                    size={18}
                    className={`shrink-0 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110 opacity-70 group-hover:opacity-100'}`}
                  />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
          
        </div>
      </div>
    </>
  );
}
