'use client';

import { motion } from 'framer-motion';

const solutions = [
  {
    step: 'Rx 01',
    icon: '🏥',
    title: 'Doctor Branding',
    subtitle: '의사의 권위를 세우는 브랜딩',
    description:
      '단순 소개 영상이 아닌, "이 분야 최고 전문가"라는 인식을 만드는 콘텐츠 전략. 논문 인용, 케이스 스터디, 진료 철학까지 — 의사의 전문성을 시청자가 체감하도록 설계합니다.',
    tags: ['권위 구축', '전문성 포지셔닝', '신뢰 콘텐츠'],
  },
  {
    step: 'Rx 02',
    icon: '🧠',
    title: 'Patient Psychology',
    subtitle: '환자의 결핍을 건드리는 심리 기획',
    description:
      '"이 의사는 내 아픔을 안다"고 느끼게 하는 스토리텔링. 환자의 통증, 두려움, 기대를 먼저 말하고 의사가 해답으로 등장하는 구조. 시청자를 잠재 환자로 전환하는 심리 설계입니다.',
    tags: ['공감 스토리텔링', '통증 포인트 기획', '환자 심리'],
  },
  {
    step: 'Rx 03',
    icon: '🎯',
    title: 'Conversion Path',
    subtitle: '실제 예약으로 이어지는 전환 동선',
    description:
      '유튜브 → 인스타그램 → 병원 예약 시스템으로 이어지는 완성된 퍼널 설계. 콘텐츠 시청 후 "상담 신청"이 자연스럽게 이어지도록 CTA, 링크, 랜딩페이지를 일체형으로 구축합니다.',
    tags: ['마케팅 퍼널', 'CTA 최적화', '예약 전환'],
  },
];

const SolutionSection = () => {
  return (
    <section className='bg-white py-24 px-6 md:px-12 lg:px-20'>
      <div className='max-w-6xl mx-auto'>
        {/* 섹션 헤더 */}
        <motion.div
          className='text-center mb-20'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <p className='text-[#1E5FAD] font-semibold tracking-widest text-sm uppercase mb-4'>
            Solution
          </p>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-black text-[#0A1628] leading-tight'>
            Marketing Remodeling
            <br />
            <span className='text-[#1E5FAD]'>처방전 3가지</span>
          </h2>
          <p className='mt-6 text-gray-500 text-lg max-w-xl mx-auto'>
            진단 → 처방 → 완치. 병원 브랜드를 수술하는 전문 프로세스입니다.
          </p>
        </motion.div>

        {/* 솔루션 카드 */}
        <div className='flex flex-col gap-10'>
          {solutions.map((solution, i) => (
            <motion.div
              key={solution.step}
              initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: 'easeOut' }}
              className='flex flex-col md:flex-row items-start gap-8 p-8 md:p-10 bg-[#F0F4FF] rounded-3xl border border-[#1E5FAD]/10 hover:border-[#1E5FAD]/30 hover:shadow-lg transition-all duration-300'
            >
              {/* 아이콘 + 스텝 */}
              <div className='flex-shrink-0 flex flex-col items-center gap-2 w-20'>
                <span className='text-5xl'>{solution.icon}</span>
                <span className='text-xs font-bold text-[#1E5FAD] tracking-widest'>
                  {solution.step}
                </span>
              </div>

              {/* 텍스트 */}
              <div className='flex-1'>
                <h3 className='text-2xl font-black text-[#0A1628] mb-1'>
                  {solution.title}
                </h3>
                <p className='text-[#1E5FAD] font-semibold mb-4'>
                  {solution.subtitle}
                </p>
                <p className='text-gray-600 leading-relaxed'>
                  {solution.description}
                </p>
                <div className='flex flex-wrap gap-2 mt-5'>
                  {solution.tags.map((tag) => (
                    <span
                      key={tag}
                      className='px-3 py-1 bg-[#1E5FAD]/10 text-[#1E5FAD] text-xs font-semibold rounded-full'
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
