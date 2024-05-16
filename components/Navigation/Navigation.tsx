import React, { useState, useEffect } from "react";
import NavLink from "./NavLink";
import Image from "next/image";

type Props = {};

const Navigation = (props: Props) => {
  const [scrollDir, setScrollDir] = useState("scrolling down");
  const [scrolledPast, setScrolledPast] = useState(false);

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
      if (scrollY > window.innerHeight) {
        setScrolledPast(true);
      } else {
        setScrolledPast(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    console.log(scrollDir);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollDir]);

  return (
    <nav
      className="fixed left-0 top-0 z-[100] flex h-auto w-full items-center justify-center sm:px-12"
      style={{
        opacity: scrollDir === "scrolling down" ? 0 : 1,
        transition: "opacity 0.3s ease-in-out",
      }}
    >
      <div
        className="relative flex h-14 w-full max-w-[1600px] items-center justify-center p-2 pl-3 sm:p-3 sm:pl-5"
        style={{
          opacity: scrolledPast == true ? 1 : 0,
          pointerEvents: scrolledPast == true ? "auto" : "none",
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        <div className="w-24 mix-blend-difference">
          <Image src="/logo.svg" alt="logo" width={96} height={24} />
        </div>
        <div className="font-mono-xs flex h-full w-full items-center justify-end gap-4 text-[10px] tracking-tighter sm:gap-8">
          <div className="relative z-50 mix-blend-difference">
            <ul className="flex items-center justify-between gap-4 text-[#fff] sm:gap-8">
              <NavLink href="/#">Manifesto</NavLink>
              <NavLink href="/#">Log in</NavLink>
            </ul>
          </div>
          <a className="h-full" href="https://app.superpower.com/signin">
            <button className="h-full w-auto bg-[#FC5F2B] px-2 uppercase text-white sm:px-4">
              Get Started
            </button>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
