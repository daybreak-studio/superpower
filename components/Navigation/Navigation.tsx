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

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollDir]);

  return (
    <nav className="font-mono-xs text-[8px] sm:text-[12px]">
      <div
        className="fixed left-0 top-0 z-[100] flex h-auto w-full items-center justify-center bg-[rgba(0,0,0,0.5)] backdrop-blur-sm sm:bg-none sm:mix-blend-difference sm:backdrop-blur-none"
        style={{
          // opacity: scrollDir === "scrolling down" ? 0 : 1,
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        <div
          className="relative flex h-14 w-full items-center justify-center p-2 pl-3 sm:h-[68px] sm:p-3 sm:pl-5"
          style={{
            // opacity: scrolledPast == true ? 1 : 0,
            // pointerEvents: scrolledPast == true ? "auto" : "none",
            transition: "opacity 0.3s ease-in-out",
          }}
        >
          <a href="/" className="w-[140px] sm:w-[200px]">
            <Image
              className="w-full"
              src="/logo.svg"
              alt="logo"
              width={180}
              height={100}
            />
          </a>
          <div className="flex h-full w-full items-center justify-end gap-6 tracking-tighter sm:gap-8">
            <ul className="flex items-center justify-between gap-6 text-white sm:gap-8">
              <NavLink href="/#">Manifesto</NavLink>
              <NavLink href="https://app.superpower.com/signin">Log in</NavLink>
            </ul>
            <CTAButton />
          </div>
        </div>
      </div>
      <a
        className=" fixed right-0 top-0 z-[101] h-14 cursor-pointer p-2 pl-3 sm:h-[68px] sm:p-3 sm:pl-5"
        href="https://app.superpower.com/signin"
      >
        <CTAButton />
      </a>
    </nav>
  );
};

export default Navigation;

const CTAButton = (props: any) => {
  const { className } = props;

  return (
    <button
      className="h-full w-auto bg-[#FC5F2B] px-2 uppercase text-white hover:bg-[rgba(252,95,43,0.8)] sm:px-4"
      style={{
        transition: "0.3s ease-in-out",
      }}
    >
      Join Waitlist
    </button>
  );
};
