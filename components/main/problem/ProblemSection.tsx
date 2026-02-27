'use client';

import { motion } from 'framer-motion';

const problems = [
  {
    number: '01',
    icon: '🎬',
    title: '전문성 없는 편집',
    description:
      '의학적 권위와 신뢰감 없이 만들어진 가벼운 편집. 시청자는 3초 만에 "이 의사를 믿을 수 있을까?" 판단합니다. 지인이 만든 영상은 예쁘지만, 설득력이 없습니다.',
  },
  {
    number: '02',
    icon: '📢',
    title: '환자 공감 없는 의사 자랑',
    description:
      '장비 자랑, 학력 나열, 수상 이력. 환자가 원하는 건 "내 통증을 이해하는 의사"입니다. 기획 없는 콘텐츠는 의사의 SNS일 뿐, 환자 유입 채널이 아닙니다.',
  },
  {
    number: '03',
    icon: '📊',
    title: '예약으로 이어지지 않는 전략',
    description:
      '조회수 10만, 예약은 0건. 알고리즘에 최적화된 영상이 예약 시스템과 연결되지 않으면 무의미합니다. 시청자를 환자로 전환하는 동선 설계가 없습니다.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' },
  }),
};

const ProblemSection = () => {
  return (
    <section className='bg-[#0A1628] py-24 px-6 md:px-12 lg:px-20'>
      <div className='max-w-6xl mx-auto'>
        {/* 섹션 헤더 */}
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <p className='text-[#3B82F6] font-semibold tracking-widest text-sm uppercase mb-4'>
            Problem
          </p>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight'>
            왜 당신의 유튜브는
            <br />
            <span className='text-[#3B82F6]'>환자로 이어지지 않는가?</span>
          </h2>
          <p className='mt-6 text-gray-400 text-lg max-w-xl mx-auto'>
            지인에게 맡긴 마케팅, 3가지 구조적 문제가 있습니다.
          </p>
        </motion.div>

        {/* 문제 카드 그리드 */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {problems.map((problem, i) => (
            <motion.div
              key={problem.number}
              custom={i}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, margin: '-80px' }}
              variants={cardVariants}
              className='relative bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-[#3B82F6]/50 hover:bg-white/10 transition-all duration-300 group'
            >
              <span className='absolute top-6 right-6 text-5xl font-black text-white/5 group-hover:text-white/10 transition-colors'>
                {problem.number}
              </span>
              <div className='text-4xl mb-5'>{problem.icon}</div>
              <h3 className='text-xl font-bold text-white mb-4'>
                {problem.title}
              </h3>
              <p className='text-gray-400 leading-relaxed text-sm'>
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* 하단 팩트 배너 */}
        <motion.div
          className='mt-16 bg-[#1E5FAD]/20 border border-[#1E5FAD]/30 rounded-2xl p-8 text-center'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <p className='text-white text-lg md:text-xl font-medium'>
            <span className='text-[#3B82F6] font-bold'>병원 마케팅의 본질</span>은
            예쁜 영상이 아닙니다.
            <br />
            <span className='font-bold'>
              &quot;이 의사를 믿고 예약하겠다&quot;는 결정을 만드는 것입니다.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
