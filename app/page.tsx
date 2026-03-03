import HeroSection from '@/components/main/hero/HeroSection';
import CasesSection from '@/components/main/cases/CasesSection';
import PortfolioSection from '@/components/main/portfolio/PortfolioSection';
import HospitalIQSection from '@/components/main/hospitaliq/HospitalIQSection';
import ServicePlanSection from '@/components/main/service/ServicePlanSection';
import CTASection from '@/components/main/cta/CTASection';

export default function Home() {
  return (
    <main>
      {/* 01. Hero — 스크롤 확장 히어로 */}
      <HeroSection />

      {/* 02. Cases — 5가지 성공 사례 (Problem → Solution) */}
      <CasesSection />

      {/* 03. Portfolio — 4탭 포트폴리오 갤러리 */}
      <PortfolioSection />

      {/* 04. Hospital IQ — 전문성 차별화 */}
      <HospitalIQSection />

      {/* 05. Service Plan — 3단계 플랜 */}
      <ServicePlanSection />

      {/* 06. CTA — 익명 후기 + 무료 진단 폼 */}
      <CTASection />
    </main>
  );
}
