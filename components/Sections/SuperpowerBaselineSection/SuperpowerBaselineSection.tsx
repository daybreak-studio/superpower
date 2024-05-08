"use client";

import React, { useState } from "react";
import BaselineSlide from "./BaselineSlideVerticalItem";
import { breakpoints, useBreakpoint } from "@/hooks/useBreakpoints";
import BaselineSlideVertical from "./BaselineSlideVertical";
import BaselineCarousel from "./BaselineCarousel";

type Props = {};

export type SlideInfo = {
  previewSrc: string;
  expandedSrc: string;
  header: string;
  description: string;
  color: string;
};

const SLIDES = [
  {
    previewSrc: "/baseline-section/baseline-1-preview.png",
    expandedSrc: "/baseline-section/baseline-1.png",
    header: "Test 80+ Biomarkers",
    description:
      "Hormones, stress, thyroid, heart, metabolic, toxins and much more.",
    color: "#063D2A",
  },
  {
    previewSrc: "/baseline-section/baseline-2-preview.png",
    expandedSrc: "/baseline-section/baseline-2.png",
    header: "Visualize your results",
    description:
      "Track blood biomarkers, genetics. Microbiome testing, and data from any wearable device.",
    color: "#B9431C",
  },
  {
    previewSrc: "/baseline-section/baseline-3-preview.png",
    expandedSrc: "/baseline-section/baseline-3.png",
    header: "Longevity Clinician Assessment",
    description:
      "Your data is reviewed by our leading clinicians, drawing out functional insights.",
    color: "#12495B",
  },
  {
    previewSrc: "/baseline-section/baseline-4-preview.png",
    expandedSrc: "/baseline-section/baseline-4.png",
    header: "Personalized Action PLan",
    description:
      "With the latest in research and science to superpower your health.",
    color: "#4E1308",
  },
  {
    previewSrc: "/baseline-section/baseline-5-preview.png",
    expandedSrc: "/baseline-section/baseline-5.png",
    header: "Unlimited Concierge SMS",
    description:
      "For everyday questions about diet, supplements, performance, testing, general healthcare and more.",
    color: "#8D4B32",
  },
];

function SuperpowerBaselineSection({}: Props) {
  const isDesktop = useBreakpoint(breakpoints.lg);

  return (
    <section className="my-24 flex flex-col items-center bg-white">
      <div className="font-mono-sm mx-4 mb-4 text-center">How it works</div>
      <h2 className="font-sans-4xl mx-4 mb-6 max-w-[20ch] text-center">
        Our cornerstone is the superpower baseline
      </h2>
      <p className="font-sans-lg mx-4 max-w-[50ch] text-center opacity-50">
        Membership includes unlimited messaging with your doctor team, a
        comprehensive annual assessment with 80 advanced lab tests, and a custom
        action plan to improve your health and transform your life.
      </p>
      {isDesktop && <BaselineSlideVertical slides={SLIDES} />}
      {!isDesktop && <BaselineCarousel slides={SLIDES} />}
    </section>
  );
}

export default SuperpowerBaselineSection;
