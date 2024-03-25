import { useBounds } from "@/hooks/useBounds";
import {
  MotionValue,
  motion,
  useMotionTemplate,
  useTransform,
} from "framer-motion";
import React from "react";

type Props = {
  children: React.ReactNode;
  progress: MotionValue<number>;
};

const FadingText = ({ children, progress }: Props) => {
  const [container, bounds] = useBounds<HTMLDivElement>([children]);

  const maskFadingSizeFactor = 8;

  const testProg = useTransform(progress, [0, 1], [0, 1]);
  const maskX = useTransform(
    testProg,
    [0, 1],
    [-bounds.width * maskFadingSizeFactor, 0],
  );
  const maskPosition = useMotionTemplate`${maskX}px 0px`;

  const maskFadeOutEndPos = maskFadingSizeFactor * 1.5; // around 15%
  const maskFadeOutStartPos = maskFadingSizeFactor * 3.5; // around 30%
  const maskFadeInEndPos = maskFadingSizeFactor * 6.5; // around 50%
  const maskFadeInStartPos = maskFadingSizeFactor * 8.5; // around 70%

  // make the mask slightly bigger
  const maskWidth = bounds.width * maskFadingSizeFactor * 1.1;

  return (
    <motion.div
      style={{
        mask: `linear-gradient(45deg, 
          rgba(0,0,0,0) 0%, 
          rgba(0,0,0,0) ${maskFadeOutEndPos}%, 
          rgba(0,0,0,.99) ${maskFadeOutStartPos}%,
          rgba(0,0,0,.99) ${maskFadeInEndPos}%, 
          rgba(0,0,0,0) ${maskFadeInStartPos}%, 
          rgba(0,0,0,0) 100%)`,
        maskPosition: maskPosition,
        maskSize: `${maskWidth}px ${bounds.height}px`,
        maskComposite: "exclude",
        maskRepeat: "revert",
      }}
      ref={container}
    >
      {children}
    </motion.div>
  );
};

export default FadingText;
