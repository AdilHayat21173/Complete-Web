import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-cyan-900">
      <h2 className="text-xl font-bold">
        Roshni Public School
      </h2>

      <div className="flex gap-8">
        <NavLink
          className="text-lg font-bold"
          to="/"
        >
          Home
        </NavLink>

        <NavLink
          className="text-lg font-bold"
          to="/about"
        >
          About
        </NavLink>

        <NavLink
          className="text-lg font-bold"
          to="/contact"
        >
          Contact Us
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;