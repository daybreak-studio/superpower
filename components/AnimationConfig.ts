export const easing = {
  EASE_OUT_CIRC: [0, 0.55, 0.45, 1],
  EASE_IN_CUBIC: [0.32, 0, 0.67, 0],
  EASE_IN_CIRC: [0.55, 0, 1, 0.45],
  EASE_OUT_QUINT: [0.22, 1, 0.36, 1],
  EASE_OUT_CUBIC: [0.33, 1, 0.68, 1],
};

export const AnimationConfig = {
  VERY_FAST: 0.12,
  FAST: 0.2,
  NORMAL: 0.3,
  SLOW: 0.5,
  VERY_SLOW: 0.7,
  EASING: easing.EASE_OUT_QUINT,
  EASING_INVERTED: easing.EASE_IN_CIRC,
  EASING_IN_OUT: [0.81, 0.03, 0.06, 1],
  EASING_DRAMATIC: [0.62, 0, 0.02, 1],
};
