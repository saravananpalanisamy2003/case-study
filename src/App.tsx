import { HeroSlider } from './components/HeroSlider';
import { Header } from './components/Header';
import { TabNav } from './components/TabNav';
import { useTab } from './context/TabContext';
import { DigitalMarketingTab } from './components/tabs/DigitalMarketingTab';
import { WebDevelopmentTab } from './components/tabs/WebDevelopmentTab';
import { SoftwareTab } from './components/tabs/SoftwareTab';
import { ContactTab } from './components/tabs/ContactTab';
import { Footer } from './components/Footer';

function App() {
  const { activeTab } = useTab();

  return (
    <div className="min-h-screen bg-[#FFFAF7] text-[#1F1408]">
      <Header />
      <main>
        <HeroSlider />
        <TabNav />
        <section id="work" className="scroll-mt-[48px]">
          {activeTab === 'digital' && <DigitalMarketingTab />}
          {activeTab === 'web' && <WebDevelopmentTab />}
          {activeTab === 'software' && <SoftwareTab />}
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
