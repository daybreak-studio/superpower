import React from "react";
import TransitionItem from "./TransitionItem";

type Props = {};

const TransitionSectionWrapper = (props: Props) => {
  return (
    <section className="pointer-events-none relative z-10 h-[75vh] bg-white">
      <TransitionItem direction="up" />
    </section>
  );
};

export default TransitionSectionWrapper;
