import HeroSection from '@/components/main/hero/HeroSection';
import ProblemSection from '@/components/main/problem/ProblemSection';
import SolutionSection from '@/components/main/solution/SolutionSection';
import ProofSection from '@/components/main/proof/ProofSection';
import CTASection from '@/components/main/cta/CTASection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <ProofSection />
      <CTASection />
    </main>
  );
}
