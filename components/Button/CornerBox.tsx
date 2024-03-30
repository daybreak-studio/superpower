import React from "react";
import Corner from "@/components/Button/Corner";

type Props = {
  cornerSize: number;
  cornerColor: string;
};

const CornerBox = ({ cornerSize, cornerColor }: Props) => {
  return (
    <div className="pointer-events-none absolute left-0 top-0 h-full w-full">
      <div className="absolute left-0 top-0">
        <Corner topLeft size={cornerSize} color={cornerColor} />
      </div>
      <div className="absolute right-0 top-0">
        <Corner topRight size={cornerSize} color={cornerColor} />
      </div>
      <div className="absolute bottom-0 left-0">
        <Corner bottomLeft size={cornerSize} color={cornerColor} />
      </div>
      <div className="absolute bottom-0 right-0">
        <Corner bottomRight size={cornerSize} color={cornerColor} />
      </div>
    </div>
  );
};

export default CornerBox;
