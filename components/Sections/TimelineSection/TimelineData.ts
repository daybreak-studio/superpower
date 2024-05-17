import { TimlineSegment } from "./Segments";

export const segments: TimlineSegment[] = [
  {
    path: "M1 2C299.481 2 593.937 49.2507 835.5 142.213",
    waypoints: [
      {
        age: "Born",
        action: "C-Section",
        details: [
          "Microbiome optimization",
          "Genetic test",
          "Diet personalized to genome",
        ],
        direction: "right",
      },
    ],
  },
  {
    path: "M835.5 142.213C1143.67 260.81 1365.77 453.804 1400.3 718",
    waypoints: [
      {
        age: "Age 22",
        action: "Annual Superpower Baseline",
        details: [
          "60 biomarker blood test",
          "DEXA scan",
          "Performance program",
        ],
        direction: "right",
      },
    ],
  },
  {
    path: "M1400.3 718C1403.41 741.749 1405 766.074 1405 790.972C1405 1015.35 1206.5 1177.61 971 1343.12",
    waypoints: [
      {
        age: "Age 26",
        action: "Gut health protocol",
        details: [
          "Microbiome test",
          "Personalized probiotic",
          "Gut lining peptide",
        ],
        direction: "left",
      },
    ],
  },
  {
    path: "M971 1343.12C752.77 1496.48 502.766 1652.64 349.5 1863.6",
    waypoints: [
      {
        age: "Age 31",
        action: "Fertility protocol",
        details: ["Pre-natal vitamin stack", "Post-partum nutrients"],
        direction: "left",
      },
    ],
  },
  {
    path: "M349.5 1863.6C261.584 1984.61 205.499 2123.65 205.499 2290.54C205.499 2453.35 257.153 2581.89 336.864 2690.5",
    waypoints: [
      {
        age: "Age 41",
        action: "Hormone optimization protocol",
        details: ["Testosterone", "Estrogren"],
        direction: "left",
      },
    ],
  },
  {
    path: "M336.864 2690.5C493.17 2903.47 757.359 3039.79 951.5 3207.49",
    waypoints: [
      {
        age: "Age 45",
        action: "Disease prevention program",
        details: [
          "Coronary calcium scan",
          "Full body MRI",
          "Grail cancer screening",
        ],
        direction: "right",
      },
    ],
  },
  {
    path: "M951.5 3207.49C1091.79 3328.68 1195.5 3466.25 1195.5 3660.98C1195.5 3836.03 1099.14 3925.77 980.477 4006.5",
    waypoints: [
      {
        age: "Age 60",
        action: "Longevity protocol",
        details: [
          "Prevent Alzheimer’s, heart disease, cancer",
          "Reduce biological age",
          "Reduce skin age",
        ],
        direction: "right",
      },
    ],
  },
  {
    path: "M980.478,4006.5C790.36,4135.85 542.999,4242.07 542.999,4639",
    waypoints: [
      {
        age: "Age 120",
        action: "Ageing goal",
        details: [""],
        direction: "left",
      },
    ],
  },
];
