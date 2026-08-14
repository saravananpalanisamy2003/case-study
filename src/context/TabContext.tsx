import { createContext, useCallback, useContext, useMemo, useState } from 'react';

export type TabId = 'digital' | 'web' | 'software';

export const TABS: { id: TabId; label: string }[] = [
  { id: 'digital', label: 'Digital Marketing' },
  { id: 'web', label: 'Web Development' },
  { id: 'software', label: 'Software' },
];

type TabContextValue = {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  selectTab: (tab: TabId, options?: { scroll?: boolean }) => void;
};

const TabContext = createContext<TabContextValue | null>(null);

export function TabProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState<TabId>('digital');

  const selectTab = useCallback((tab: TabId, options?: { scroll?: boolean }) => {
    setActiveTab(tab);
    if (options?.scroll !== false) {
      window.setTimeout(() => {
        document.getElementById('work')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  }, []);

  const value = useMemo(
    () => ({ activeTab, setActiveTab, selectTab }),
    [activeTab, selectTab],
  );

  return <TabContext.Provider value={value}>{children}</TabContext.Provider>;
}

export function useTab() {
  const context = useContext(TabContext);
  if (!context) throw new Error('useTab must be used within TabProvider');
  return context;
}
