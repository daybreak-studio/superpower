import React, { useState, useEffect } from "react";

type Props = {};

const Navigation = (props: Props) => {
  const [scrollDir, setScrollDir] = useState("scrolling down");
  const [scrolledPast1000, setScrolledPast1000] = useState(false);

  useEffect(() => {
    const threshold = 0;
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }
      setScrollDir(scrollY > lastScrollY ? "scrolling down" : "scrolling up");
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
      const scrollY = window.pageYOffset;
      if (scrollY > 8000) {
        setScrolledPast1000(true);
      } else {
        setScrolledPast1000(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    console.log(scrollDir);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollDir]);

  return (
    <nav
      className="fixed left-0 top-0 z-[99] flex h-auto w-full items-center justify-center sm:px-12"
      style={{
        opacity: scrollDir === "scrolling down" ? 0 : 1,
        transition: "opacity 0.3s ease-in-out",
      }}
    >
      <div
        className="relative flex h-14 w-full max-w-[1600px] items-center justify-center p-2 pl-3 sm:p-3 sm:pl-5"
        style={{
          opacity: scrolledPast1000 == true ? 1 : 0,
          pointerEvents: scrolledPast1000 == true ? "auto" : "none",
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        <div className="w-24">
          <img src="/logo.svg" alt="logo" />
        </div>
        <div className="font-mono-xs flex h-full w-full items-center justify-end gap-4 text-[10px] tracking-tighter sm:gap-8">
          <ul className="flex items-center justify-between gap-4 text-[rgba(134,134,134,1)] sm:gap-8">
            <li>Manifesto</li>
            <li>Log in</li>
          </ul>
          <button className="h-full w-auto bg-neutral-300 px-2 uppercase text-black sm:px-4">
            Join Waitlist
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
