export interface Protocol {
  image: string;
  icon: string;
  name: string;
  areas: string[];
}

export const PROTOCOLS = [
  {
    name: "Gut Health",
    icon: "/protocol-section/icon-1.svg",
    image: "/protocol-section/gut-health.png",
    areas: ["Microbiome", "diversity", "nutrient absorption"],
  },
  {
    name: "Male Hormones",
    icon: "/protocol-section/icon-2.svg",
    image: "/protocol-section/male-hormones.png",
    areas: ["Testorsterone", "Free Testosterone", "Thyroid"],
  },
  {
    name: "Female Hormones",
    icon: "/protocol-section/icon-3.svg",
    image: "/protocol-section/female-hormones.png",
    areas: ["Estrogen", "Progesterone", "Thyroid"],
  },
  {
    name: "Aging",
    icon: "/protocol-section/icon-4.svg",
    image: "/protocol-section/ageing.png",
    areas: ["Epigenetics", "Telomeres", "Mitochondria"],
  },
  {
    name: "Toxins",
    icon: "/protocol-section/icon-1.svg",
    image: "/protocol-section/toxins.png",
    areas: ["Plastics", "Heavy metals", "Mold"],
  },
  {
    name: "Disease Risk",
    icon: "/protocol-section/icon-1.svg",
    image: "/protocol-section/disease-risk.png",
    areas: [
      "Detecting early indicators of heart problems",
      "Cancer",
      "and 100s of diseases",
    ],
  },
  {
    name: "Body composition",
    icon: "/protocol-section/icon-2.svg",
    image: "/protocol-section/body-composition.png",
    areas: ["Gain muscle", "Lose weight", "Grip strength"],
  },
  {
    name: "Sleep optimization",
    icon: "/protocol-section/icon-3.svg",
    image: "/protocol-section/sleep-optimization.png",
    areas: ["Sleep quality", "Stress level", "Nervous system calibration"],
  },
  {
    name: "Cognitive health",
    icon: "/protocol-section/icon-4.svg",
    image: "/protocol-section/cognitive-health.png",
    areas: ["Focus", "Memory", "Mental Acuity"],
  },
  {
    name: "Metabolic health",
    icon: "/protocol-section/icon-1.svg",
    image: "/protocol-section/metabolic-health.png",
    areas: ["Energy", "Body fat %", "VO2 Max"],
  },
];
