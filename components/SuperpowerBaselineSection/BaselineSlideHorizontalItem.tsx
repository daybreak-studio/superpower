import React from "react";
import Image from "next/image";

type Props = {
  previewSrc: string;
  expandedSrc: string;
  index: string;
  header: string;
  description: string;
  isCurrent: boolean;
  onSelect: () => void;
};

const BaselineSlideHorizontalItem = ({
  previewSrc,
  expandedSrc,
  isCurrent,
}: Props) => {
  return (
    <div className="h-full w-full overflow-hidden rounded-3xl">
      <Image
        className="h-full w-full object-cover"
        src={previewSrc}
        width={282}
        height={122}
        alt={""}
      />
    </div>
  );
};

export default BaselineSlideHorizontalItem;
