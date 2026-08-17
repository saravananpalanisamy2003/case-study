import { MetricsBar } from '../sections/MetricsBar';
import { ClientResultsSection } from '../sections/ClientResultsSection';
import { WhyChooseSection } from '../sections/WhyChooseSection';
import { CaseStudiesSection } from '../sections/CaseStudiesSection';
import { SocialMediaSection } from '../sections/SocialMediaSection';
import { CommitmentSection } from '../sections/CommitmentSection';
import { TestimonialsSection } from '../sections/TestimonialsSection';
import { BottomCTASection } from '../sections/BottomCTASection';

export function DigitalMarketingTab() {
  return (
    <div className="tab-panel animate-fade-in-up">
      <MetricsBar />
      
      <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-20 pb-8 text-center bg-[#FFFAF7]">
        <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-[#1A1008] leading-tight">
          Our Digital Marketing <span className="text-[#FF6600]">Approach</span>
        </h2>
      </div>

      <ClientResultsSection />
      <WhyChooseSection />
      <CaseStudiesSection />
      <SocialMediaSection />
      <CommitmentSection />
      <TestimonialsSection />
      <BottomCTASection />
    </div>
  );
}
