import React, { MutableRefObject, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Advisors } from "./Advisors";
import LineElement from "@/components/LineElement/LineElement";

import Image from "next-image-export-optimizer";

type Props = {};

const AdvisorsSection = (props: Props) => {
  const gridRef = useRef() as MutableRefObject<HTMLDivElement>;
  const isInView = useInView(gridRef);

  return (
    <section
      className="relative mt-[10vw] flex h-auto w-screen flex-col items-center bg-white px-4"
      ref={gridRef}
    >
      <div className="flex max-w-[1132px] flex-col items-center gap-[72px]">
        <div className="flex w-full max-w-[585px] flex-col items-center gap-6 px-4">
          <div className="font-sans-3xl text-center text-black lg:font-sans-2xl">
            <h1>Backed by the best</h1>
          </div>
          <div className="w-full max-w-[533px]">
            <p className="font-sans-lg text-center text-black opacity-50">
              {"Supported by the world's top longevity doctors,"}
              <br /> scientists, and technologists.
            </p>
          </div>
        </div>
        <div className="relative grid gap-x-8 md:grid-cols-2">
          <div className="absolute left-[50%] top-[50%] hidden h-[115%] translate-x-[-50%] translate-y-[-50%] md:block">
            <LineElement length="auto" color={"#E4E4E7"} vertical head={32} />
          </div>
          {Advisors.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <motion.div
                  className="my-[-0.5px] flex flex-row items-center gap-6 border-y border-[#E4E4E7] py-4"
                  animate={{ opacity: isInView ? 1 : 0 }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                >
                  <Image
                    className="width-[72px] height-[72px]"
                    src={item.image}
                    alt=""
                    width={72}
                    height={72}
                  />
                  <div className="flex flex-col gap-1">
                    <div className="font-sans-md">{item.name}</div>
                    <div className="font-sans-sm text-[#8e8e9d]">
                      {item.title}
                    </div>
                  </div>
                </motion.div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AdvisorsSection;
