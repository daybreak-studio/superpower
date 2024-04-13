import React from "react";
import { useAnimation } from "framer-motion";
import EcosystemItem from "./EcosystemItem";

interface Props {}

const EcosystemSection = (props: Props) => {
  interface Props {
    style?: React.CSSProperties;
  }

  return (
    <section>
      <h1>Ecosystem Section</h1>
      <div className="flex w-[1000px] flex-row flex-wrap gap-24">
        <div
          className="h-48 w-48"
          style={{
            opacity: 0.75,
            transformStyle: `preserve-3d`,
            transform: `perspective(2000px) translateZ(500px) rotateX(45deg) rotateZ(8deg) rotateY(15deg)`,
          }}
        >
          <EcosystemItem />
        </div>
        <div
          className="h-48 w-48"
          style={{
            opacity: 0.75,
            transformStyle: `preserve-3d`,
            transform: `perspective(2000px) translateZ(500px) rotateX(45deg) rotateZ(8deg) rotateY(15deg)`,
          }}
        >
          <EcosystemItem />
        </div>
        <div
          className="h-48 w-48"
          style={{
            opacity: 0.75,
            transformStyle: `preserve-3d`,
            transform: `perspective(2000px) translateZ(500px) rotateX(45deg) rotateZ(8deg) rotateY(15deg)`,
          }}
        >
          <EcosystemItem />
        </div>
        <div
          className="h-48 w-48"
          style={{
            opacity: 0.75,
            transformStyle: `preserve-3d`,
            transform: `perspective(2000px) translateZ(500px) rotateX(45deg) rotateZ(8deg) rotateY(15deg)`,
          }}
        >
          <EcosystemItem />
        </div>
        <div
          className="h-48 w-48"
          style={{
            opacity: 0.75,
            transformStyle: `preserve-3d`,
            transform: `perspective(2000px) translateZ(500px) rotateX(45deg) rotateZ(8deg) rotateY(15deg)`,
          }}
        >
          <EcosystemItem />
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;
