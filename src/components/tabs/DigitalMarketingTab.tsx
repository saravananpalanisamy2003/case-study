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
