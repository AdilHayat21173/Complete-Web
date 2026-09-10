import Footer from "../Components/Footer";
import ApplyNow from "../Components/Apply";

import principalImg from "../assests/javed.jpeg";
import coPrincipalImg from "../assests/coprinciple.jpeg";

const leadership = [
  { name: "Javed Iqbal", role: "Principal", image: principalImg },
  { name: "Samiullah Javed", role: "Co-Principal", image: coPrincipalImg },
];

const staff = [
  { name: "Miss Tahira", role: "Urdu" },
  { name: "Miss Saira", role: "Islamiat" },
  { name: "Miss Ayesha", role: "Science" },
  { name: "Miss Taiba", role: "Nursery / K.G / Playgroup" },
  { name: "Miss Hina", role: "English" },
  { name: "Sir Kashif", role: "Pakistan Studies" },
  { name: "Sir Jalal", role: "General Knowledge" },
  { name: "Sir Adil hayat", role: "Mathematics" },
  
];

const initials = (name) =>
  name
    .replace(/^(Miss|Sir)\s/, "")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const avatarColors = [
  "bg-orange-100 text-orange-600",
  "bg-amber-100 text-amber-600",
  "bg-sky-100 text-sky-600",
  "bg-rose-100 text-rose-600",
  "bg-emerald-100 text-emerald-600",
];

const Faculty = () => {
  return (
    <div className="font-sans bg-[#857850] text-[#F3EEE1]">
      {/* Simple header, no heavy background */}
      <section className="mx-auto max-w-3xl px-6 pt-16 pb-4 text-center">
        <h1 className="font-serif text-3xl font-semibold text-[#FBF9F4] md:text-4xl">
          Meet the staff
        </h1>
        <p className="mt-3 text-sm text-[#D9CEB0]">
          Our principal, co-principal, and teachers across every subject.
        </p>
      </section>

      {/* Leadership — featured */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-wrap justify-center gap-16">
          {leadership.map((person, i) =>
            person.image ? (
              <div key={person.name} className="flex flex-col items-center text-center">
                <img
                  src={person.image}
                  alt={person.name}
                  className="h-36 w-36 rounded-full border-4 border-white/20 object-cover shadow-sm"
                />
                <p className="mt-4 font-serif text-lg font-semibold text-[#FBF9F4]">
                  {person.name}
                </p>
                <p className="mt-1 text-sm text-orange-300">{person.role}</p>
              </div>
            ) : (
              <div key={person.name} className="flex flex-col items-center text-center">
                <div
                  className={`flex h-36 w-36 items-center justify-center rounded-full text-3xl font-semibold ${
                    avatarColors[i % avatarColors.length]
                  }`}
                >
                  {initials(person.name)}
                </div>
                <p className="mt-4 font-serif text-lg font-semibold text-[#FBF9F4]">
                  {person.name}
                </p>
                <p className="mt-1 text-sm text-orange-300">{person.role}</p>
              </div>
            )
          )}
        </div>
      </section>

      {/* Teaching staff */}
      <section className="mx-auto max-w-6xl border-t border-[#A89A6E] px-6 py-16">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 md:grid-cols-4">
          {staff.map((person, i) => (
            <div key={person.name} className="flex flex-col items-center text-center">
              <div
                className={`flex h-24 w-24 items-center justify-center rounded-full text-xl font-semibold ${
                  avatarColors[(i + 2) % avatarColors.length]
                }`}
              >
                {initials(person.name)}
              </div>
              <p className="mt-3 font-serif text-sm font-semibold text-[#FBF9F4]">
                {person.name}
              </p>
              <p className="mt-1 text-xs text-orange-300">{person.role}</p>
            </div>

          ))}

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Faculty;