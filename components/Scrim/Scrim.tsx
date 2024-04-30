import React, { useMemo } from "react";

type Props = {
  height: string;
  color?: string;
};

const Scrim = ({ height, color = `rgbrgba(255,255,255,1)` }: Props) => {
  const colorLowOpacity = useMemo(
    () => color.replace(/[\d.]+\)$/g, "0)"),
    [color],
  );

  return (
    <div className="pointer-events-none relative h-0 w-full overflow-visible">
      <div
        className="w-full"
        style={{
          height: height,
          // background: "linear-gradient(to-bottom, black, transparent)",
          backgroundImage: `linear-gradient(to bottom, ${color} 0%, ${colorLowOpacity} 100%)`,
        }}
      />
    </div>
  );
};

export default Scrim;
