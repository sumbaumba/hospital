'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

type TabId = 'branding' | 'youtube' | 'viral' | 'sketch';

interface PortfolioItem {
  id: string;
  title: string;
  desc: string;
  tag: string;
  youtubeId: string;
}

const tabs: { id: TabId; label: string; sub: string }[] = [
  { id: 'branding', label: 'Premium Branding', sub: 'TVCF · 기업 브랜딩 필름' },
  { id: 'youtube', label: 'Growth Management', sub: '유튜브 채널 상시 운영' },
  { id: 'viral', label: 'Viral Impact', sub: '인스타 릴스 · 숏폼 바이럴' },
  { id: 'sketch', label: 'Professional Sketch', sub: '학회 · 세미나 · 스케치' },
];

const portfolioItems: Record<TabId, PortfolioItem[]> = {
  branding: [
    {
      id: 'b1',
      title: '휴먼피부과 은평점',
      desc: '프리미엄 피부과 이미지를 극대화한 고품격 병원 홍보 영상',
      tag: '병원 브랜딩',
      youtubeId: '3-iWgxCAvO0',
    },
    {
      id: 'b2',
      title: '송도 휴먼피부과',
      desc: '지역 대표 피부과로서의 신뢰와 전문성을 담은 브랜딩 필름',
      tag: '병원 브랜딩',
      youtubeId: 'nUaPBdIe9Pg',
    },
    {
      id: 'b3',
      title: '강서 휴먼피부과',
      desc: '환자의 시선으로 설계한 감성적 병원 소개 영상',
      tag: '병원 브랜딩',
      youtubeId: 'ip7BOmIAXjw',
    },
    {
      id: 'b4',
      title: '청라 휴먼피부과',
      desc: '청라 지역 신규 개원 피부과의 첫인상을 결정한 브랜딩 영상',
      tag: '개원 브랜딩',
      youtubeId: 'mZP9_RauQ_4',
    },
    {
      id: 'b5',
      title: '아이디치과',
      desc: '치과의 전문성과 따뜻함을 동시에 담은 고퀄리티 홍보 영상',
      tag: '치과 브랜딩',
      youtubeId: 'rUhq9MyYHbM',
    },
    {
      id: 'b6',
      title: '메가비뇨기과 강서마곡점',
      desc: '남성 의료 특화 클리닉의 신뢰감을 높이는 브랜드 필름',
      tag: '전문 클리닉',
      youtubeId: 'opVGpZiVOPM',
    },
  ],
  youtube: [
    {
      id: 'y1',
      title: '피부톡톡',
      desc: '피부 고민을 가진 시청자를 잠재 환자로 전환하는 채널 운영 전략',
      tag: '채널 운영',
      youtubeId: 'ktrWZu_XiA4',
    },
  ],
  viral: [
    {
      id: 'v1',
      title: '닥터조물주 카카오이모티콘',
      desc: '의사 캐릭터를 활용한 바이럴 콘텐츠로 친근한 브랜드 이미지 구축',
      tag: '바이럴 캠페인',
      youtubeId: 'BBw0NRMeR_0',
    },
    {
      id: 'v2',
      title: '살빠제 영상',
      desc: '다이어트 시술 특화 숏폼으로 젊은 층 타겟 바이럴 마케팅',
      tag: '숏폼 바이럴',
      youtubeId: 'd6_-Ud2lXN8',
    },
  ],
  sketch: [
    {
      id: 's1',
      title: '휴먼네트워크 실전라이브 스케치',
      desc: '의료진 네트워킹 행사의 현장감을 생동감 있게 담은 스케치 영상',
      tag: '행사 스케치',
      youtubeId: 'vU9we8Vu1wA',
    },
    {
      id: 's2',
      title: '프로퀘셔널',
      desc: '의료 전문가의 권위와 실력을 담아낸 프로페셔널 필름',
      tag: '전문가 필름',
      youtubeId: 'mXfO_2FejCg',
    },
  ],
};

const YouTubePlayButton = () => (
  <svg viewBox='0 0 68 48' className='w-16 h-11'>
    {/* 빨간 배경 */}
    <path
      d='M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z'
      fill='#FF0000'
    />
    {/* 흰 삼각형 */}
    <path d='M45 24 27 14v20' fill='#fff' />
  </svg>
);

const PortfolioSection = () => {
  const [activeTab, setActiveTab] = useState<TabId>('branding');
  const [playingId, setPlayingId] = useState<string | null>(null);

  return (
    <section id='portfolio' className='bg-[#0A2342] py-24 px-6 md:px-12 lg:px-20'>
      <div className='max-w-6xl mx-auto'>
        {/* 헤더 */}
        <motion.div
          className='text-center mb-14'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <p className='text-[#C9A84C] font-semibold tracking-widest text-sm uppercase mb-4'>
            Portfolio
          </p>
          <h2
            className='text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight'
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            우리의 스펙트럼은
            <br />
            <span className='text-[#C9A84C]'>하나의 장르로 설명되지 않습니다</span>
          </h2>
          <p className='mt-5 text-slate-400 text-lg max-w-xl mx-auto'>
            TVCF급 브랜딩부터 바이럴 숏폼까지. 영상을 클릭해서 직접 확인하세요.
          </p>
        </motion.div>

        {/* 탭 */}
        <div className='flex flex-wrap justify-center gap-3 mb-12'>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-[#2563EB] text-white shadow-lg shadow-[#2563EB]/30'
                  : 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className='block'>{tab.label}</span>
              <span
                className={`block text-xs font-normal mt-0.5 ${
                  activeTab === tab.id ? 'text-blue-200' : 'text-slate-500'
                }`}
              >
                {tab.sub}
              </span>
            </button>
          ))}
        </div>

        {/* 포트폴리오 그리드 — 항상 3열 */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className='grid grid-cols-1 sm:grid-cols-3 gap-5'
          >
            {portfolioItems[activeTab].map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay: i * 0.07 }}
                className='relative rounded-2xl overflow-hidden group cursor-pointer'
                style={{ aspectRatio: '16/9' }}
              >
                {/* 썸네일 — 항상 렌더링 (배경 유지) */}
                <Image
                  src={`https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`}
                  alt={item.title}
                  fill
                  className='object-cover transition-transform duration-500 group-hover:scale-105'
                  unoptimized
                />

                {/* iframe — 재생 시 썸네일 위에 페이드인 */}
                {playingId === item.id && (
                  <motion.iframe
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    width='100%'
                    height='100%'
                    src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                    title={item.title}
                    frameBorder='0'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                    className='absolute inset-0 w-full h-full'
                  />
                )}

                {/* 재생 전: 오버레이 + 재생 버튼 + 하단 정보 */}
                {playingId !== item.id && (
                  <>
                    <div className='absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-300' />

                    <button
                      onClick={() => setPlayingId(item.id)}
                      className='absolute inset-0 flex items-center justify-center w-full'
                      aria-label={`${item.title} 재생`}
                    >
                      <div className='transition-transform duration-200 group-hover:scale-110 drop-shadow-lg'>
                        <YouTubePlayButton />
                      </div>
                    </button>

                    <div className='absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/85 to-transparent pointer-events-none'>
                      <span className='inline-block px-2 py-0.5 bg-[#2563EB]/80 text-white text-xs rounded mb-1'>
                        {item.tag}
                      </span>
                      <h4 className='text-white font-black text-sm leading-snug'>
                        {item.title}
                      </h4>
                      <p className='text-white/60 text-xs mt-0.5 line-clamp-1 group-hover:text-white/80 transition-colors'>
                        {item.desc}
                      </p>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PortfolioSection;
