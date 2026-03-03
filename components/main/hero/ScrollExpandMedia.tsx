'use client';

import {
  useEffect,
  useRef,
  useState,
  memo,
  ReactNode,
  TouchEvent,
  WheelEvent,
  type RefObject,
} from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

/* ─────────────────────────────────────────────────────────────────────────
   VideoPlayer — React.memo로 완전 격리된 video 엘리먼트
   부모 컴포넌트가 리렌더링되더라도 이 컴포넌트는 절대 재렌더링되지 않는다.
   덕분에 React가 video.muted 재설정 / src 재검사 / 내부 파이프라인 재초기화를
   수행하는 것을 완전히 차단 → 영상 재생 중 멈춤(freeze) 제거.
───────────────────────────────────────────────────────────────────────── */
const VideoPlayer = memo(function VideoPlayer({
  src,
  poster,
  videoRef,
  objectFit = 'cover',
}: {
  src: string;
  poster?: string;
  videoRef: RefObject<HTMLVideoElement | null>;
  objectFit?: 'cover' | 'contain';
}) {
  // iOS 자동재생 보장: React JSX의 muted prop이 DOM attribute로 제대로
  // 전달되지 않는 React 버그를 우회 → 명시적으로 muted 설정 후 play() 호출
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      autoPlay
      muted
      playsInline
      preload='auto'
      className='w-full h-full pointer-events-none'
      style={{ objectFit }}
      controls={false}
      disablePictureInPicture
      disableRemotePlayback
    />
  );
});
VideoPlayer.displayName = 'VideoPlayer';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc?: string;
  bgContent?: ReactNode;
  title?: string;
  scrollToExpand?: string;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  bgContent,
  title,
  scrollToExpand,
  children,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);
  const [touchStartY, setTouchStartY] = useState<number>(0);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(1);
  const [windowWidth, setWindowWidth] = useState<number>(1920);
  const [windowHeight, setWindowHeight] = useState<number>(1080);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const autoExpandRef = useRef<{
    soundStarted: boolean;
    triggered: boolean;
    completed: boolean;
    rafId: number | null;
    startTime: number | null;
  }>({ soundStarted: false, triggered: false, completed: false, rafId: null, startTime: null });

  // RAF 애니메이션 중 React 리렌더 없이 DOM을 직접 조작하기 위한 ref들
  const dimensionsRef     = useRef({ width: 1920, height: 1080, startW: 340, startH: 400 });
  const mediaContainerRef = useRef<HTMLDivElement | null>(null);
  const videoScaleRef     = useRef<HTMLDivElement | null>(null);
  const bgRef             = useRef<HTMLDivElement | null>(null);
  const titleRef          = useRef<HTMLDivElement | null>(null);
  const scrollHintRef     = useRef<HTMLDivElement | null>(null);
  const soundBtnRef       = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
  }, [mediaType]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // 자동 확장 애니메이션 진행 중에만 스크롤 이벤트 무시 (완료 후엔 축소 허용)
      if (autoExpandRef.current.triggered && !autoExpandRef.current.completed) return;
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollDelta = e.deltaY * 0.0009;
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1
        );
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY) return;
      // 자동 확장 애니메이션 진행 중에만 터치 이벤트 무시 (완료 후엔 축소 허용)
      if (autoExpandRef.current.triggered && !autoExpandRef.current.completed) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollFactor = deltaY < 0 ? 0.008 : 0.005;
        const scrollDelta = deltaY * scrollFactor;
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1
        );
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }

        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = (): void => {
      setTouchStartY(0);
    };

    const handleScroll = (): void => {
      if (!mediaFullyExpanded) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('wheel', handleWheel as unknown as EventListener, {
      passive: false,
    });
    window.addEventListener('scroll', handleScroll as EventListener);
    window.addEventListener(
      'touchstart',
      handleTouchStart as unknown as EventListener,
      { passive: false }
    );
    window.addEventListener(
      'touchmove',
      handleTouchMove as unknown as EventListener,
      { passive: false }
    );
    window.addEventListener('touchend', handleTouchEnd as EventListener);

    return () => {
      window.removeEventListener(
        'wheel',
        handleWheel as unknown as EventListener
      );
      window.removeEventListener('scroll', handleScroll as EventListener);
      window.removeEventListener(
        'touchstart',
        handleTouchStart as unknown as EventListener
      );
      window.removeEventListener(
        'touchmove',
        handleTouchMove as unknown as EventListener
      );
      window.removeEventListener('touchend', handleTouchEnd as EventListener);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY]);

  useEffect(() => {
    const checkIfMobile = (): void => {
      const isMobile = window.innerWidth < 768;
      setIsMobileState(isMobile);
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
      // RAF 애니메이션 클로저가 최신 크기를 ref에서 읽도록 동기화
      // 16:9 비율 초기 박스 — scale 기반 축소라 startW/startH가 클수록 더 많이 보임
      const sw = isMobile ? 300 : 640;
      dimensionsRef.current = {
        width:  window.innerWidth,
        height: window.innerHeight,
        startW: sw,
        startH: Math.round(sw * 9 / 16),
      };
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  /* ── 5초: 소리 켜기 / 5초20프레임: transform:scale 자동 확장 / 루프 처리 ──
     ⚠️ width/height 변경은 레이아웃 재계산 → 비디오 디코더 stall → 영상 멈춤.
        transform:scale()은 GPU 합성 레이어만 업데이트 → 레이아웃 없음 → 안전.
  ────────────────────────────────────────────────────────────────────── */
  useEffect(() => {
    const video = videoRef.current;
    if (!video || mediaType !== 'video' || mediaSrc.includes('youtube.com')) return;

    const EXPAND_AT  = 5 + 20 / 30; // ≈ 5.667초
    const EXPAND_DUR = 2200;         // ms

    const onTimeUpdate = () => {
      const t = video.currentTime;

      // 영상 끝 0.5초 전 선제 루프
      if (video.duration > 0 && t >= video.duration - 0.5) {
        video.currentTime = 0;
        return;
      }

      // 5초 20프레임: transform:scale 자동 확장
      if (!autoExpandRef.current.triggered && t >= EXPAND_AT) {
        autoExpandRef.current.triggered = true;
        autoExpandRef.current.startTime = performance.now();

        const { width: ww, height: wh, startW: sw, startH: sh } = dimensionsRef.current;
        // 균등 스케일: min(startW/screenW, startH/screenH) → 왜곡 없이 영상 전체를 축소 표시
        const initScale = Math.min(sw / ww, sh / wh);

        const animate = (now: number) => {
          const elapsed  = now - autoExpandRef.current.startTime!;
          const progress = Math.min(elapsed / EXPAND_DUR, 1);
          const eased    = 1 - Math.pow(1 - progress, 2.5); // ease-out

          // currentScale: initScale(초기 축소) → 1(풀스크린)
          const currentScale = initScale + eased * (1 - initScale);

          // ─── clip-path: 스케일된 영상 크기와 정확히 일치 ─────────────────────
          if (mediaContainerRef.current) {
            const topClip  = Math.round(wh * (1 - currentScale) / 2);
            const sideClip = Math.round(ww * (1 - currentScale) / 2);
            const radius   = Math.round(16 * (1 - currentScale));
            mediaContainerRef.current.style.clipPath =
              currentScale >= 0.999
                ? 'none'
                : `inset(${topClip}px ${sideClip}px ${topClip}px ${sideClip}px round ${radius}px)`;
          }
          // ─── 내부 영상 스케일: 영상 전체가 자연스럽게 작게 보임 ────────────
          if (videoScaleRef.current) {
            videoScaleRef.current.style.transform = `scale(${currentScale})`;
          }
          // ─────────────────────────────────────────────────────────────────────

          if (bgRef.current)
            bgRef.current.style.opacity = `${1 - eased}`;
          if (titleRef.current)
            titleRef.current.style.opacity = `${Math.max(0, 1 - eased * 2.2)}`;
          if (scrollHintRef.current)
            scrollHintRef.current.style.opacity = `${Math.max(0, 1 - eased * 3)}`;
          if (soundBtnRef.current) {
            const btnTopClip  = Math.round(wh * (1 - currentScale) / 2);
            const btnSideClip = Math.round(ww * (1 - currentScale) / 2);
            const isMobileAnim = ww < 768;
            const visHalfH     = wh * currentScale / 2;
            const btnTop   = isMobileAnim
              ? Math.round(wh / 2 + visHalfH + 8)   // 클립 바로 아래
              : Math.round(wh - btnTopClip - 60);    // 클립 내 우하단
            const btnRight = isMobileAnim ? btnSideClip : btnSideClip + 16;
            soundBtnRef.current.style.top   = `${btnTop}px`;
            soundBtnRef.current.style.right = `${btnRight}px`;
          }

          if (progress < 1) {
            autoExpandRef.current.rafId = requestAnimationFrame(animate);
          } else {
            autoExpandRef.current.completed = true;
            if (mediaContainerRef.current) {
              mediaContainerRef.current.style.clipPath   = '';
              mediaContainerRef.current.style.willChange = '';
            }
            if (videoScaleRef.current) {
              videoScaleRef.current.style.transform = '';
            }
            setScrollProgress(1);
            setMediaFullyExpanded(true);
            setShowContent(true);
          }
        };

        autoExpandRef.current.rafId = requestAnimationFrame(animate);
      }
    };

    const onEnded = () => {
      video.currentTime = 0;
      video.play().catch(() => {});
    };

    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('ended', onEnded);
    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('ended', onEnded);
      if (autoExpandRef.current.rafId !== null) {
        cancelAnimationFrame(autoExpandRef.current.rafId);
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── 히어로 섹션이 뷰포트에서 90% 이상 벗어나면 자동 뮤트 ── */
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section || mediaType !== 'video') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio < 0.1) {
          video.muted = true;
          setIsMuted(true);
        }
      },
      { threshold: [0, 0.1] }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [mediaType]);

  const startW = isMobileState ? 300 : 640;
  const startH = Math.round(startW * 9 / 16); // 16:9 비율

  // 균등 스케일: min(startW/screenW, startH/screenH)
  // → 영상이 왜곡 없이 작게 보임 (clip-path로 줌인되는 문제 해결)
  const initialScale = windowWidth > 0
    ? Math.min(startW / windowWidth, startH / windowHeight)
    : 1;
  const scaleFactor = scrollProgress >= 1
    ? 1
    : initialScale + scrollProgress * (1 - initialScale);

  // clip-path: 스케일된 영상 크기와 정확히 일치 → 영상만 딱 맞게 보임
  const topClip    = scrollProgress >= 1 ? 0 : Math.round(windowHeight * (1 - scaleFactor) / 2);
  const sideClip   = scrollProgress >= 1 ? 0 : Math.round(windowWidth  * (1 - scaleFactor) / 2);
  const clipRadius = Math.round(16 * (1 - scaleFactor));
  const clipPathStyle = scrollProgress >= 1
    ? 'none'
    : `inset(${topClip}px ${sideClip}px ${topClip}px ${sideClip}px round ${clipRadius}px)`;

  // 타이틀 위치 계산: 스케일된 영상의 실제 보이는 절반 높이
  const visibleHalfH = (windowHeight * scaleFactor) / 2;

  const textOpacity = Math.max(0, 1 - scrollProgress * 2.2);

  // 소리 버튼 위치:
  // 모바일 — 클립 영역 바로 아래 (좁은 클립 안에 버튼이 들어갈 공간 없음)
  // 데스크톱 — 클립 영역 내 우하단
  const soundBtnTop = isMobileState
    ? Math.round(windowHeight / 2 + visibleHalfH + 8)
    : Math.round(windowHeight - topClip - 60);
  const soundBtnRight = isMobileState ? sideClip : sideClip + 16;

  const handleMuteToggle = () => {
    const video = videoRef.current;
    if (!video) return;
    const newMuted = !isMuted;
    video.muted = newMuted;
    if (!newMuted) video.volume = volume;
    setIsMuted(newMuted);
  };

  // 제목을 절반 지점에서 두 줄로 분리
  const words = title ? title.split(' ') : [];
  const mid   = Math.ceil(words.length / 2);
  const titleLine1 = words.slice(0, mid).join(' ');
  const titleLine2 = words.slice(mid).join(' ');

  return (
    <div
      ref={sectionRef}
      className='transition-colors duration-700 ease-in-out overflow-x-hidden'
    >
      <section className='relative flex flex-col items-center justify-start min-h-[100dvh]'>
        <div className='relative w-full flex flex-col items-center min-h-[100dvh]'>

          {/* ── 배경 ── */}
          <div
            ref={bgRef}
            className='absolute inset-0 z-0 h-full'
            style={{ opacity: 1 - scrollProgress }}
          >
            {bgContent ? (
              bgContent
            ) : bgImageSrc ? (
              <>
                <Image
                  src={bgImageSrc}
                  alt='Background'
                  width={1920}
                  height={1080}
                  className='w-screen h-screen'
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                  priority
                />
                <div className='absolute inset-0 bg-black/10' />
              </>
            ) : null}
          </div>

          {/* ── 영상 컨테이너 — container 제약 밖, 풀뷰포트 기준으로 clip-path 적용 ──
               inset-0 을 쓰면 부모(min-h)가 늘어날 때 같이 늘어나므로
               top-0/left-0 + w-full/h-[100dvh] 로 뷰포트에 고정 */}
          <div
            ref={mediaContainerRef}
            className='absolute z-[1] top-0 left-0 w-full h-[100dvh] transition-none'
            style={{
              clipPath: clipPathStyle,
              willChange: scrollProgress >= 1 ? 'auto' : 'clip-path',
            }}
          >
            {/* ── 내부 스케일 래퍼 ──
                 clip-path(외부)와 scale(내부)를 동기화:
                 clip = 화면 * (1 - scale) / 2  →  스케일된 영상 크기와 정확히 일치
                 결과: 영상이 줌인 없이 자연스럽게 작은 상태로 보임 */}
            <div
              ref={videoScaleRef}
              className='absolute inset-0 w-full h-full bg-black'
              style={{ transform: `scale(${scaleFactor})`, transformOrigin: 'center center' }}
            >
            {mediaType === 'video' ? (
              mediaSrc.includes('youtube.com') ? (
                <div className='relative w-full h-full pointer-events-none overflow-hidden'>
                  <iframe
                    width='100%'
                    height='100%'
                    src={
                      mediaSrc.includes('embed')
                        ? mediaSrc +
                          (mediaSrc.includes('?') ? '&' : '?') +
                          'autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1'
                        : mediaSrc.replace('watch?v=', 'embed/') +
                          '?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=' +
                          mediaSrc.split('v=')[1]
                    }
                    className='w-full h-full'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                  />
                  <div className='absolute inset-0 z-10' style={{ pointerEvents: 'none' }} />
                  <motion.div
                    className='absolute inset-0 bg-black/30'
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
              ) : (
                <div className='relative w-full h-full overflow-hidden'>
                  <VideoPlayer
                    src={mediaSrc}
                    poster={posterSrc}
                    videoRef={videoRef}
                    objectFit={isMobileState ? 'contain' : 'cover'}
                  />

                  <div
                    className='absolute inset-0 bg-black/30 pointer-events-none'
                    style={{ opacity: 0.5 - scrollProgress * 0.3 }}
                  />

                </div>
              )
            ) : (
              <div className='relative w-full h-full overflow-hidden'>
                <Image
                  src={mediaSrc}
                  alt={title || 'Media content'}
                  width={1280}
                  height={720}
                  className='w-full h-full object-cover'
                />
                <motion.div
                  className='absolute inset-0 bg-black/50'
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: 0.7 - scrollProgress * 0.3 }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            )}
            </div> {/* end videoScaleRef */}
          </div> {/* end mediaContainerRef */}

          {/* ── 소리 버튼 — clip-path/scale 바깥에 배치, 항상 영상 우하단에 표시 ── */}
          {mediaType === 'video' && !mediaSrc.includes('youtube.com') && (
            <div
              ref={soundBtnRef}
              className='absolute z-[15] transition-none'
              style={{
                top:   `${soundBtnTop}px`,
                right: `${soundBtnRight}px`,
              }}
            >
              <button
                onClick={handleMuteToggle}
                className='flex items-center gap-1.5 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full px-3 py-2 text-white text-xs font-medium transition-colors duration-200'
              >
                {isMuted ? (
                  /* 음소거 아이콘 */
                  <svg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 24 24' fill='currentColor'>
                    <path d='M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z'/>
                  </svg>
                ) : (
                  /* 소리 켜짐 아이콘 */
                  <svg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 24 24' fill='currentColor'>
                    <path d='M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z'/>
                  </svg>
                )}
                <span>{isMuted ? '소리 켜기' : '소리 끄기'}</span>
              </button>
            </div>
          )}

          {/* ── 제목 오버레이 — titleRef로 묶어 RAF에서 opacity 일괄 제어 ──
               윗줄: 영상 바로 위 / 아랫줄: 영상 바로 아래
               bottom: calc(50% + startH/2 + gap) → 윗줄 하단이 영상 상단과 정렬 */}
          {title && (
            <div
              ref={titleRef}
              className='absolute top-0 left-0 w-full h-[100dvh] z-10 pointer-events-none select-none'
              style={{ opacity: textOpacity }}
            >
              {/* 윗줄 — 영상 바로 위, 스케일된 실제 영상 상단에서 14px 위 */}
              <div
                className='absolute left-0 right-0 text-center px-6'
                style={{ bottom: `calc(50% + ${Math.round(visibleHalfH) + 14}px)` }}
              >
                <p
                  className='font-medium tracking-[0.15em] text-white/80 text-lg sm:text-xl md:text-2xl'
                  style={{ textShadow: '0 1px 20px rgba(0,0,0,0.9)' }}
                >
                  {titleLine1}
                </p>
              </div>

              {/* 아랫줄 — 영상 바로 아래, 스케일된 실제 영상 하단에서 14px 아래 */}
              {titleLine2 && (
                <div
                  className='absolute left-0 right-0 text-center px-6'
                  style={{ top: `calc(50% + ${Math.round(visibleHalfH) + 14}px)` }}
                >
                  <h2
                    className='font-black leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl'
                    style={{
                      fontFamily: 'var(--font-serif)',
                      color: '#C9A84C',
                      textShadow: '0 2px 30px rgba(0,0,0,0.95), 0 0 60px rgba(0,0,0,0.7)',
                    }}
                  >
                    {titleLine2}
                  </h2>
                </div>
              )}
            </div>
          )}

          {/* ── 스크롤 힌트 ── */}
          {scrollToExpand && (
            <div
              ref={scrollHintRef}
              className='absolute bottom-[8%] left-0 right-0 text-center z-10 pointer-events-none'
              style={{ opacity: Math.max(0, 1 - scrollProgress * 3) }}
            >
              <p className='text-white/60 text-xs font-semibold tracking-[0.28em] uppercase mb-3'>
                {scrollToExpand}
              </p>
              <div className='flex justify-center'>
                <div className='w-5 h-9 rounded-full border border-white/35 flex items-start justify-center pt-1.5'>
                  <div className='w-[3px] h-2 bg-white/60 rounded-full animate-bounce' />
                </div>
              </div>
            </div>
          )}

          {/* ── 컨텐츠 — 히어로 뷰포트 이후에 표시 ── */}
          <div className='container mx-auto flex flex-col items-center justify-start relative z-10 pointer-events-none'>
            <div className='h-[100dvh]' /> {/* 히어로 영역 공간 확보 */}
            <motion.section
              className='flex flex-col w-full px-8 py-10 md:px-16 lg:py-20 pointer-events-auto'
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7 }}
            >
              {children}
            </motion.section>
          </div>

        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
