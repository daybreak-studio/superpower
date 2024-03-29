import React from "react";

type Props = {
  height: string;
};

const Scrim = ({ height }: Props) => {
  return (
    <div className="pointer-events-none relative h-0 w-full overflow-visible">
      <div
        className="w-full bg-gradient-to-b from-[rgba(255,255,255,1)] to-[rgba(0,0,0,0)]"
        style={{
          height: height,
          // background: "linear-gradient(to-bottom, black, transparent)",
        }}
      />
    </div>
  );
};

export default Scrim;
