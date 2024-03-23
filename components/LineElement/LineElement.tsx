import React from "react";

type Props = {
  length: number | "auto";
  vertical?: boolean;
  horizontal?: boolean;
  weight?: number;
  head?: number;
  tail?: number;
  color: string;
  gap?: boolean;
};

const Box = ({
  width = 0,
  height = 0,
  color = "#FFF",
}: {
  width: number | "auto";
  height: number | "auto";
  color: string;
}) => (
  <div
    style={{
      height: width === "auto" ? "100%" : width,
      width: height === "auto" ? "100%" : height,
      backgroundColor: color,
    }}
  />
);

const LineElement = ({
  length,
  vertical,
  head,
  weight = 1,
  tail,
  color = "#FFF",
  gap = false,
}: Props) => {
  return (
    <div
      className="flex items-center justify-center"
      style={{
        flexDirection: vertical ? "column" : "row",
        height: vertical && length === "auto" ? "100%" : undefined,
        width: !vertical && length === "auto" ? "100%" : undefined,
        gap: gap ? 8 : 0,
      }}
    >
      {head && (
        <Box
          width={vertical ? weight : head}
          height={vertical ? head : weight}
          color={color}
        />
      )}
      <Box
        width={vertical ? length : weight}
        height={vertical ? weight : length}
        color={color}
      />
      {tail && (
        <Box
          width={vertical ? weight : tail}
          height={vertical ? tail : weight}
          color={color}
        />
      )}
    </div>
  );
};

export default LineElement;
