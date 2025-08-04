import clsx from "clsx";

const Button = ({
  id,
  variant = "primary",
  text,
  leftIcon,
  rightIcon,
  containerClass = "",
  textClass = "text-xs sm:text-xxs",
  disabled = false,
}) => (
  <button
    id={id}
    type="button"
    disabled={disabled}
    className={clsx(
      "group relative w-fit rounded-full", {
        "bg-blue-75 text-black": variant === "primary",
        "bg-black text-white": variant === "secondary",
        "bg-yellow-100 text-black": variant === "yellow",
        "border border-yellow-100 bg-black/80 text-yellow-100": variant === "outline",
        "border-[0.5px] border-white/30 bg-black text-white/30": disabled,
        "btn-bounce cursor-pointer hover:scale-x-90 hover:skew-x-6 hover:rounded-md": !disabled,
      },
      containerClass
    )}
  >
    <span className={clsx(`
      relative inline-flex overflow-hidden font-general leading-7 font-medium
      uppercase transition-transform duration-300
      group-hover:-skew-x-6
    `, textClass)}>
      {/* 原始狀態 */}
      <span className={clsx("flex items-center gap-x-1.5", {
        "transform transition duration-300 group-hover:-translate-y-full": !disabled
      })}>
        {leftIcon}
        {text}
        {rightIcon}
      </span>
      {!disabled && (
        // hover 狀態
        <span className={`
          absolute top-0 left-0 flex translate-y-full transform items-center
          gap-x-1.5 transition duration-500
          group-hover:translate-y-0
        `}>
          {leftIcon}
          {text}
          {rightIcon}
        </span>
      )}
    </span>
  </button>
);

export default Button;
