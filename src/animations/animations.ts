export const ANIMATION_EASING = [0.6, -0.05, 0.01, 0.99];

export const Fade = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: ANIMATION_EASING,
    },
  },
  exit: {
    opacity: 0,
  },
};

export const FadeInUp = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: ANIMATION_EASING,
    },
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 0.2,
      ease: ANIMATION_EASING,
    },
  },
};

export const Stagger = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};
