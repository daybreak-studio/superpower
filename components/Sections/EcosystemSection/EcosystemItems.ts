export interface Protocol {
  name: string;
  image: string;
  position?: { x: number; y: number };
  width?: number;
}

export const EcosystemItems = [
  {
    name: "Vo2 max",
    image: "/ecosystem-section/vo2-max.png",
    angle: { y: 60, x: -35 },
    width: 420,
  },
  {
    name: "Genomic test kit",
    image: "/ecosystem-section/genomic-test-kit.png",
    angle: { y: 0, x: -45 },
    width: 194,
  },
  {
    name: "CGM charts",
    image: "/ecosystem-section/cgm-charts.png",
    angle: { y: -60, x: -35 },
    width: 505,
  },
  {
    name: "Blood biomarker chart",
    image: "/ecosystem-section/blood-biomarker-chart.png",
    angle: { y: 70, x: 0 },
    width: 250,
  },
  {
    name: "Grail cancer test",
    image: "/ecosystem-section/grail-cancer-test.png",
    angle: { y: -70, x: 0 },
    width: 250,
  },
  {
    name: "Intestinal permeability panel",
    image: "/ecosystem-section/intestinal-permeability-panel.png",
    angle: { y: 60, x: 35 },
    width: 363,
  },
  {
    name: "Toxin test kit",
    image: "/ecosystem-section/toxin-test-kit.png",
    angle: { y: 0, x: 45 },
    width: 253,
  },
  {
    name: "DEXA scan",
    image: "/ecosystem-section/dexa-scan.png",
    angle: { y: -60, x: 35 },
    width: 280,
  },
  {
    name: "Microbiome test kit",
    image: "/ecosystem-section/microbiome-test-kit.png",
    angle: { y: 25, x: -30 },
    width: 160,
  },
  {
    name: "MRIs",
    image: "/ecosystem-section/mris.png",
    angle: { y: -30, x: 30 },
    width: 130,
  },
];
