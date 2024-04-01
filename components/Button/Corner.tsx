import React from "react";

type Props = {
  topLeft?: boolean;
  topRight?: boolean;
  bottomLeft?: boolean;
  bottomRight?: boolean;
  size?: number;
  color?: string;
};

const Corner = ({
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  size = 8,
  color = "#000",
}: Props) => {
  const topLeftCorner = `border-t border-l`;
  const topRightCorner = `border-r border-t`;
  const bottomLeftCorner = `border-b border-l`;
  const bottomRightCorner = `border-b border-r`;

  return (
    <div
      className={`
                ${topLeft && topLeftCorner} 
                ${topRight && topRightCorner} 
                ${bottomLeft && bottomLeftCorner} 
                ${bottomRight && bottomRightCorner}`}
      style={{ width: size, height: size, borderColor: color }}
    ></div>
  );
};

export default Corner;
