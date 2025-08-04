import clsx from 'clsx';
import { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import { useLenis } from 'lenis/react';

import { throttle } from '../../utils/throttle';

import AnimatedTitle from '../atoms/AnimatedTitle';
import Button from '../atoms/Button';

const ListItems = [
  {
    title: 'Shaping Zentry Collectively',
    text: "Participate in governance, influence key decisions in the ever-growing Zentry Universe that is limited only by people's imaginations.",
  },
  {
    title: 'Unlocking Economic Opportunity',
    text: 'ZENT, a commodity-based currency that unlocks exclusive benefits, airdrops, quotas, and co-creation within and beyond Zentry ecosystem.',
  },
  {
    title: 'Sharing Value Accrued',
    text: "ZENT holders thrive as Zentry grows, benefiting from the expansive partnerships, treasury investment and economic activities.",
  },
];

const SCROLL_THRESHOLD = 2;

const Benefits = () => {
  const lenis = useLenis();

  const [expandedIdx, setExpandedIdx] = useState(0);     // 目前展開的 li index
  const [scrollCount, setScrollCount] = useState(0);     // 滾輪累積次數
  const [isInSection, setIsInSection] = useState(false); // 是否在區塊內

  const sectionRef = useRef(null);
  const lastScrollYRef = useRef(typeof window !== 'undefined' ? window.scrollY : 0);
  const hasJustUnlocked = useRef(false);

  // scroll 到區塊中間
  const scrollSectionToCenter = useCallback(() => {
    if (hasJustUnlocked.current || !sectionRef.current) return;

    // 計算區塊應該置中的位置
    const rect = sectionRef.current.getBoundingClientRect();
    const offsetTop = sectionRef.current.offsetTop;
    const center = Math.max(0, offsetTop - (window.innerHeight - rect.height) / 2);

    lenis?.scrollTo(center, {
      duration: 0,
      onComplete: () => setScrollCount(0),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 當 scroll 到區塊時，鎖定視窗在區塊中間。
  const handleScroll = useCallback(() => {
    if (!sectionRef.current) return;

    const currScrollY = window.scrollY;
    const prevScrollY = lastScrollYRef.current;
    const delta = currScrollY - prevScrollY;
    lastScrollYRef.current = currScrollY;

    if (Math.abs(delta) < 2) return;
    const direction = delta > 0 ? 'down' : 'up';

    // 取得區塊在視窗內的位置
    const rect = sectionRef.current.getBoundingClientRect();
    const sectionCenter = rect.top + rect.height / 2;
    const viewportCenter = window.innerHeight / 2;

    // 當 section 中點接近 viewport 中點範圍內才觸發
    const isCenter = Math.abs(sectionCenter - viewportCenter) < 150;

    if (isCenter && !isInSection) {
      // 根據 scroll 方向，重置 List 項目。
      if (direction === 'down' && expandedIdx !== 0) setExpandedIdx(0);
else if (direction === 'up' && expandedIdx !== ListItems.length - 1) setExpandedIdx(ListItems.length - 1);
      scrollSectionToCenter();
      setIsInSection(true);
    } else if (!isCenter && isInSection) setIsInSection(false);
  }, [isInSection, expandedIdx, scrollSectionToCenter]);

  // 解鎖 scroll 走出區塊
  const unlockAndScroll = useCallback((direction) => {
    if (hasJustUnlocked.current) return; // 防止重複 unlock

    setIsInSection(false);
    hasJustUnlocked.current = true;
    setTimeout(() => hasJustUnlocked.current = false, 1200);

    if (sectionRef.current && lenis) {
      const rect = sectionRef.current.getBoundingClientRect();
      if (direction === 'down') lenis.scrollTo(window.scrollY + rect.bottom, { duration: 2 });
      else lenis.scrollTo(window.scrollY + rect.top - window.innerHeight, { duration: 2 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 處理區塊內的 Scroll 事件：List 項目會隨著 scroll 展開或收起，當每個項目都展開過後，會解鎖區塊，讓使用者可以 scroll 離開區塊。
  const handleWheel = useMemo(() => {
    return throttle((e) => {
      e.preventDefault();
      e.stopPropagation();

      const isDown = e.deltaY > 0;
      if (isDown) {
        if (expandedIdx < ListItems.length - 1) {
          const nextCount = scrollCount + 1;
          if (nextCount >= SCROLL_THRESHOLD) {
            setExpandedIdx(expandedIdx + 1);
            setScrollCount(0);
          } else setScrollCount(nextCount);
        } else unlockAndScroll('down');
      } else {
        if (expandedIdx > 0) {
          const nextCount = scrollCount - 1;
          if (nextCount <= -SCROLL_THRESHOLD) {
            setExpandedIdx(expandedIdx - 1);
            setScrollCount(0);
          } else setScrollCount(nextCount);
        } else unlockAndScroll('up');
      }
    }, 100);
  }, [expandedIdx, scrollCount, unlockAndScroll]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (!isInSection) return;

    window.addEventListener('wheel', handleWheel, { passive: false, capture: true });
    document.addEventListener('wheel', handleWheel, { passive: false, capture: true });

    return () => {
      window.removeEventListener('wheel', handleWheel, { capture: true });
      document.removeEventListener('wheel', handleWheel, { capture: true });
    };
  }, [isInSection, expandedIdx, scrollCount, handleWheel]);

  return (
    <section
      id="benefits"
      ref={sectionRef}
      className={`
        relative h-screen px-5 pt-12 pb-8
        md:px-8
      `}
    >
      <div className="flex h-full flex-col justify-between">
        <div>
          <AnimatedTitle
            text="the univ<b>e</b>rse<br/>powered by ze<b>n</b>t"
            containerClass="mb-6"
          />
          <Button
            id="enter-vault-btn"
            variant="secondary"
            text="enter vault"
            containerClass="px-6 py-2 md:py-1"
            textClass="text-sm md:text-xs"
          />
        </div>
        <ul className="flex flex-col gap-y-5">
          {ListItems.map((item, idx) => {
            const isExpanded = idx === expandedIdx;
            return (
              <li key={idx} className={clsx('text-black', { 'opacity-50': !isExpanded })}>
                <header>
                  <div className="flex items-center gap-x-6">
                    <div className="font-general text-xxs transition-all">
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                    <h2 className={clsx('font-roboto transition-all', {
                        'xs:text-lg mb-1 text-base/5 font-medium': isExpanded,
                        'text-xxs uppercase': !isExpanded,
                      })}
                    >
                      {item.title}
                    </h2>
                  </div>
                </header>
                <div
                  className={clsx({
                    'max-h-[300px] opacity-100': isExpanded,
                    'max-h-0 opacity-0': !isExpanded,
                  })}
                  style={{transition: 'max-height 0.8s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.5s ease',}}
                >
                  <div className="flex items-stretch gap-x-6">
                    <div className="mx-1 w-1 bg-gray-600/30" />
                    <p className={`
                      xs:text-base
                      max-w-[72vw] font-roboto text-sm/4.5
                      md:max-w-64 md:text-xs
                    `}>
                      {item.text}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Benefits;
