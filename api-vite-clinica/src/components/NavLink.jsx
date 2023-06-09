import React from "react";
import { NavLink as NavLinkRouter } from "react-router-dom";

function NavLink({ to, children, ...props }) {
  return (
    <NavLinkRouter
      {...props}
      className={({ isActive }) => (isActive ? "cajaSelect isActive" : "cajaSelect")}
      to={to}
    >
      {children}
    </NavLinkRouter>
  );
}

export default NavLink;
