import React from "react";
import { motion, useTransform } from "framer-motion";
import { AnimationConfig } from "../../AnimationConfig";
import { useCarouselItemContext } from "../../Carousel/Carousel";
import { SlideInfo } from "./SuperpowerBaselineSection";
import TracyShadow from "../../TracyShadow";

type Props = {
    slide: SlideInfo;
};

const BaselineCarouselItem = ({ slide }: Props) => {
    const { isCurrent, isPointerDown, scrollOffset, dimensions } =
        useCarouselItemContext();

    const pointerScaleFactor = isPointerDown ? 0.98 : 1;

    const itemBeginPos = dimensions.x;
    const itemEndPos = dimensions.x + dimensions.width;

    const itemAppearProgress = useTransform(
        scrollOffset,
        [-itemBeginPos, -itemEndPos],
        [0, 1],
        { clamp: false },
    );

    const lightOffset = useTransform(
        itemAppearProgress,
        [-1, 0, 1],
        [70, 0, -70],
    );

    return (
        <TracyShadow
            color={slide.color}
            elevation={isCurrent ? (isPointerDown ? 0.9 : 1) : 0}
            lightSourceOffset={lightOffset}
        >
            <motion.div
                className="relative mb-32 h-[100vw] max-h-[500px] w-[70vw] overflow-hidden rounded-3xl sm:w-[60vw]"
                initial={{
                    opacity: 0,
                    scale: isCurrent ? 1 : 0.7,
                }}
                animate={{
                    opacity: 1,
                    scale: isCurrent ? 1 * pointerScaleFactor : 0.7 * pointerScaleFactor,
                    transition: {
                        duration: AnimationConfig.SLOW,
                        ease: AnimationConfig.EASING,
                    },
                }}
            >
                <motion.div className="h-full w-full">
                    <img
                        className="h-full w-full object-cover"
                        src={slide.mobileSrc}
                        width={282}
                        height={122}
                        alt={""}
                    />
                </motion.div>
                <motion.div
                    animate={{
                        opacity: isCurrent ? 1 : 0,
                        transition: {
                            ease: AnimationConfig.EASING,
                            duration: AnimationConfig.VERY_SLOW,
                        },
                    }}
                    className="absolute bottom-0 left-0 right-0 z-10 m-2 rounded-2xl border border-[rgba(255,255,255,.2)] bg-blur p-6 text-white backdrop-blur-lg"
                >
                    <h3 className="font-mono-xs mb-4">{slide.header}</h3>
                    <p className="font-sans-sm opacity-70">{slide.description}</p>
                </motion.div>
            </motion.div>
        </TracyShadow>
    );
};

export default BaselineCarouselItem;
