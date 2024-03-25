import React from "react";

type Props = {
  href: string;
  children: string;
};

const CTAButton = ({ href, children }: Props) => {
  return (
    <a
      href={href}
      target="blank"
      className="font-mono-sm relative inline-block bg-white px-8 py-4 text-zinc-900"
    >
      {children}
      <div className="absolute inset-0 bg-white blur-2xl"></div>
    </a>
  );
};

export default CTAButton;
