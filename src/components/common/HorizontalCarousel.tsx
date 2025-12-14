import { type ReactNode, useEffect, useRef, useState } from "react";
import { RiArrowLeftWideLine, RiArrowRightWideLine } from "react-icons/ri";

interface HorizontalScrollWrapperProps {
  children: ReactNode;
  scrollAmount?: number;
  className?: string;
}

export const HorizontalScrollWrapper = ({
  children,
  scrollAmount = 300,
  className = "",
}: HorizontalScrollWrapperProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const checkScrollPosition = () => {
    const el = containerRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;

    setAtStart(scrollLeft <= 0);
    setAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
  };

  const scrollLeft = () => {
    containerRef.current?.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    setTimeout(checkScrollPosition, 300);
  };

  const scrollRight = () => {
    containerRef.current?.scrollBy({ left: scrollAmount, behavior: "smooth" });
    setTimeout(checkScrollPosition, 300);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    checkScrollPosition();

    el.addEventListener("scroll", checkScrollPosition);
    window.addEventListener("resize", checkScrollPosition);

    const images = el.querySelectorAll("img");
    images.forEach((img) => img.addEventListener("load", checkScrollPosition));

    const timeout = setTimeout(checkScrollPosition, 300);

    return () => {
      el.removeEventListener("scroll", checkScrollPosition);
      window.removeEventListener("resize", checkScrollPosition);
      images.forEach((img) =>
        img.removeEventListener("load", checkScrollPosition)
      );
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className={`relative w-full ${className}`}>
      {!atStart && (
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 
            bg-black/40 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur 
            transition-all cursor-pointer"
        >
          <RiArrowLeftWideLine className="w-5 h-5" />
        </button>
      )}

      <div
        ref={containerRef}
        className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth"
      >
        {children}
      </div>

      {!atEnd && (
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 
            bg-black/40 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur 
            transition-all cursor-pointer"
        >
          <RiArrowRightWideLine className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
