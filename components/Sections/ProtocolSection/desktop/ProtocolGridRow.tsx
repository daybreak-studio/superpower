import { useMemo, useState } from "react";
import { ExpandHandler, ProtocolProps } from "./ProtocolGrid";
import { useBounds } from "@/hooks/useBounds";
import { motion } from "framer-motion";
import { ProtocolGridItem } from "./ProtocolGridItem";
import { AnimationConfig } from "@/components/AnimationConfig";

export const ProtocolGridRow = ({
  row,
  protocols,
  onExpand,
  expandedRow,
}: ProtocolProps & {
  row: number;
  expandedRow: number | null;
  onExpand: ExpandHandler;
}) => {
  const [expandedItemIndex, setExpandedItemIndex] = useState<number | null>(
    null,
  );
  const isCurrentRowInFocus = expandedRow === row;
  const isNoRowFocused = expandedRow === null;
  const isNotFocusedInCurrentRow = !isNoRowFocused && !isCurrentRowInFocus;

  const handleExpand = (itemIndex: number | null) => {
    setExpandedItemIndex(itemIndex);

    // when itemIndex equals null, it unexpands
    if (itemIndex === null) {
      onExpand(null);
    } else {
      onExpand(row);
    }
  };

  const gap = 14;
  const [containerRef, bounds] = useBounds<HTMLDivElement>([]);

  const totalGapSize = useMemo(
    () => gap * (protocols.length - 1),
    [gap, protocols],
  );

  const itemWdith = useMemo(() => {
    return (bounds.width - totalGapSize) / protocols.length;
  }, [bounds, protocols, totalGapSize]);

  const itemHeight = itemWdith * 0.72;

  const collapseWidth = useMemo(() => {
    return itemWdith / 4;
  }, [itemWdith]);

  const expandWidth = useMemo(() => {
    return itemWdith * 2;
  }, [itemWdith]);

  return (
    <motion.div
      className={`flex flex-grow flex-row gap-[14px]`}
      ref={containerRef}
      animate={{
        height: isNoRowFocused
          ? itemHeight
          : isCurrentRowInFocus
            ? itemHeight * (1 + 1 / 3)
            : itemHeight * (2 / 3),
        transition: {
          duration: AnimationConfig.VERY_SLOW,
          ease: AnimationConfig.EASING,
        },
      }}
    >
      {protocols.map((protocol, index) => (
        <ProtocolGridItem
          itemWidth={itemWdith}
          isExpanded={expandedItemIndex === index}
          isCollapsed={
            (expandedItemIndex !== index && expandedItemIndex !== null) ||
            isNotFocusedInCurrentRow
          }
          collapseWidth={collapseWidth}
          expandWidth={expandWidth}
          onExpand={() => handleExpand(index)}
          onUnexpand={() => handleExpand(null)}
          key={index}
          {...protocol}
        />
      ))}
    </motion.div>
  );
};
