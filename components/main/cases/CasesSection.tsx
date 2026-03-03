'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const cases = [
  {
    id: '01',
    category: '전환율 문제',
    problem: {
      label: '조회수만 높고 환자는 0명?',
      desc: '유튜브 채널 구독자 8,000명. 영상 평균 조회수 2만. 그런데 신환 유입은 월 2~3명. 지인이 만든 콘텐츠는 "좋아요"를 받았지만, 진료 예약으로는 단 한 번도 이어지지 않았습니다.',
    },
    solution: {
      label: '환자의 통증을 건드리는 심리 기획',
      desc: '환자가 검색하는 키워드("무릎이 시큰거려요", "목 디스크 수술 안 해도 되나요")로 역설계한 콘텐츠 구조. 시청 후 "상담 신청" 버튼까지 연결되는 퍼널 설계로 3개월 만에 월 신환 31명 달성.',
    },
    result: '신환 +1,450%',
    field: '정형외과',
  },
  {
    id: '02',
    category: '브랜드 이미지',
    problem: {
      label: '병원 이미지와 안 맞는 싼 티 나는 영상',
      desc: '강남 소재 피부과, 실제 진료비는 고가이지만 채널에 올라온 영상의 퀄리티는 동네 촬영팀 수준. 원장님이 "이게 맞는 거 맞나요?"라고 물으셨지만 지인이라 말을 못 하셨다고 했습니다.',
    },
    solution: {
      label: 'TVCF급 고품격 브랜딩 필름 도입',
      desc: '고급 조명, 시네마틱 촬영, 전문 성우 내레이션으로 "이 병원은 다르다"는 첫인상 구축. 브랜딩 필름 공개 후 첫 달 블로그 문의 4배 증가, 고단가 시술 예약 비중 68% 상승.',
    },
    result: '고단가 예약 +68%',
    field: '피부과',
  },
  {
    id: '03',
    category: '운영 지속성',
    problem: {
      label: '꾸준함 없는 지인 관리',
      desc: '지인이 "바빠서"라는 이유로 업로드가 불규칙. 3개월에 영상 2개. 알고리즘은 정체, 구독자는 이탈. 원장님은 돈을 냈지만 결과물이 없는 상황에서도 "그냥 참자"를 선택하셨습니다.',
    },
    solution: {
      label: '유튜브 채널 전담 운영 시스템 구축',
      desc: '월 8편 고정 업로드 시스템. 촬영 → 편집 → 섬네일 → 업로드 → 성과 리포트까지 원스톱 운영. 6개월 내 구독자 1,200명 → 9,800명, 알고리즘 추천 채널 선정.',
    },
    result: '구독자 +716%',
    field: '한의원',
  },
  {
    id: '04',
    category: '전략 설계',
    problem: {
      label: '알고리즘만 타는 무의미한 영상',
      desc: '조회수는 나오지만 병원 예약과 전혀 무관한 영상들. "재밌는 의학 상식" 콘텐츠로 엔터테인먼트 채널이 되어버린 병원 유튜브. 구독자는 병원 환자가 아니라 "유튜브 시청자"였습니다.',
    },
    solution: {
      label: '실질적 예약으로 이어지는 병원 특화 전환 로직',
      desc: '콘텐츠를 인지 → 관심 → 신뢰 → 예약 4단계로 설계. 각 단계별 영상 유형과 CTA를 달리하여 "시청자를 잠재 환자로" 전환하는 전략 수립. 예약 전환율 0.1% → 3.8% 달성.',
    },
    result: '예약 전환율 38배',
    field: '척추외과',
  },
  {
    id: '05',
    category: '콘텐츠 전달력',
    problem: {
      label: '복잡한 의학 지식 전달 실패',
      desc: '원장님이 직접 설명하는 영상인데 전문 용어가 너무 많아 일반인이 이해 불가. 댓글에는 "무슨 말인지 모르겠어요"가 가득. 지인 PD는 의료 지식이 없어 기획 자체가 불가능했습니다.',
    },
    solution: {
      label: '의학 정보를 1분 안에 꽂아주는 숏폼/바이럴 최적화',
      desc: '"허리 디스크 수술, 꼭 해야 할 때 vs 참아야 할 때" 형식으로 환자 언어로 번역. 인스타그램 릴스 평균 조회수 28만, 공유 4,200회. 콘텐츠를 보고 찾아오는 신환 월 40명 돌파.',
    },
    result: '릴스 평균 28만뷰',
    field: '신경외과',
  },
];

const CasesSection = () => {
  const [openCase, setOpenCase] = useState<string | null>('01');

  return (
    <section className='bg-white py-24 px-6 md:px-12 lg:px-20'>
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
            Case Study
          </p>
          <h2
            className='text-3xl md:text-4xl lg:text-5xl font-black text-[#0A2342] leading-tight'
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            지인 마케팅이 망쳐놓은 병원,
            <br />
            <span className='text-[#2563EB]'>우리가 살린 5가지 사례</span>
          </h2>
          <p className='mt-5 text-[#64748B] text-lg max-w-xl mx-auto'>
            원장님이 차마 말 못 했던 그 고통, 우리가 해결해드렸습니다.
          </p>
        </motion.div>

        {/* 케이스 아코디언 */}
        <div className='space-y-4'>
          {cases.map((c, i) => {
            const isOpen = openCase === c.id;
            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <button
                  onClick={() => setOpenCase(isOpen ? null : c.id)}
                  className={`w-full text-left rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'border-[#2563EB] shadow-lg shadow-[#2563EB]/10'
                      : 'border-gray-100 hover:border-[#2563EB]/30 hover:shadow-md'
                  }`}
                >
                  {/* 케이스 헤더 */}
                  <div
                    className={`flex items-center justify-between px-6 py-5 transition-colors duration-300 ${
                      isOpen ? 'bg-[#0A2342]' : 'bg-white'
                    }`}
                  >
                    <div className='flex items-center gap-4'>
                      <span
                        className={`text-xs font-black tracking-widest px-3 py-1 rounded-full ${
                          isOpen
                            ? 'bg-[#2563EB] text-white'
                            : 'bg-[#F4F7FF] text-[#2563EB]'
                        }`}
                      >
                        CASE {c.id}
                      </span>
                      <span
                        className={`text-xs px-3 py-1 rounded-full border ${
                          isOpen
                            ? 'border-white/20 text-white/60'
                            : 'border-gray-200 text-[#64748B]'
                        }`}
                      >
                        {c.field} · {c.category}
                      </span>
                    </div>
                    <div className='flex items-center gap-4'>
                      <span
                        className={`hidden md:block text-sm font-bold ${
                          isOpen ? 'text-[#C9A84C]' : 'text-[#2563EB]'
                        }`}
                      >
                        {c.result}
                      </span>
                      <span
                        className={`text-xl transition-transform duration-300 ${
                          isOpen ? 'rotate-45 text-white' : 'text-[#64748B]'
                        }`}
                      >
                        +
                      </span>
                    </div>
                  </div>

                  {/* 케이스 콘텐츠 */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        className='overflow-hidden'
                      >
                        <div className='grid grid-cols-1 md:grid-cols-2'>
                          {/* Problem */}
                          <div className='p-7 bg-red-50 border-t border-red-100'>
                            <div className='flex items-center gap-2 mb-3'>
                              <span className='w-2 h-2 rounded-full bg-red-400 inline-block' />
                              <span className='text-xs font-black text-red-500 tracking-widest uppercase'>
                                Problem
                              </span>
                            </div>
                            <h4 className='text-base font-black text-[#0A2342] mb-3 leading-snug'>
                              &quot;{c.problem.label}&quot;
                            </h4>
                            <p className='text-sm text-[#64748B] leading-relaxed'>
                              {c.problem.desc}
                            </p>
                          </div>

                          {/* Solution */}
                          <div className='p-7 bg-[#EFF6FF] border-t border-[#2563EB]/10'>
                            <div className='flex items-center gap-2 mb-3'>
                              <span className='w-2 h-2 rounded-full bg-[#2563EB] inline-block' />
                              <span className='text-xs font-black text-[#2563EB] tracking-widest uppercase'>
                                Solution
                              </span>
                            </div>
                            <h4 className='text-base font-black text-[#0A2342] mb-3 leading-snug'>
                              {c.solution.label}
                            </h4>
                            <p className='text-sm text-[#64748B] leading-relaxed'>
                              {c.solution.desc}
                            </p>
                            <div className='mt-4 inline-flex items-center gap-2 px-4 py-2 bg-[#2563EB] rounded-full'>
                              <span className='text-white text-xs font-black'>
                                결과: {c.result}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* 하단 문구 */}
        <motion.p
          className='text-center mt-12 text-[#64748B] text-sm'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          * 모든 사례는 실제 클라이언트 동의 하에 수치를 공개합니다.
        </motion.p>
      </div>
    </section>
  );
};

export default CasesSection;
