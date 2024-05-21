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
    mobileAngle: { y: 35, x: -35 },
    desktopWidth: 420,
    mobileWidth: 450,
  },
  {
    name: "Genomic test kit",
    image: "/ecosystem-section/genomic-test-kit.png",
    desktopAngle: { y: 0, x: -45 },
    mobileAngle: { y: 0, x: -45 },
    desktopWidth: 194,
    mobileWidth: 250,
  },
  {
    name: "CGM charts",
    image: "/ecosystem-section/cgm-charts.png",
    desktopAngle: { y: -60, x: -35 },
    mobileAngle: { y: -35, x: -35 },
    desktopWidth: 505,
    mobileWidth: 400,
  },
  {
    name: "Blood biomarker chart",
    image: "/ecosystem-section/blood-biomarker-chart.png",
    desktopAngle: { y: 70, x: 0 },
    mobileAngle: { y: 35, x: -60 },
    desktopWidth: 250,
    mobileWidth: 300,
  },
  {
    name: "Grail cancer test",
    image: "/ecosystem-section/grail-cancer-test.png",
    desktopAngle: { y: -70, x: 0 },
    mobileAngle: { y: -35, x: 35 },
    desktopWidth: 250,
    mobileWidth: 350,
  },
  {
    name: "Intestinal permeability panel",
    image: "/ecosystem-section/intestinal-permeability-panel.png",
    desktopAngle: { y: 60, x: 35 },
    mobileAngle: { y: 0, x: 35 },
    desktopWidth: 363,
    mobileWidth: 400,
  },
  {
    name: "Prescriptions",
    image: "/ecosystem-section/prescriptions.png",
    desktopAngle: { y: 0, x: 45 },
    mobileAngle: { y: 35, x: 35 },
    desktopWidth: 253,
    mobileWidth: 300,
  },
  {
    name: "DEXA scan",
    image: "/ecosystem-section/dexa-scan.png",
    desktopAngle: { y: -60, x: 35 },
    mobileAngle: { y: -35, x: 60 },
    desktopWidth: 280,
    mobileWidth: 320,
  },
  {
    name: "Microbiome test kit",
    image: "/ecosystem-section/microbiome-test-kit.png",
    desktopAngle: { y: 25, x: -30 },
    mobileAngle: { y: -35, x: -60 },
    desktopWidth: 160,
    mobileWidth: 160,
  },
  {
    name: "MRIs",
    image: "/ecosystem-section/mris.png",
    desktopAngle: { y: -30, x: 30 },
    mobileAngle: { y: 35, x: 60 },
    desktopWidth: 130,
    mobileWidth: 300,
  },
];
