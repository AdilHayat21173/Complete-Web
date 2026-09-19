import { Link } from "react-router-dom";
import Footer from "../Components/Footer";

const missionPoints = [
  "Deliver accessible, quality education to every enrolled student",
  "Build academic excellence alongside strong moral character",
  "Prepare students for higher education and future careers",
  "Nurture responsible, capable citizens",
];

const visionPoints = [
  "Be a beacon of quality education in Gogdara and beyond",
  "Nurture thinkers, leaders, and well-rounded citizens",
  "Set a standard for academics paired with character",
  "Grow as a trusted institution for the whole community",
];

const timeline = [
  { year: "Founded", event: "Roshni Public School & College opens its doors in Gogdara, Swat." },
  { year: "Growth", event: "Academic programs expand from primary level through to college preparation." },
  { year: "Today", event: "Serving students across Gogdara and Mingora with a full teaching staff and campus facilities." },
];

const policies = [
  { title: "Student Handbook", href: "#" },
  { title: "Uniform Guidelines", href: "#" },
  { title: "Safety Rules", href: "#" },
];

const reasons = [
  "Comprehensive academics, from early foundation through college prep",
  "Character and ethics taught alongside modern academics",
  "Dedicated faculty committed to individual attention",
  "A safe, inclusive campus for every student",
  "Co-curricular growth through sports, debate, and leadership activities",
];

const About = () => {
  return (
    <div className="font-sans text-[#F3EEE1]">
      {/* Header */}
      <section className="bg-[#857850]">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center">
          <p className="text-sm font-medium tracking-wide text-orange-300">About Us</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight text-[#FBF9F4] md:text-5xl">
            A school built on light and learning
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-[#EFE9D8]">
            Roshni Public School & College is an educational institution in
            Gogdara, Swat, serving students from primary through college
            level with a focus on academic excellence and strong character.
          </p>
        </div>
      </section>

      {/* Principal's Message */}
      <section className="bg-[#857850]">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <p className="text-sm font-medium tracking-wide text-orange-300">Principal's Message</p>
          <h2 className="mt-2 font-serif text-2xl font-semibold text-[#FBF9F4]">
            A note from Javed Iqbal
          </h2>
          <div className="mt-5 space-y-4 leading-relaxed text-[#EFE9D8]">
            <p>
              Every child who walks through our gates carries potential worth
              nurturing — our job is to help them find it. At Roshni, we
              believe education is not just about lessons in a classroom, but
              about building the character, curiosity, and confidence that
              will carry our students through the rest of their lives.
            </p>
            <p>
              Alongside our co-principal and dedicated teaching staff, we work
              every day to give each student the individual attention they
              deserve, while preparing them academically for the challenges
              ahead. We are grateful to the families of Gogdara and Mingora
              who trust us with that responsibility, and we remain committed
              to earning that trust every day.
            </p>
          </div>
          <p className="mt-5 text-sm text-[#D9CEB0]">— Javed Iqbal, Principal</p>
        </div>
      </section>

      {/* Our Story */}
      <section className="border-t border-[#A89A6E] bg-[#857850]">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <h2 className="font-serif text-2xl font-semibold text-[#FBF9F4]">Our story</h2>
          <p className="mt-4 leading-relaxed text-[#EFE9D8]">
            Located on GT Road in Gogdara, near Adnan Tyre Shop, Roshni was
            founded to bring accessible, quality education to families in
            Mingora and the surrounding area. What began as a commitment to
            strong fundamentals has grown into a full institution guiding
            students from their earliest years through college preparation —
            always pairing academics with discipline, integrity, and genuine
            individual attention.
          </p>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="border-t border-[#A89A6E] bg-[#857850]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-12 md:grid-cols-2 md:divide-x md:divide-[#A89A6E]">
            <div>
              <h2 className="font-serif text-2xl font-semibold text-[#FBF9F4]">Mission</h2>
              <ul className="mt-4 max-w-sm space-y-3">
                {missionPoints.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-relaxed text-[#EFE9D8]">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:pl-12">
              <h2 className="font-serif text-2xl font-semibold text-[#FBF9F4]">Vision</h2>
              <ul className="mt-4 max-w-sm space-y-3">
                {visionPoints.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-relaxed text-[#EFE9D8]">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* School History Timeline */}
      <section className="bg-[#857850]">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <h2 className="font-serif text-2xl font-semibold text-[#FBF9F4]">Our journey</h2>
          <div className="mt-10 space-y-8 border-l-2 border-[#A89A6E] pl-6">
            {timeline.map((t) => (
              <div key={t.year} className="relative">
                <span className="absolute left-7.75 top-1 h-3 w-3 rounded-full " />
                <p className="text-sm font-semibold text-orange-300">{t.year}</p>
                <p className="mt-1 text-sm leading-relaxed text-[#EFE9D8]">{t.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Roshni */}
      <section className="border-t border-[#A89A6E] bg-[#857850]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-10 md:grid-cols-[1fr_1.6fr]">
            <h2 className="font-serif text-2xl font-semibold text-[#FBF9F4]">
              What makes us different
            </h2>
            <ul className="space-y-4">
              {reasons.map((r) => (
                <li
                  key={r}
                  className="flex gap-3 border-b border-[#A89A6E] pb-4 text-sm leading-relaxed text-[#EFE9D8] last:border-none"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>



      {/* CTA to Faculty page */}
      <section className="border-t border-[#A89A6E] bg-[#857850]">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-16 text-center">
          <h2 className="font-serif text-2xl font-semibold text-[#FBF9F4]">
            Want to meet the people behind Roshni?
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-[#EFE9D8]">
            Our principal, co-principal, and teachers are the heart of the
            school. Get to know them.
          </p>
          <Link
            to="/faculty"
            className="mt-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-medium text-white hover:bg-orange-600"
          >
            Meet the staff
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;