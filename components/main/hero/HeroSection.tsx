'use client';

import { motion } from 'framer-motion';
import ScrollExpandMedia from './ScrollExpandMedia';
import HeroBgThumbnails from './HeroBgThumbnails';

const SHOWREEL_SRC = '/showreel.mp4';

const HeroSection = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <ScrollExpandMedia
      mediaType='video'
      mediaSrc={SHOWREEL_SRC}
      bgContent={<HeroBgThumbnails />}
      title='아는 지인이라서 참고 계셨습니까?'
      scrollToExpand='스크롤하여 확인하기'

    >
      {/* 히어로 확장 후 노출되는 서브 카피 */}
      <motion.div
        className='flex flex-col items-center text-center gap-8 py-8'
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <p className='text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed'>
          영상 조회수는 늘었는데 환자가 늘지 않는다면,
          <br />
          <span className='font-bold text-[#1E5FAD]'>
            그건 마케팅이 아니라 &apos;취미 생활&apos;입니다.
          </span>
        </p>
        <button
          onClick={() => scrollToSection('cta')}
          className='px-10 py-4 bg-[#1E5FAD] text-white font-bold text-lg rounded-full hover:bg-[#0A1628] transition-colors duration-300 shadow-lg'
        >
          전문가 진단 신청 →
        </button>
      </motion.div>
    </ScrollExpandMedia>
  );
};

export default HeroSection;
