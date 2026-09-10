import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assests/roshni.png";
import ApplyNow from "../Components/Apply";

const Navbar = () => {
  const [showApply, setShowApply] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/faculty", label: "Faculty" },
    { to: "/results", label: "Results" },
    { to: "/contact", label: "Contact Us" },
  ];

  return (
    <>
      <nav className="flex items-center justify-between px-6 py-3 shadow-md bg-[#5E5438] text-[#EFE9D8]">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            className="h-16 w-16 object-contain"
            src={logo}
            alt="Roshni Public School logo"
          />

          <h6 className="text-lg font-semibold text-[#FBF9F4]">
            Roshni Public School
          </h6>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-6">
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
      </nav>

      {/* Application Modal */}
      {showApply && (
        <ApplyNow onClose={() => setShowApply(false)} />
      )}
    </>
  );
};

export default Navbar;