import React from "react";

type Props = {
  topLeft?: boolean;
  topRight?: boolean;
  bottomLeft?: boolean;
  bottomRight?: boolean;
  size?: number;
};

const Corner = ({
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  size = 8,
}: Props) => {
  const topLeftCorner = `border-t border-l`;
  const topRightCorner = `border-r border-t`;
  const bottomLeftCorner = `border-b border-l`;
  const bottomRightCorner = `border-b border-r`;

  return (
    <div
      className={`border-zinc-900 
                ${topLeft && topLeftCorner} 
                ${topRight && topRightCorner} 
                ${bottomLeft && bottomLeftCorner} 
                ${bottomRight && bottomRightCorner}`}
      style={{ width: size, height: size }}
    ></div>
  );
};

export default Corner;
