import clsx from "clsx";
import { useEffect, useRef } from "react";

const AudioIndicator = ({ isPlaying, onToggle }) => {
  const audioRef = useRef(null);

  // 自動播放、暫停音樂
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.play();
    else audioRef.current.pause();
  }, [isPlaying]);

  return (
    <button
      type="button"
      onClick={onToggle}
      className="sm:flex hidden mr-2 -mb-2 ml-8 cursor-pointer items-center space-x-0.5"
    >
      <audio
        ref={audioRef}
        className="hidden"
        src="/audio/loop.mp3"
        loop
      />
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className={clsx("indicator-line", { active: isPlaying })}
          style={{ animationDelay: `${(i + 1) * 0.1}s` }} // 延遲線條跳動
        />
      ))}
    </button>
  );
};

export default AudioIndicator;
