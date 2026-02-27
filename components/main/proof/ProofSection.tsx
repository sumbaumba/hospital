'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: '신환 유입률', value: 300, suffix: '%', prefix: '+' },
  { label: '문의 전화량', value: 250, suffix: '%', prefix: '+' },
  { label: '예약 전환율', value: 180, suffix: '%', prefix: '+' },
];

const testimonials = [
  {
    name: '정형외과 원장',
    role: '서울 소재 정형외과',
    quote:
      '"지인에게 맡겼을 때는 영상만 예뻤습니다. 리모델링 후 3개월 만에 신환이 3배 늘었고, 이제 환자들이 유튜브 보고 찾아옵니다."',
    result: '신환 +280%',
  },
  {
    name: '피부과 원장',
    role: '강남 소재 피부과',
    quote:
      '"조회수에만 집착했는데, 이제는 예약률로 성과를 측정합니다. 채널 구독자보다 실제 내원 환자 수가 지표입니다."',
    result: '매출 +320%',
  },
];

const CounterItem = ({
  value,
  suffix,
  prefix,
  label,
}: {
  value: number;
  suffix: string;
  prefix: string;
  label: string;
}) => {
  const countRef = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: value,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top 80%',
          once: true,
        },
        onUpdate: () => {
          if (countRef.current) {
            countRef.current.textContent = Math.floor(obj.val).toString();
          }
        },
      });
    });
    return () => ctx.revert();
  }, [value]);

  return (
    <div ref={triggerRef} className='text-center'>
      <div className='text-5xl md:text-6xl font-black text-white mb-2'>
        <span className='text-[#3B82F6]'>{prefix}</span>
        <span ref={countRef}>0</span>
        <span className='text-[#3B82F6]'>{suffix}</span>
      </div>
      <p className='text-gray-400 font-semibold text-sm tracking-wide uppercase'>
        {label}
      </p>
    </div>
  );
};

const ProofSection = () => {
  return (
    <section className='bg-[#0A1628] py-24 px-6 md:px-12 lg:px-20'>
      <div className='max-w-6xl mx-auto'>
        {/* 섹션 헤더 */}
        <motion.div
          className='text-center mb-20'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <p className='text-[#3B82F6] font-semibold tracking-widest text-sm uppercase mb-4'>
            Social Proof
          </p>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight'>
            리모델링 전 vs 후,
            <br />
            <span className='text-[#3B82F6]'>숫자가 증명합니다</span>
          </h2>
        </motion.div>

        {/* GSAP 카운터 통계 */}
        <motion.div
          className='grid grid-cols-1 md:grid-cols-3 gap-12 mb-20 py-14 border-y border-white/10'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          {stats.map((stat) => (
            <CounterItem key={stat.label} {...stat} />
          ))}
        </motion.div>

        {/* Before / After 비교 */}
        <motion.div
          className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-20'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <div className='bg-red-900/20 border border-red-500/20 rounded-2xl p-8'>
            <div className='flex items-center gap-3 mb-6'>
              <span className='text-2xl'>⚠️</span>
              <span className='text-red-400 font-bold text-lg'>
                Before — 지인 마케팅
              </span>
            </div>
            <ul className='space-y-3'>
              {[
                '조회수 10만, 신환 유입 0명',
                '의사 소개 영상 → 예약 연결 없음',
                '성과 측정 지표 없음',
                '3개월째 구독자 정체',
              ].map((item) => (
                <li
                  key={item}
                  className='flex items-start gap-3 text-gray-400 text-sm'
                >
                  <span className='text-red-400 mt-0.5 flex-shrink-0'>✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className='bg-[#1E5FAD]/20 border border-[#3B82F6]/30 rounded-2xl p-8'>
            <div className='flex items-center gap-3 mb-6'>
              <span className='text-2xl'>✅</span>
              <span className='text-[#3B82F6] font-bold text-lg'>
                After — Marketing Remodeling
              </span>
            </div>
            <ul className='space-y-3'>
              {[
                '월 신환 30명 → 90명 (3개월)',
                '콘텐츠 → 예약 시스템 직결',
                '주간 KPI 리포트 제공',
                '구독자·예약률 동반 상승',
              ].map((item) => (
                <li
                  key={item}
                  className='flex items-start gap-3 text-gray-300 text-sm'
                >
                  <span className='text-[#3B82F6] mt-0.5 flex-shrink-0'>
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* 원장님 인터뷰 testimonials */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className='bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-[#3B82F6]/30 transition-colors'
            >
              <p className='text-gray-300 text-base leading-relaxed italic mb-6'>
                {t.quote}
              </p>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-white font-bold'>{t.name}</p>
                  <p className='text-gray-500 text-sm'>{t.role}</p>
                </div>
                <span className='px-4 py-2 bg-[#1E5FAD]/30 text-[#3B82F6] text-sm font-bold rounded-full'>
                  {t.result}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProofSection;
