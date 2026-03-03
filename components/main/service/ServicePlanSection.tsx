'use client';

import { motion } from 'framer-motion';

const plans = [
  {
    tier: 'Standard',
    tagline: '유튜브 기초 체력 구축',
    desc: '채널이 없거나 이제 막 시작하는 병원을 위한 입문 패키지. 기초부터 탄탄하게.',
    price: '상담 후 결정',
    highlight: false,
    badge: null,
    features: [
      { label: '채널 개설 및 브랜딩 세팅', included: true },
      { label: '월 4편 기획·촬영·편집', included: true },
      { label: '섬네일 디자인', included: true },
      { label: '월간 성과 리포트', included: true },
      { label: '인스타그램 운영', included: false },
      { label: '숏폼/릴스 제작', included: false },
      { label: '브랜딩 필름 제작', included: false },
      { label: '예약 전환 퍼널 설계', included: false },
    ],
    cta: '기초부터 시작하기',
    ctaStyle: 'border-2 border-[#0A2342] text-[#0A2342] hover:bg-[#0A2342] hover:text-white',
  },
  {
    tier: 'Professional',
    tagline: '유튜브 + 인스타 통합 성장',
    desc: '두 채널을 하나의 전략으로 연결해 신환 유입을 가시적으로 성장시킵니다.',
    price: '상담 후 결정',
    highlight: true,
    badge: '가장 많이 선택',
    features: [
      { label: '채널 개설 및 브랜딩 세팅', included: true },
      { label: '월 8편 기획·촬영·편집', included: true },
      { label: '섬네일 디자인', included: true },
      { label: '주간 성과 리포트', included: true },
      { label: '인스타그램 운영 (월 12포스팅)', included: true },
      { label: '숏폼/릴스 제작 (월 4편)', included: true },
      { label: '브랜딩 필름 제작', included: false },
      { label: '예약 전환 퍼널 설계', included: true },
    ],
    cta: '성장을 시작하기',
    ctaStyle: 'bg-[#2563EB] text-white hover:bg-[#1D4ED8] shadow-xl shadow-[#2563EB]/30',
  },
  {
    tier: 'VIP Remodeling',
    tagline: '기존 채널 전면 리모델링',
    desc: '지인이 망쳐놓은 채널을 완전히 수술합니다. 고퀄리티 브랜딩 필름으로 병원 이미지를 재건.',
    price: '상담 후 결정',
    highlight: false,
    badge: '프리미엄',
    features: [
      { label: '채널 전면 리브랜딩', included: true },
      { label: '월 12편 기획·촬영·편집', included: true },
      { label: '섬네일 디자인', included: true },
      { label: '실시간 성과 대시보드', included: true },
      { label: '인스타그램 + 블로그 통합 운영', included: true },
      { label: '숏폼/릴스 제작 (월 8편)', included: true },
      { label: 'TVCF급 브랜딩 필름 제작', included: true },
      { label: '예약 전환 풀 퍼널 설계', included: true },
    ],
    cta: '병원 브랜드 수술 신청',
    ctaStyle: 'border-2 border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0A2342]',
  },
];

const ServicePlanSection = () => {
  return (
    <section className='bg-[#0A2342] py-24 px-6 md:px-12 lg:px-20'>
      <div className='max-w-6xl mx-auto'>
        {/* 헤더 */}
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <p className='text-[#C9A84C] font-semibold tracking-widest text-sm uppercase mb-4'>
            Service Plan
          </p>
          <h2
            className='text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight'
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            병원의 현재 상태에 맞는
            <br />
            <span className='text-[#C9A84C]'>맞춤 처방전</span>
          </h2>
          <p className='mt-5 text-slate-400 text-lg max-w-xl mx-auto'>
            기초 체력 → 통합 성장 → 전면 리모델링. 단계적으로 설계됩니다.
          </p>
        </motion.div>

        {/* 플랜 카드 */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {plans.map((plan, i) => (
            <motion.div
              key={plan.tier}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className={`relative rounded-3xl p-8 flex flex-col transition-all duration-300 ${
                plan.highlight
                  ? 'bg-white scale-105 shadow-2xl shadow-[#2563EB]/20 border-2 border-[#2563EB]/30'
                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
              }`}
            >
              {/* 배지 */}
              {plan.badge && (
                <div
                  className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-black tracking-wide ${
                    plan.highlight
                      ? 'bg-[#2563EB] text-white'
                      : 'bg-[#C9A84C] text-[#0A2342]'
                  }`}
                >
                  {plan.badge}
                </div>
              )}

              {/* 티어 */}
              <div className='mb-6'>
                <p
                  className={`text-xs font-bold tracking-widest uppercase mb-1 ${
                    plan.highlight ? 'text-[#2563EB]' : 'text-[#C9A84C]'
                  }`}
                >
                  {plan.tier}
                </p>
                <h3
                  className={`text-xl font-black mb-2 ${
                    plan.highlight ? 'text-[#0A2342]' : 'text-white'
                  }`}
                >
                  {plan.tagline}
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    plan.highlight ? 'text-[#64748B]' : 'text-slate-400'
                  }`}
                >
                  {plan.desc}
                </p>
              </div>

              {/* 구분선 */}
              <div
                className={`border-t mb-6 ${
                  plan.highlight ? 'border-[#E2E8F0]' : 'border-white/10'
                }`}
              />

              {/* 피처 리스트 */}
              <ul className='space-y-3 flex-1 mb-8'>
                {plan.features.map((f) => (
                  <li key={f.label} className='flex items-start gap-3'>
                    <span
                      className={`mt-0.5 flex-shrink-0 text-sm font-bold ${
                        f.included
                          ? plan.highlight
                            ? 'text-[#2563EB]'
                            : 'text-[#3B82F6]'
                          : 'text-slate-600'
                      }`}
                    >
                      {f.included ? '✓' : '–'}
                    </span>
                    <span
                      className={`text-sm ${
                        f.included
                          ? plan.highlight
                            ? 'text-[#0A2342] font-medium'
                            : 'text-slate-300'
                          : plan.highlight
                          ? 'text-[#CBD5E1]'
                          : 'text-slate-600'
                      }`}
                    >
                      {f.label}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA 버튼 */}
              <button
                onClick={() =>
                  document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })
                }
                className={`w-full py-4 rounded-xl font-black text-sm transition-all duration-300 ${plan.ctaStyle}`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* 하단 안내 */}
        <motion.p
          className='text-center text-slate-500 text-sm mt-10'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          모든 플랜은 병원 규모·목표에 따라 맞춤 조정됩니다. 먼저 무료 진단 후 제안드립니다.
        </motion.p>
      </div>
    </section>
  );
};

export default ServicePlanSection;
