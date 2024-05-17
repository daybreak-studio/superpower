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
    <nav>
      <div
        className="fixed left-0 top-0 z-[100] flex h-auto w-full items-center justify-center mix-blend-difference"
        style={{
          // opacity: scrollDir === "scrolling down" ? 0 : 1,
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        <div
          className="relative flex h-[68px] w-full items-center justify-center p-2 pl-3 sm:p-3 sm:pl-5"
          style={{
            // opacity: scrolledPast == true ? 1 : 0,
            // pointerEvents: scrolledPast == true ? "auto" : "none",
            transition: "opacity 0.3s ease-in-out",
          }}
        >
          <a href="/" className="w-[200px]">
            <Image src="/logo.svg" alt="logo" width={200} height={100} />
          </a>
          <div className="font-mono-xs flex h-full w-full items-center justify-end gap-8 tracking-tighter">
            <ul className="flex items-center justify-between gap-8 text-white">
              <NavLink href="/#">Manifesto</NavLink>
              <NavLink href="https://app.superpower.com/signin">Log in</NavLink>
            </ul>
            <CTAButton />
          </div>
        </div>
      </div>
      <a
        className="font-mono-xs fixed right-0 top-0 z-[101] h-[68px] cursor-pointer p-2 pl-3 sm:p-3 sm:pl-5"
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
