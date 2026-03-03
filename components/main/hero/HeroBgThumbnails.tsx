'use client';

import { memo } from 'react';

/* ────────────────────────────────────────────────────────────
   포트폴리오 YouTube 썸네일 11개 → 5행 × 14(+14 복사) = 140 슬롯
   행마다 방향·속도가 달라 입체감 연출

   SET_WIDTH = PER_SET × (ITEM_W + GAP) = 14 × (224 + 10) = 3276 px
   keyframes: translate3d(-3276px, 0, 0)  ← GPU 합성 강제
   React.memo → 부모 리렌더링 시에도 CSS 애니메이션 재시작 없음
──────────────────────────────────────────────────────────── */

const ALL_IDS = [
  '3-iWgxCAvO0',
  'nUaPBdIe9Pg',
  'ip7BOmIAXjw',
  'mZP9_RauQ_4',
  'rUhq9MyYHbM',
  'opVGpZiVOPM',
  'ktrWZu_XiA4',
  'BBw0NRMeR_0',
  'd6_-Ud2lXN8',
  'vU9we8Vu1wA',
  'mXfO_2FejCg',
];

const ITEM_W = 224; // px
const GAP    = 10;  // px
const PER_SET = 14; // 1세트 썸네일 수 (14 × 234px = 3276px — 4K 모니터 커버)

function makeRow(offset: number): string[] {
  return Array.from({ length: PER_SET }, (_, i) =>
    ALL_IDS[(i + offset) % ALL_IDS.length]
  );
}

const ROWS = [
  { ids: makeRow(0), dir: 'left',  duration: 34 },
  { ids: makeRow(3), dir: 'right', duration: 26 },
  { ids: makeRow(6), dir: 'left',  duration: 42 },
  { ids: makeRow(2), dir: 'right', duration: 30 },
  { ids: makeRow(5), dir: 'left',  duration: 38 },
] as const;

/* ─── 개별 행 컴포넌트도 memo로 격리 ─── */
const Row = memo(({ ids, dir, duration }: (typeof ROWS)[number]) => {
  const doubled = [...ids, ...ids]; // 16개 — 무한 루프
  return (
    <div className='flex-1 relative overflow-hidden'>
      <div
        className='absolute inset-y-0 left-0 flex h-full'
        style={{
          gap: `${GAP}px`,
          animation: `hero-scroll-${dir} ${duration}s linear infinite`,
          willChange: 'transform',
          backfaceVisibility: 'hidden',
        }}
      >
        {doubled.map((id, j) => (
          <div
            key={j}
            className='relative shrink-0 h-full overflow-hidden'
            style={{ width: `${ITEM_W}px`, borderRadius: '8px' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
              alt=''
              className='w-full h-full object-cover opacity-70'
              loading='eager'
              decoding='async'
              width={224}
              height={126}
            />
            {/* 썸네일별 네이비 틴트 */}
            <div className='absolute inset-0 bg-[#0A1628]/25' />
          </div>
        ))}
      </div>
    </div>
  );
});
Row.displayName = 'ThumbnailRow';

/* ─── 메인 컴포넌트 ─── */
const HeroBgThumbnails = () => (
  <div
    className='absolute inset-0 overflow-hidden flex flex-col bg-[#060E1C]'
    style={{ gap: `${GAP}px`, padding: `${GAP}px 0` }}
    aria-hidden='true'
  >
    {ROWS.map((row, i) => (
      <Row key={i} {...row} />
    ))}

    {/* 전체 다크 오버레이 */}
    <div className='absolute inset-0 bg-[#0A1628]/55 pointer-events-none' />

    {/* 상·하단 비네트 */}
    <div
      className='absolute inset-0 pointer-events-none'
      style={{
        background:
          'linear-gradient(to bottom, #060E1C 0%, transparent 28%, transparent 72%, #060E1C 100%)',
      }}
    />

    {/* 좌·우 비네트 */}
    <div
      className='absolute inset-0 pointer-events-none'
      style={{
        background:
          'linear-gradient(to right, #060E1C 0%, transparent 18%, transparent 82%, #060E1C 100%)',
      }}
    />
  </div>
);

export default memo(HeroBgThumbnails);
