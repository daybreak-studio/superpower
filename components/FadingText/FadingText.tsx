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
  const maskX = useTransform(progress, [0, 1], [-bounds.width * 4, 0]);
  const maskPosition = useMotionTemplate`${maskX}px 0px`;

  return (
    <motion.div
      style={{
        mask: `linear-gradient(45deg, rgba(0,0,0,.99) 0%,rgba(0,0,0,.99) 60%, rgba(0,0,0,0) 70%, rgba(0,0,0,0) 100%)`,
        maskPosition: maskPosition,
        maskSize: `${bounds.width * 5}px ${bounds.height}px`,
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
