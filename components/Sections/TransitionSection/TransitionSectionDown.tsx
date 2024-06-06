import React from "react";
import TransitionItem from "./TransitionItem";

type Props = {};

const TransitionSectionWrapper = (props: Props) => {
  return (
    <section className="pointer-events-none relative z-10 h-[75vh] overflow-hidden bg-white">
      <TransitionItem direction="down" />
    </section>
  );
};

export default TransitionSectionWrapper;
