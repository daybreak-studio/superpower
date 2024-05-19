"use client";

import React, { useState } from "react";
import BaselineSlide from "./BaselineSlideVerticalItem";
import { breakpoints, useBreakpoint } from "@/hooks/useBreakpoints";
import BaselineSlideVertical from "./BaselineSlideVertical";
import BaselineCarousel from "./BaselineCarousel";
import LineElement from "@/components/LineElement/LineElement";

type Props = {};

export type SlideInfo = {
  mobileSrc: string;
  desktopSrc: string;
  header: string;
  description: string;
  color: string;
};

const SLIDES = [
  {
    mobileSrc: "/baseline-section/baseline-1-m.png",
    desktopSrc: "/baseline-section/baseline-1.png",
    header: "Test your whole body and visualize all your data.",
    description:
      "Hormones, thyroid, heart, toxins, genetics, microbiome, cancer risk, wearables, & more.",
    color: "#063D2A",
  },
  {
    mobileSrc: "/baseline-section/baseline-2-m.png",
    desktopSrc: "/baseline-section/baseline-2.png",
    header: "Get an annual roadmap so you know exactly what to do.",
    description:
      "Go from in the dark to in control – we’ll show you how to improve every aspect of your health.",
    color: "#B9431C",
  },
  {
    mobileSrc: "/baseline-section/baseline-3-m.png",
    desktopSrc: "/baseline-section/baseline-3.png",
    header: "Access your private concierge doctor.",
    description:
      "Text your health concierge at any time, from help with orders and scheduling to questions and coaching.",
    color: "#12495B",
  },
  {
    mobileSrc: "/baseline-section/baseline-4-m.png",
    desktopSrc: "/baseline-section/baseline-4.png",
    header: "Everything you need in one place.",
    description:
      "Save 1,000s of hours of research. Your membership comes with a marketplace of the world’s best health products, tests, and services at insider prices. New additions every week.",
    color: "#4E1308",
  },
];

function SuperpowerBaselineSection({}: Props) {
  const isDesktop = useBreakpoint(breakpoints.lg);

  return (
    <section className="relative z-10 mt-4 flex flex-col items-center bg-white">
      <LineElement length={288} color={"#bbb"} vertical tail={40} />
      <div className="font-mono-sm mx-4 mt-16 text-center">How it works</div>
      <h2 className="font-sans-2xl mx-4 mb-6 max-w-[17ch] text-center">
        An all-in-one health membership, for people who want more.
      </h2>
      <LineElement length={40} color={"#bbb"} vertical tail={40} />
      {isDesktop && <BaselineSlideVertical slides={SLIDES} />}
      {!isDesktop && <BaselineCarousel slides={SLIDES} />}
    </section>
  );
}

export default SuperpowerBaselineSection;
