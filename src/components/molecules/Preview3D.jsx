import clsx from "clsx";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

const Preview3D = forwardRef(({
  children,
  maxX = 10,
  maxY = 10,
  perspective = 650,
  defaultRotateX = 0,
  defaultRotateY = 0,
  containerClass = "",
  borderClass = "border-[0.5px] border-white/30 rounded-lg shadow"
}, ref) => {
  const [transform, setTransform] = useState(getTransform(defaultRotateX, defaultRotateY));
  const containerRef = useRef(null);

  function getTransform(rotateX, rotateY) {
    return `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(.96,.96,.96)`;
  }

  useImperativeHandle(ref, () => containerRef.current);

  // 依滑鼠位置來計算傾斜角度
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    // 計算滑鼠相對於元件中心的位置
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setTransform(getTransform(y * maxX, -x * maxY));
  };

  // 滑鼠離開時復原回預設角度
  const handleMouseLeave = () =>
    setTransform(getTransform(defaultRotateX, defaultRotateY));

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={clsx("relative", borderClass, containerClass)}
      style={{
        transition: "transform 0.5s cubic-bezier(.25,.8,.25,1)",
        transform
      }}
    >
      {children}
    </div>
  );
});

Preview3D.displayName = "Preview3D";

export default Preview3D;
