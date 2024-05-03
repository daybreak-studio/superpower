import { m } from "framer-motion";

export interface Protocol {
  name: string;
  image: string;
  desktopAngle?: { x: number; y: number };
  mobileAngle?: { x: number; y: number };
  desktopWidth?: number;
  mobileWidth?: number;
}

export const EcosystemItems = [
  {
    name: "Vo2 max",
    image: "/ecosystem-section/vo2-max.png",
    desktopAngle: { y: 60, x: -35 },
    mobileAngle: { y: 20, x: -25 },
    desktopWidth: 420,
    mobileWidth: 300,
  },
  {
    name: "Genomic test kit",
    image: "/ecosystem-section/genomic-test-kit.png",
    desktopAngle: { y: 0, x: -45 },
    mobileAngle: { y: 0, x: -25 },
    desktopWidth: 194,
    mobileWidth: 170,
  },
  {
    name: "CGM charts",
    image: "/ecosystem-section/cgm-charts.png",
    desktopAngle: { y: -60, x: -35 },
    mobileAngle: { y: -20, x: -25 },
    desktopWidth: 505,
    mobileWidth: 350,
  },
  {
    name: "Blood biomarker chart",
    image: "/ecosystem-section/blood-biomarker-chart.png",
    desktopAngle: { y: 70, x: 0 },
    mobileAngle: { y: 15, x: -40 },
    desktopWidth: 250,
    mobileWidth: 180,
  },
  {
    name: "Grail cancer test",
    image: "/ecosystem-section/grail-cancer-test.png",
    desktopAngle: { y: -70, x: 0 },
    mobileAngle: { y: -15, x: 40 },
    desktopWidth: 250,
    mobileWidth: 180,
  },
  {
    name: "Intestinal permeability panel",
    image: "/ecosystem-section/intestinal-permeability-panel.png",
    desktopAngle: { y: 60, x: 35 },
    mobileAngle: { y: 0, x: 25 },
    desktopWidth: 363,
    mobileWidth: 250,
  },
  {
    name: "Toxin test kit",
    image: "/ecosystem-section/toxin-test-kit.png",
    desktopAngle: { y: 0, x: 45 },
    mobileAngle: { y: 20, x: 25 },
    desktopWidth: 253,
    mobileWidth: 190,
  },
  {
    name: "DEXA scan",
    image: "/ecosystem-section/dexa-scan.png",
    desktopAngle: { y: -60, x: 35 },
    mobileAngle: { y: -20, x: 25 },
    desktopWidth: 280,
    mobileWidth: 200,
  },
  {
    name: "Microbiome test kit",
    image: "/ecosystem-section/microbiome-test-kit.png",
    desktopAngle: { y: 25, x: -30 },
    mobileAngle: { y: -15, x: -40 },
    desktopWidth: 160,
    mobileWidth: 120,
  },
  {
    name: "MRIs",
    image: "/ecosystem-section/mris.png",
    desktopAngle: { y: -30, x: 30 },
    mobileAngle: { y: 15, x: 40 },
    desktopWidth: 130,
    mobileWidth: 150,
  },
];
