'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const anonymousReviews = [
  {
    specialty: '강남 성형외과 원장',
    quote:
      '지인한테 1년 맡겼는데 결과가 없어도 차마 말을 못 했습니다. 여기로 옮기고 3개월 만에 신환이 눈에 띄게 늘었어요. 진작 바꿀 걸 그랬습니다.',
    result: '3개월 만에 신환 +220%',
  },
  {
    specialty: '분당 척추 전문 병원 원장',
    quote:
      '조회수는 높은데 예약이 안 온다는 게 무슨 말인지 이해 못 했는데, 설명 듣고 바로 납득했습니다. 이 사람들은 병원을 압니다.',
    result: '예약 전환율 12배 상승',
  },
  {
    specialty: '강서구 내과 원장',
    quote:
      '"지인이 하는 거니까 이 정도면 됐지"라고 스스로를 설득했는데, 솔직히 별로였습니다. 전문가가 만든 영상을 보고나서야 차이를 알았어요.',
    result: '채널 리모델링 후 구독자 6배',
  },
];

interface FormData {
  hospitalName: string;
  name: string;
  phone: string;
  channelUrl: string;
}

const CTASection = () => {
  const [formData, setFormData] = useState<FormData>({
    hospitalName: '',
    name: '',
    phone: '',
    channelUrl: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 실제 백엔드 연동 시 여기에 API 호출 추가
    console.log('신청 데이터:', formData);
    setSubmitted(true);
  };

  return (
    <section id='cta' className='bg-white py-24 px-6 md:px-12 lg:px-20'>
      <div className='max-w-4xl mx-auto'>

        {/* 익명 후기 */}
        <motion.div
          className='mb-20'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <p className='text-center text-[#2563EB] font-semibold tracking-widest text-sm uppercase mb-4'>
            Anonymous Reviews
          </p>
          <h3
            className='text-center text-2xl md:text-3xl font-black text-[#0A2342] mb-10'
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            지인에게 차마 말 못 했던
            <br />
            원장님들의 고민, 우리가 해결했습니다
          </h3>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {anonymousReviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className='bg-[#F4F7FF] rounded-2xl p-6 border border-[#E2E8F0]'
              >
                <div className='text-3xl text-[#2563EB] font-black mb-3 leading-none'>&ldquo;</div>
                <p className='text-[#0A2342] text-sm leading-relaxed mb-5 italic'>
                  {review.quote}
                </p>
                <div className='border-t border-[#E2E8F0] pt-4 flex items-center justify-between'>
                  <span className='text-[#64748B] text-xs font-semibold'>
                    {review.specialty}
                  </span>
                  <span className='text-xs font-black text-[#2563EB] bg-[#EFF6FF] px-3 py-1 rounded-full'>
                    {review.result}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA 폼 */}
        <motion.div
          className='text-center mb-12'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <p className='text-[#2563EB] font-semibold tracking-widest text-sm uppercase mb-4'>
            Free Diagnosis
          </p>
          <h2
            className='text-3xl md:text-4xl lg:text-5xl font-black text-[#0A2342] leading-tight'
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            우리 병원 마케팅
            <br />
            <span className='text-[#2563EB]'>1분 무료 진단</span>
          </h2>
          <p className='mt-5 text-[#64748B] text-lg max-w-xl mx-auto'>
            현재 운영 중인 유튜브/인스타 링크만 남겨주세요.
            <br />
            <span className='font-semibold text-[#0A2342]'>
              전문가가 진단 리포트를 직접 보내드립니다.
            </span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className='bg-[#F4F7FF] rounded-3xl p-8 md:p-12 space-y-6 border border-[#E2E8F0]'
            >
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-sm font-black text-[#0A2342] mb-2'>
                    병원명 <span className='text-[#2563EB]'>*</span>
                  </label>
                  <input
                    type='text'
                    name='hospitalName'
                    required
                    value={formData.hospitalName}
                    onChange={handleChange}
                    placeholder='예: ○○ 정형외과의원'
                    className='w-full px-5 py-4 bg-white border-2 border-[#E2E8F0] rounded-xl text-[#0A2342] placeholder-slate-300 focus:outline-none focus:border-[#2563EB] transition-all'
                  />
                </div>
                <div>
                  <label className='block text-sm font-black text-[#0A2342] mb-2'>
                    성함 <span className='text-[#2563EB]'>*</span>
                  </label>
                  <input
                    type='text'
                    name='name'
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder='예: 홍길동 원장'
                    className='w-full px-5 py-4 bg-white border-2 border-[#E2E8F0] rounded-xl text-[#0A2342] placeholder-slate-300 focus:outline-none focus:border-[#2563EB] transition-all'
                  />
                </div>
              </div>

              <div>
                <label className='block text-sm font-black text-[#0A2342] mb-2'>
                  연락처 <span className='text-[#2563EB]'>*</span>
                </label>
                <input
                  type='tel'
                  name='phone'
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder='예: 010-1234-5678'
                  className='w-full px-5 py-4 bg-white border-2 border-[#E2E8F0] rounded-xl text-[#0A2342] placeholder-slate-300 focus:outline-none focus:border-[#2563EB] transition-all'
                />
              </div>

              <div>
                <label className='block text-sm font-black text-[#0A2342] mb-2'>
                  현재 운영 중인 채널 주소
                  <span className='ml-2 text-[#64748B] font-normal text-xs'>
                    (유튜브 / 인스타그램)
                  </span>
                </label>
                <input
                  type='text'
                  name='channelUrl'
                  value={formData.channelUrl}
                  onChange={handleChange}
                  placeholder='예: https://www.youtube.com/@병원채널명'
                  className='w-full px-5 py-4 bg-white border-2 border-[#E2E8F0] rounded-xl text-[#0A2342] placeholder-slate-300 focus:outline-none focus:border-[#2563EB] transition-all'
                />
              </div>

              <button
                type='submit'
                className='w-full py-5 bg-[#0A2342] text-white font-black text-lg rounded-2xl hover:bg-[#2563EB] transition-colors duration-300 shadow-lg shadow-[#0A2342]/20'
              >
                전문가 진단 신청하기 →
              </button>

              <p className='text-center text-[#64748B] text-xs'>
                제출된 정보는 마케팅 진단 목적으로만 사용되며, 외부에 공유되지 않습니다.
              </p>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className='bg-[#0A2342] rounded-3xl p-12 text-center'
            >
              <div className='text-6xl mb-6'>✅</div>
              <h3 className='text-2xl font-black text-white mb-4'>
                신청이 완료되었습니다!
              </h3>
              <p className='text-slate-400 text-lg leading-relaxed'>
                영업일 기준 24시간 이내 담당 전문가가
                <br />
                진단 리포트와 함께 연락드립니다.
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* 신뢰 배지 */}
        <motion.div
          className='flex flex-wrap justify-center gap-4 mt-10 text-sm text-[#64748B]'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {[
            '🔒 개인정보 보호',
            '⚡ 24시간 내 회신',
            '💯 100% 무료 진단',
            '🏥 병원 전문 마케터',
            '📊 데이터 기반 분석',
          ].map((badge) => (
            <span
              key={badge}
              className='flex items-center gap-1 px-4 py-2 bg-[#F4F7FF] rounded-full border border-[#E2E8F0] text-xs font-semibold'
            >
              {badge}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
