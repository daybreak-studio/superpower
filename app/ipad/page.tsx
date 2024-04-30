"use client";

import {
  FloatingPageSelector,
  FloatingPageSelectorItem,
} from "@/components/FloatingPageSelector/FloatingPageSelector";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type Props = {};

const IconHome = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_3214_52)">
      <path d="M0 4.85106L6 0L12 4.85106V12H0L0 4.85106Z" fill="black" />
    </g>
    <defs>
      <clipPath id="clip0_3214_52">
        <rect width="12" height="12" fill="black" />
      </clipPath>
    </defs>
  </svg>
);

const IconService = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_3214_53)">
      <rect
        y="6.3999"
        width="5.60009"
        height="5.60009"
        rx="0.686508"
        fill="black"
      />
      <rect width="5.59992" height="5.59992" rx="0.686508" fill="black" />
      <rect
        x="6.40039"
        y="6.3999"
        width="5.60009"
        height="5.60009"
        rx="0.686508"
        fill="black"
      />
      <rect
        x="6.40039"
        width="5.60009"
        height="5.60009"
        rx="0.686508"
        fill="black"
      />
    </g>
    <defs>
      <clipPath id="clip0_3214_53">
        <rect width="12" height="12" fill="black" />
      </clipPath>
    </defs>
  </svg>
);

const IconActionPlan = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_3214_65)">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.29668 11.5447C7.56859 11.8463 6.78808 12.001 6 12C5.21192 12.001 4.43142 11.8463 3.70333 11.5447C2.97524 11.2431 2.31394 10.8006 1.7574 10.2426C1.19941 9.68607 0.756904 9.02477 0.45531 8.29668C0.153717 7.56859 -0.00101608 6.78808 5.02096e-06 6C-0.000999644 5.21192 0.153741 4.43142 0.455333 3.70333C0.756926 2.97524 1.19943 2.31394 1.7574 1.7574C2.31394 1.19943 2.97524 0.756926 3.70333 0.455333C4.43142 0.153741 5.21192 -0.000999644 6 5.02096e-06C6.78808 -0.00101608 7.56859 0.153717 8.29668 0.45531C9.02477 0.756904 9.68607 1.19941 10.2426 1.7574C10.8006 2.31394 11.2431 2.97524 11.5447 3.70333C11.8463 4.43142 12.001 5.21192 12 6C12.001 6.78808 11.8463 7.56859 11.5447 8.29668C11.2431 9.02477 10.8006 9.68607 10.2426 10.2426C9.68607 10.8006 9.02477 11.2431 8.29668 11.5447ZM9.49189 4.74129C9.81633 4.41685 9.81633 3.89084 9.49189 3.5664C9.16745 3.24197 8.64144 3.24197 8.317 3.5664L5.21214 6.67127L3.95343 5.41256C3.62899 5.08812 3.10298 5.08812 2.77854 5.41256C2.45411 5.73699 2.45411 6.26301 2.77854 6.58744L4.6247 8.4336C4.94913 8.75803 5.47515 8.75803 5.79958 8.4336L9.49189 4.74129Z"
        fill="black"
      />
    </g>
    <defs>
      <clipPath id="clip0_3214_65">
        <rect width="12" height="12" fill="black" />
      </clipPath>
    </defs>
  </svg>
);

const IconData = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="1"
      y="3.62646"
      width="3.14281"
      height="8.15921"
      rx="0.686508"
      fill="black"
    />
    <rect
      x="4.92773"
      width="3.14281"
      height="11.7855"
      rx="0.686508"
      fill="black"
    />
    <rect
      x="8.85742"
      y="3.62646"
      width="3.14281"
      height="8.15921"
      rx="0.686508"
      fill="black"
    />
  </svg>
);

const IPadPage = (props: Props) => {
  return (
    <main className="relative inset-0 flex h-screen items-center justify-center">
      <FloatingPageSelector>
        <FloatingPageSelectorItem pageIndex={1} color={"#FF68DE"}>
          <IconHome />
          <div className="hidden md:block">Home</div>
        </FloatingPageSelectorItem>
        <FloatingPageSelectorItem pageIndex={2} color={"#FC5F2B"}>
          <IconService />
          <div className="hidden md:block">Services</div>
        </FloatingPageSelectorItem>
        <FloatingPageSelectorItem pageIndex={3} color={"#11C182"}>
          <IconActionPlan />
          <div className="hidden md:block">Action Plan</div>
        </FloatingPageSelectorItem>
        <FloatingPageSelectorItem pageIndex={4} color={"#F7861E"}>
          <IconData />
          <div className="hidden md:block">Data</div>
        </FloatingPageSelectorItem>
        <FloatingPageSelectorItem pageIndex={5} color={"#3F3F46"}>
          <motion.div
            className="flex flex-row"
            animate={{ filter: "invert(var(--invert-color))" }}
          >
            <Image
              className="-mr-2 rounded-full border border-[#F0EAE6]"
              src="/doctor-icon-1.png"
              alt=""
              width={13}
              height={13}
            />
            <Image
              className="rounded-full border border-[#F0EAE6]"
              src="/doctor-icon-2.png"
              alt=""
              width={13}
              height={13}
            />
          </motion.div>
          <div className="hidden md:block">Doctors</div>
        </FloatingPageSelectorItem>
      </FloatingPageSelector>
    </main>
  );
};

export default IPadPage;
