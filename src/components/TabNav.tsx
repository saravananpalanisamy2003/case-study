import { TABS, useTab, type TabId } from '../context/TabContext';

export function TabNav() {
  const { activeTab, selectTab } = useTab();

  return (
    <div className="sticky top-[72px] z-40 border-b border-[#E8E8E8] bg-white/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-3 sm:px-8">
        <div
          className="flex gap-1 overflow-x-auto py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Service categories"
        >
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={activeTab === id}
              onClick={() => selectTab(id as TabId)}
              className={`shrink-0 rounded-full px-4 py-2.5 text-xs font-bold transition sm:px-6 sm:text-sm ${
                activeTab === id
                  ? 'bg-[#FF6600] text-white shadow-md shadow-[#FF6600]/25'
                  : 'text-[#1A1008]/70 hover:bg-[#FFF4ED] hover:text-[#FF6600]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
