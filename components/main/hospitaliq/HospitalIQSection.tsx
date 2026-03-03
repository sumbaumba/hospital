'use client';

import { motion } from 'framer-motion';

const advantages = [
  {
    icon: (
      <svg className='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5}
          d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
      </svg>
    ),
    title: '의료법 & 심의 기준 완전 숙지',
    desc: '의료광고 심의 기준, 의료법 56조, 허위·과장 광고 판단 기준까지. 법적 리스크 없이 효과적인 콘텐츠를 만드는 것, 의료 전문 팀만이 할 수 있습니다.',
    highlight: '법적 리스크 0건',
  },
  {
    icon: (
      <svg className='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5}
          d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' />
      </svg>
    ),
    title: '환자 심리학 기반 기획',
    desc: '"무서워요", "수술 안 해도 되나요?", "비용이 얼마나 들죠?" 환자가 진료실에 들어오기 전에 품는 질문들. 그 불안을 콘텐츠로 먼저 해소해드립니다.',
    highlight: '환자 행동 심리 분석',
  },
  {
    icon: (
      <svg className='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5}
          d='M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' />
      </svg>
    ),
    title: '데이터 기반 성과 측정',
    desc: '조회수가 아닌 신환 유입률, 예약 전환율, 채널별 ROI로 보고합니다. 매월 KPI 리포트를 제공하며, 숫자로 결과를 증명합니다.',
    highlight: '월간 KPI 리포트 제공',
  },
  {
    icon: (
      <svg className='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5}
          d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' />
      </svg>
    ),
    title: '의사 개인 브랜딩 전문 기획',
    desc: '원장님의 진료 철학, 강점, 스타일을 정밀 분석해 "이 의사만의 색깔"을 만듭니다. 콘텐츠가 쌓일수록 브랜드 자산이 되는 구조를 설계합니다.',
    highlight: '닥터 브랜드 아이덴티티',
  },
  {
    icon: (
      <svg className='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5}
          d='M13 10V3L4 14h7v7l9-11h-7z' />
      </svg>
    ),
    title: '전환 최적화 동선 설계',
    desc: '유튜브 → 인스타그램 → 카카오채널 → 예약 시스템. 시청자가 자연스럽게 환자가 되는 동선을 처음부터 설계합니다. 콘텐츠 하나하나가 퍼널의 일부입니다.',
    highlight: '멀티채널 퍼널 설계',
  },
];

const HospitalIQSection = () => {
  return (
    <section className='bg-[#F4F7FF] py-24 px-6 md:px-12 lg:px-20'>
      <div className='max-w-6xl mx-auto'>
        {/* 헤더 */}
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <p className='text-[#2563EB] font-semibold tracking-widest text-sm uppercase mb-4'>
            Hospital IQ
          </p>
          <h2
            className='text-3xl md:text-4xl lg:text-5xl font-black text-[#0A2342] leading-tight'
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            우리는 단순한 영상 업체가
            <br />
            <span className='text-[#2563EB]'>아닙니다</span>
          </h2>
          <p className='mt-5 text-[#64748B] text-lg max-w-2xl mx-auto'>
            의료법을 알고, 환자의 불안을 읽으며, 의사의 철학을 콘텐츠로 번역합니다.
            <br />
            <span className='font-semibold text-[#0A2342]'>
              병원을 연구하는 마케터만이 병원을 성장시킬 수 있습니다.
            </span>
          </p>
        </motion.div>

        {/* 어드밴티지 그리드 */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16'>
          {advantages.map((adv, i) => (
            <motion.div
              key={adv.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className='bg-white rounded-2xl p-7 border border-[#E2E8F0] hover:border-[#2563EB]/30 hover:shadow-xl hover:shadow-[#2563EB]/5 transition-all duration-300 group'
            >
              <div className='w-14 h-14 bg-[#EFF6FF] rounded-xl flex items-center justify-center text-[#2563EB] mb-5 group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-300'>
                {adv.icon}
              </div>
              <div className='inline-block px-3 py-1 bg-[#EFF6FF] text-[#2563EB] text-xs font-bold rounded-full mb-3'>
                {adv.highlight}
              </div>
              <h3 className='text-lg font-black text-[#0A2342] mb-3 leading-snug'>
                {adv.title}
              </h3>
              <p className='text-[#64748B] text-sm leading-relaxed'>{adv.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* 팩트 배너 */}
        <motion.div
          className='bg-[#0A2342] rounded-3xl p-10 md:p-14 text-center'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <p
            className='text-2xl md:text-3xl font-black text-white leading-tight mb-4'
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            &quot;우리 병원을 연구합니다&quot;라는 말을
            <br />
            <span className='text-[#C9A84C]'>데이터와 결과로 증명하겠습니다.</span>
          </p>
          <p className='text-slate-400 text-base mt-4 max-w-xl mx-auto'>
            지인에게 맡기면 의리로 시작해 불편함으로 끝납니다.
            <br />
            전문가에게 맡기면 데이터로 시작해 성과로 끝납니다.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HospitalIQSection;
