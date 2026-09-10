import { Link } from "react-router-dom";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Faculty", to: "/faculty" },
  { label: "Contact", to: "/contact" },
];

const socialIcons = {
  facebook: {
    url: "https://www.facebook.com/share/1EYehQarjX/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.25-1.5 1.55-1.5H16.7V3.7C16.4 3.6 15.4 3.5 14.3 3.5c-2.3 0-3.9 1.4-3.9 4v2.4H7.7V13h2.7v8h3.1z" />
      </svg>
    ),
  },

  instagram: {
    url: "https://www.instagram.com/roshnipublicschoolg?stkn=MXI0Z2E5anZoamR5eA==",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M12 8.3a3.7 3.7 0 1 0 0 7.4 3.7 3.7 0 0 0 0-7.4zM12 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm5.9-8.4a.9.9 0 1 1-1.8 0 .9.9 0 0 1 1.8 0zM12 4.6c2.4 0 2.7 0 3.6.05.9.04 1.5.18 1.9.34.5.2.85.44 1.22.8.36.37.6.72.8 1.22.16.4.3 1 .34 1.9.05.9.05 1.2.05 3.6s0 2.7-.05 3.6c-.04.9-.18 1.5-.34 1.9a3.3 3.3 0 0 1-.8 1.22c-.37.36-.72.6-1.22.8-.4.16-1 .3-1.9.34-.9.05-1.2.05-3.6.05s-2.7 0-3.6-.05c-.9-.04-1.5-.18-1.9-.34a3.3 3.3 0 0 1-1.22-.8 3.3 3.3 0 0 1-.8-1.22c-.16-.4-.3-1-.34-1.9C4.6 14.7 4.6 14.4 4.6 12s0-2.7.05-3.6c.04-.9.18-1.5.34-1.9.2-.5.44-.85.8-1.22.37-.36.72-.6 1.22-.8.4-.16 1-.3 1.9-.34.9-.05 1.2-.05 3.6-.05z" />
      </svg>
    ),
  },

  youtube: {
    url: "https://youtube.com/@roshnipublicschool0?si=_lcy4tZB-xOGlW5a",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M21.6 7.2c-.2-1-1-1.7-1.9-1.9C18 5 12 5 12 5s-6 0-7.7.3c-1 .2-1.7 1-1.9 1.9C2 8.9 2 12 2 12s0 3.1.4 4.8c.2 1 1 1.7 1.9 1.9C6 19 12 19 12 19s6 0 7.7-.3c1-.2 1.7-1 1.9-1.9.4-1.7.4-4.8.4-4.8s0-3.1-.4-4.8zM10 15V9l5 3-5 3z" />
      </svg>
    ),
  },

  tiktok: {
    url: "https://www.tiktok.com/@roshnipublicschool?_r=1&_t=ZS-99aF6rCHyhF",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M19.6 7.2a5.6 5.6 0 0 1-3.5-1.2v7.4a5.4 5.4 0 1 1-4.7-5.3v3a2.4 2.4 0 1 0 1.8 2.3V2h2.9a5.7 5.7 0 0 0 3.5 2.9v2.3z" />
      </svg>
    ),
  },
};

const Footer = () => {
  return (
    <footer className="bg-[#5E5438] text-[#EFE9D8]">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* About */}
          <div>
            <p className="font-serif text-lg font-semibold text-white">
              Roshni Public School & College
            </p>

            <p className="mt-4 text-sm leading-relaxed">
              Serving students in Gogdara, Swat from primary through college
              level, with a focus on academic excellence and strong
              character.
            </p>

            <div className="mt-5 flex gap-3">
              {Object.entries(socialIcons).map(([name, social]) => (
                <a
                  key={name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-orange-500"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="font-serif text-lg font-semibold text-orange-300">
              Quick Links
            </p>

            <ul className="mt-4 space-y-2 text-sm">
              {quickLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-[#EFE9D8] hover:text-orange-300"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Location */}
          <div>
            <p className="font-serif text-lg font-semibold text-orange-300">
              Location
            </p>

            <a
              href="https://www.google.com/maps/place/Roshni+Public+School+%26+College+Gogdara/@34.7440816,72.2874405,17z/data=!3m1!4b1!4m14!1m7!3m6!1s0x476e69c45589f9a9:0x894f58933afa5e1c!2sRoshni+Public+School+%26+College+Gogdara!8m2!3d34.7440816!4d72.2900154!16s%2Fg%2F11z9pd1g5x!3m5!1s0x476e69c45589f9a9:0x894f58933afa5e1c!8m2!3d34.7440816!4d72.2900154!16s%2Fg%2F11z9pd1g5x?hl=en-US&entry=ttu&g_ep=EgoyMDI2MDkwNi4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center gap-3 rounded-lg border border-white/15 p-4 transition-colors hover:bg-white/5"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-400/20 text-orange-300">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
                </svg>
              </span>

              <span className="text-sm text-[#F3EEE1]">
                Roshni Public School &amp; College, Gogdara
                <span className="block text-xs text-[#C9BE9C]">
                  View on Google Maps
                </span>
              </span>
            </a>
          </div>

          {/* Newsletter */}
          <div>
            <p className="font-serif text-lg font-semibold text-orange-300">
              Stay Updated
            </p>

            <form
              className="mt-4 space-y-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                placeholder="Your name"
                className="w-full rounded-md border border-white/15 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-[#C9BE9C] focus:border-orange-300 focus:outline-none"
              />

              <input
                type="email"
                placeholder="Your email"
                className="w-full rounded-md border border-white/15 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-[#C9BE9C] focus:border-orange-300 focus:outline-none"
              />

              <button
                type="submit"
                className="w-full rounded-md bg-orange-500 py-2 text-sm font-medium text-white hover:bg-orange-600"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/15 pt-6 text-xs text-[#C9BE9C] sm:flex-row">
          <p>
            © {new Date().getFullYear()} Roshni Public School & College.
            All rights reserved.
          </p>

          <p>0349 8963400 · roshnigogdara08@gmail.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;