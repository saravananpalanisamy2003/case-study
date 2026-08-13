import { HeroSlider } from './components/HeroSlider';
import { Header } from './components/Header';
import { TabNav } from './components/TabNav';
import { useTab } from './context/TabContext';
import { DigitalMarketingTab } from './components/tabs/DigitalMarketingTab';
import { WebDevelopmentTab } from './components/tabs/WebDevelopmentTab';
import { SoftwareTab } from './components/tabs/SoftwareTab';
import { ContactTab } from './components/tabs/ContactTab';

function App() {
  const { activeTab } = useTab();

  return (
    <div className="min-h-screen bg-[#FFFAF7] text-[#1F1408]">
      <Header />
      <main className="pt-[72px]">
        <HeroSlider />
        <TabNav />
        <section id="work" className="scroll-mt-[120px]">
          {activeTab === 'digital' && <DigitalMarketingTab />}
          {activeTab === 'web' && <WebDevelopmentTab />}
          {activeTab === 'software' && <SoftwareTab />}
          {activeTab === 'contact' && <ContactTab />}
        </section>
      </main>
      <footer className="border-t border-white/10 bg-[#1A1008] py-8 text-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-5 text-sm text-white/50 sm:flex-row sm:px-8">
          <span>© Inymart Labs</span>
          <span>Trusted by 50+ growing brands across India</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
