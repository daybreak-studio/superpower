"use client";

import React, { useState } from "react";
import BaselineSlide from "./BaselineSlideVerticalItem";
import { breakpoints, useBreakpoint } from "@/hooks/useBreakpoints";
import BaselineSlideVertical from "./BaselineSlideVertical";
import BaselineSlideHorizontal from "./BaselineSlideHorizontal";

type Props = {};

export type SlideInfo = {
  previewSrc: string;
  expandedSrc: string;
  header: string;
  description: string;
};

const SLIDES = [
  {
    previewSrc: "/baseline-section/baseline-1-preview.png",
    expandedSrc: "/baseline-section/baseline-1.png",
    header: "Test 80+ Biomarkers",
    description:
      "Hormones, stress, thyroid, heart, metabolic, toxins and much more.",
  },
  {
    previewSrc: "/baseline-section/baseline-2-preview.png",
    expandedSrc: "/baseline-section/baseline-2.png",
    header: "Visualize your results",
    description:
      "Track blood biomarkers, genetics. Microbiome testing, and data from any wearable device.",
  },
  {
    previewSrc: "/baseline-section/baseline-3-preview.png",
    expandedSrc: "/baseline-section/baseline-3.png",
    header: "Longevity Clinician Assessment",
    description:
      "Your data is reviewed by our leading clinicians, drawing out functional insights.",
  },
  {
    previewSrc: "/baseline-section/baseline-4-preview.png",
    expandedSrc: "/baseline-section/baseline-4.png",
    header: "Personalized Action PLan",
    description:
      "With the latest in research and science to superpower your health.",
  },
  {
    previewSrc: "/baseline-section/baseline-5-preview.png",
    expandedSrc: "/baseline-section/baseline-5.png",
    header: "Unlimited Concierge SMS",
    description:
      "For everyday questions about diet, supplements, performance, testing, general healthcare and more.",
  },
];

function SuperpowerBaselineSection({}: Props) {
  const isDesktop = useBreakpoint(breakpoints.lg);

  return (
    <section className="flex flex-col items-center">
      <div className="font-mono-sm mb-4 text-center">How it works</div>
      <h2 className="font-sans-4xl mb-6 max-w-[20ch] text-center">
        Our cornerstone is the superpower baseline
      </h2>
      <p className="font-sans-lg max-w-[50ch] text-center opacity-50">
        Membership includes unlimited messaging with your doctor team, a
        comprehensive annual assessment with 80 advanced lab tests, and a custom
        action plan to improve your health and transform your life.
      </p>
      {isDesktop && <BaselineSlideVertical slides={SLIDES} />}
      {!isDesktop && <BaselineSlideHorizontal slides={SLIDES} />}
    </section>
  );
}

export default SuperpowerBaselineSection;
