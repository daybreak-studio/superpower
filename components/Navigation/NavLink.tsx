import React from "react";

type Props = {
  href: string;
  children: React.ReactNode;
};

const NavLink = ({ href, children }: Props) => {
  return (
    <a href={href} className="" style={{ textDecoration: "none" }}>
      {children}
    </a>
  );
};

export default NavLink;
