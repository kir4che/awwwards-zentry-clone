import { gsap } from "gsap";
import { useCallback, useRef } from "react";

const NavMenu = ({ items }) => {
  const navContainerRef = useRef(null);
  const hoverBackgroundRef = useRef(null);
  // 追蹤背景是否可見，用來控制是否需要左右滑動動畫。
  const isHoverBgVisible = useRef(false);
  const currTween = useRef(null);

  // 計算每個 nav item 在螢幕上的位置、尺寸
  const getItemPositions = useCallback(() => {
    const container = navContainerRef.current;
    if (!container) return [];
    const containerRect = container.getBoundingClientRect();
    const links = Array.from(container.querySelectorAll("a"));
    return links.map(link => {
      const rect = link.getBoundingClientRect();
      return {
        left: rect.left - containerRect.left,
        width: rect.width,
        height: rect.height,
      };
    });
  }, []);

  // 讓背景元素動畫移動到指定位置
  const animateToPosition = useCallback((i) => {
    const bg = hoverBackgroundRef.current;
    if (!bg) return;
    // 若有正在進行的動畫，先停止，避免動畫衝突。
    if (currTween.current) currTween.current.kill();

    const positions = getItemPositions();
    const pos = positions[i];
    if (!pos) return;

    if (!isHoverBgVisible.current) {
      // 如果背景目前是隱藏的，直接設定背景的位置、尺寸（不要動畫）
      gsap.set(bg, { ...pos, opacity: 1 });
      isHoverBgVisible.current = true;
    } else {
      // 如果背景已經可見，就滑動到新位置。
      currTween.current = gsap.to(bg, {
        ...pos, duration: 0.4, ease: "power2.out",
        onComplete: () => (currTween.current = null),
      });
    }
  }, [getItemPositions]);

  const hideBg = () => {
    const bg = hoverBackgroundRef.current;
    if (!bg) return;
    if (currTween.current) currTween.current.kill();
    gsap.to(bg, { opacity: 0, duration: 0.1 });
    isHoverBgVisible.current = false;
  };

  return (
    <div
      ref={navContainerRef}
      className={`
        relative hidden
        md:block
      `}
      onMouseLeave={hideBg}
    >
      <div
        ref={hoverBackgroundRef}
        className="absolute top-0 w-0 rounded-full bg-blue-50 opacity-0"
        style={{ pointerEvents: "none" }}
      />
      {items.map((item, idx) => (
        <a
          key={item}
          href={`#${item.toLowerCase()}`}
          className={`
            relative ms-4 px-3.5 py-1.5 font-general text-xs font-medium
            text-blue-50 uppercase
            hover:text-black
            dark:hover:text-white
          `}
          onMouseEnter={() => animateToPosition(idx)}
        >
          {item}
        </a>
      ))}
    </div>
  );
};

export default NavMenu;
