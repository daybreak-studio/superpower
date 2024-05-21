import SuperpowerLogo from "./SuperpowerLogo";
import CTAButton from "@/components/Button/CTAButton";
import LineElement from "@/components/LineElement/LineElement";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { useBounds } from "@/hooks/useBounds";
import { useWindowDimension } from "@/hooks/useWindowDimension";
import { useMotionValueSwitch } from "@/hooks/useMotionValueSwitch";
import { ViralLoopsDialog } from "@/components/ViralLoopsDialog/ViralLoopsDialog";

type Props = { scrollTopOffset: number };

const HeroMobileLayout = ({ scrollTopOffset }: Props) => {
  const { scrollY } = useScroll();
  const [containerRef, bounds] = useBounds<HTMLDivElement>([]);
  const windowDim = useWindowDimension();

  const shouldShowLogo = useMotionValueSwitch(
    scrollY,
    (latest) => latest >= 0 && latest < scrollTopOffset + windowDim.height / 2,
  );

  const fadeOutDistance = windowDim.height * 0.65;

  const sectionOpacity = useTransform(
    scrollY,
    [
      bounds.height - fadeOutDistance + scrollTopOffset,
      bounds.height + scrollTopOffset,
    ],
    [1, 0],
  );

  const blur = useTransform(sectionOpacity, [1, 0], [0, 100]);
  const blurString = useMotionTemplate`blur(${blur}px)`;

  return (
    <>
      <motion.div
        initial={{
          opacity: 0,
          y: scrollTopOffset,
        }}
        animate={{
          opacity: 1,
        }}
        style={{
          // opacity: sectionOpacity,
          opacity: 1,
          filter: blurString,
        }}
        ref={containerRef}
        className="absolute left-0 right-0 top-0 z-10 flex min-h-screen w-full flex-col items-center px-4"
      >
        <div className="mb-12 mt-[65vh] flex flex-col items-center text-center">
          <h1 className="font-sans-3xl max-w-[13ch]">
            A new era of personal health
          </h1>
          <div className="my-12 max-w-[28ch] text-center">
            <p className="font-sans-xl mb-3 leading-tight">
              The world’s most advanced digital clinic to help you live longer,
              prevent disease, and feel your best
            </p>
            {/* <p className="font-sans-sm mb-auto opacity-70">
              Leading doctors, whole-body testing, and the latest technology,
              like you&apos;ve never experienced before.
            </p> */}
          </div>
          <ViralLoopsDialog>
            <CTAButton>Join waitlist</CTAButton>
          </ViralLoopsDialog>
        </div>
      </motion.div>
      {/* <motion.div
        className="fixed inset-0  z-50 mt-12 flex h-4 justify-center"
        animate={{ opacity: shouldShowLogo ? 1 : 0 }}
      >
        <SuperpowerLogo />
      </motion.div> */}
    </>
  );
};

export default HeroMobileLayout;
