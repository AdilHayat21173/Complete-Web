import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assests/roshni.png";
import ApplyNow from "../Components/Apply";

const Navbar = () => {
  const [showApply, setShowApply] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/faculty", label: "Faculty" },
    { to: "/results", label: "Results" },
    { to: "/contact", label: "Contact Us" },
  ];

  return (
    <>
      <nav className="relative flex items-center justify-between px-4 py-3 shadow-md bg-[#5E5438] text-[#EFE9D8] sm:px-6">

        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          <img
            className="h-12 w-12 object-contain sm:h-16 sm:w-16"
            src={logo}
            alt="Roshni Public School logo"
          />

          <h6 className="text-sm font-semibold leading-tight text-[#FBF9F4] sm:text-lg">
            Roshni Public School
          </h6>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-[#EFE9D8] font-medium hover:text-orange-300 transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {/* Apply Now */}
          <button
            onClick={() => setShowApply(true)}
            className="rounded-full bg-orange-500 px-5 py-2 text-white font-medium hover:bg-orange-600 transition-colors"
          >
            Apply Now
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="flex h-10 w-10 items-center justify-center rounded-md text-[#FBF9F4] md:hidden"
        >
          {menuOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Mobile Navigation Panel */}
        {menuOpen && (
          <div className="absolute left-0 right-0 top-full z-40 flex flex-col gap-1 border-t border-[#7A6E4C] bg-[#5E5438] px-4 py-4 shadow-md md:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-3 py-2.5 text-[#EFE9D8] font-medium hover:bg-white/10 hover:text-orange-300 transition-colors"
              >
                {link.label}
              </Link>
            ))}

            <button
              onClick={() => {
                setShowApply(true);
                setMenuOpen(false);
              }}
              className="mt-2 w-full rounded-full bg-orange-500 px-5 py-2.5 text-white font-medium hover:bg-orange-600 transition-colors"
            >
              Apply Now
            </button>
          </div>
        )}
      </nav>

      {/* Application Modal */}
      {showApply && (
        <ApplyNow onClose={() => setShowApply(false)} />
      )}
    </>
  );
};

export default Navbar;