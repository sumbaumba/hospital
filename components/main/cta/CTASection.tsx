'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

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
      <div className='max-w-3xl mx-auto'>
        {/* 섹션 헤더 */}
        <motion.div
          className='text-center mb-14'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <p className='text-[#1E5FAD] font-semibold tracking-widest text-sm uppercase mb-4'>
            Free Diagnosis
          </p>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-black text-[#0A1628] leading-tight'>
            우리 병원 마케팅
            <br />
            <span className='text-[#1E5FAD]'>무료 진단</span>
          </h2>
          <p className='mt-6 text-gray-500 text-lg max-w-xl mx-auto'>
            현재 운영 중인 유튜브/인스타 링크만 남겨주세요.
            <br />
            <span className='font-semibold text-[#0A1628]'>
              전문가가 1분 진단 리포트를 보내드립니다.
            </span>
          </p>
        </motion.div>

        {/* 폼 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className='bg-[#F0F4FF] rounded-3xl p-8 md:p-12 space-y-6 border border-[#1E5FAD]/10'
            >
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-sm font-bold text-[#0A1628] mb-2'>
                    병원명 <span className='text-[#1E5FAD]'>*</span>
                  </label>
                  <input
                    type='text'
                    name='hospitalName'
                    required
                    value={formData.hospitalName}
                    onChange={handleChange}
                    placeholder='예: ○○ 정형외과의원'
                    className='w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl text-[#0A1628] placeholder-gray-400 focus:outline-none focus:border-[#1E5FAD] focus:ring-2 focus:ring-[#1E5FAD]/20 transition-all'
                  />
                </div>
                <div>
                  <label className='block text-sm font-bold text-[#0A1628] mb-2'>
                    성함 <span className='text-[#1E5FAD]'>*</span>
                  </label>
                  <input
                    type='text'
                    name='name'
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder='예: 홍길동 원장'
                    className='w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl text-[#0A1628] placeholder-gray-400 focus:outline-none focus:border-[#1E5FAD] focus:ring-2 focus:ring-[#1E5FAD]/20 transition-all'
                  />
                </div>
              </div>

              <div>
                <label className='block text-sm font-bold text-[#0A1628] mb-2'>
                  연락처 <span className='text-[#1E5FAD]'>*</span>
                </label>
                <input
                  type='tel'
                  name='phone'
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder='예: 010-1234-5678'
                  className='w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl text-[#0A1628] placeholder-gray-400 focus:outline-none focus:border-[#1E5FAD] focus:ring-2 focus:ring-[#1E5FAD]/20 transition-all'
                />
              </div>

              <div>
                <label className='block text-sm font-bold text-[#0A1628] mb-2'>
                  현재 운영 중인 채널 주소
                  <span className='ml-2 text-gray-400 font-normal text-xs'>
                    (유튜브 / 인스타그램)
                  </span>
                </label>
                <input
                  type='url'
                  name='channelUrl'
                  value={formData.channelUrl}
                  onChange={handleChange}
                  placeholder='예: https://www.youtube.com/@병원채널명'
                  className='w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl text-[#0A1628] placeholder-gray-400 focus:outline-none focus:border-[#1E5FAD] focus:ring-2 focus:ring-[#1E5FAD]/20 transition-all'
                />
              </div>

              <button
                type='submit'
                className='w-full py-5 bg-[#0A1628] text-white font-black text-lg rounded-2xl hover:bg-[#1E5FAD] transition-colors duration-300 shadow-lg shadow-[#0A1628]/20'
              >
                전문가 진단 신청하기 →
              </button>

              <p className='text-center text-gray-400 text-xs'>
                제출된 정보는 마케팅 진단 목적으로만 사용되며, 외부에 공유되지
                않습니다.
              </p>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className='bg-[#0A1628] rounded-3xl p-12 text-center'
            >
              <div className='text-6xl mb-6'>✅</div>
              <h3 className='text-2xl font-black text-white mb-4'>
                신청이 완료되었습니다!
              </h3>
              <p className='text-gray-400 text-lg leading-relaxed'>
                영업일 기준 24시간 이내 담당 전문가가
                <br />
                진단 리포트와 함께 연락드립니다.
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* 하단 신뢰 배지 */}
        <motion.div
          className='flex flex-wrap justify-center gap-6 mt-12 text-sm text-gray-400'
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
          ].map((badge) => (
            <span
              key={badge}
              className='flex items-center gap-1 px-4 py-2 bg-gray-50 rounded-full border border-gray-100'
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
