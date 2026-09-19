import { useState } from "react";
import { Link } from "react-router-dom";

import studentGirl from "../assests/girl.avif";
import studentBoy from "../assests/boy.avif";

import Footer from "../Components/Footer";
import ApplyNow from "../Components/Apply";

const programs = [
  {
    title: "Creative Thinking",
    desc: "Encourages imagination and problem-solving through hands-on activities.",
  },
  {
    title: "Career Planning",
    desc: "Helps students explore their interests and build future goals.",
  },
  {
    title: "Public Speaking",
    desc: "Builds confidence to express ideas clearly, in front of any audience.",
  },
];

const reasons = [
  "Comprehensive academics, from early foundation through college prep",
  "Character and ethics taught alongside modern academics",
  "Dedicated faculty committed to individual attention",
  "A safe, inclusive campus for every student",
  "Co-curricular growth through sports, debate, and leadership activities",
];

const services = [
  {
    title: "Quality Education",
    desc: "A structured curriculum from primary through college level.",
  },
  {
    title: "Transport Service",
    desc: "Safe van and bus pickup and drop-off across Gogdara.",
  },
  {
    title: "Library Access",
    desc: "A well-stocked library that encourages reading habits.",
  },
  {
    title: "Safe Campus",
    desc: "Secure premises with CCTV monitoring and trained supervision.",
  },
  {
    title: "Sports & Co-curricular",
    desc: "Sports, debates, and extracurricular activities.",
  },
  {
    title: "Parent-Teacher Communication",
    desc: "Regular updates and meetings with families.",
  },
  {
    title: "Exam Preparation",
    desc: "Focused guidance and mock tests for board exams.",
  },
  {
    title: "Computer Studies",
    desc: "Hands-on computer labs for digital literacy.",
  },
];

const Home = () => {
  const [showApply, setShowApply] = useState(false);

  return (
    <div className="font-sans text-[#44515C]">

      {/* Hero */}
      <section className="bg-[#14263A] text-[#FBF9F4]">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">

          <p className="text-sm tracking-wide text-orange-400">
            Gogdara, Swat
          </p>

          <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight md:text-5xl">
            A foundation of learning, character, and light
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-[#C7D0D8]">
            Roshni Public School & College delivers accessible, quality
            education from primary through college level — building
            academic excellence and strong moral character for responsible
            citizenship.
          </p>

          <div className="mt-8 flex justify-center gap-4">

            {/* Apply Now */}
            <button
              onClick={() => setShowApply(true)}
              className="rounded-full bg-orange-500 px-6 py-3 text-sm font-medium text-white hover:bg-orange-600"
            >
              Apply Now
            </button>

            {/* About */}
            <Link
              to="/about"
              className="rounded-full border border-[#3D4E60] px-6 py-3 text-sm font-medium text-[#FBF9F4] hover:border-orange-400"
            >
              Learn About Us
            </Link>

          </div>
        </div>
      </section>

      {/* Two Photos + Stats */}
      <section className="relative overflow-hidden bg-[#FBF9F4] px-6 py-20">

        <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 md:flex-row md:items-center md:justify-between">

          {/* Left Photo */}
          <div className="relative shrink-0">
            <div className="h-52 w-52 rounded-full bg-orange-200 md:h-60 md:w-60" />

            <img
              src={studentGirl}
              alt="Student at Roshni Public School"
              className="absolute inset-0 h-52 w-52 rounded-full border-4 border-white object-cover shadow-sm md:h-60 md:w-60"
            />
          </div>

          {/* Center Content */}
          <div className="max-w-md text-center">

            <h2 className="font-serif text-2xl font-semibold text-[#14263A] md:text-3xl">
              Learning that goes beyond the classroom
            </h2>

            <p className="mt-4 text-sm leading-relaxed">
              We don't just give our students lectures — we give them
              hands-on activities, workshops, and real experiences
              throughout their journey.
            </p>

            {/* Get Started */}
            <button
              onClick={() => setShowApply(true)}
              className="mt-6 rounded-full bg-orange-500 px-6 py-3 text-sm font-medium text-white hover:bg-orange-600"
            >
              Get Started
            </button>

            {/* Stats */}
            <div className="mt-10 flex justify-center gap-12">

              <div>
                <p className="font-serif text-2xl font-bold text-[#14263A]">
                  7+
                </p>

                <p className="mt-1 text-xs leading-relaxed text-[#8A93A0]">
                  Subject specialists teaching across all grades
                </p>
              </div>

              <div>
                <p className="font-serif text-2xl font-bold text-[#14263A]">
                  3
                </p>

                <p className="mt-1 text-xs leading-relaxed text-[#8A93A0]">
                  Signature programs beyond the core curriculum
                </p>
              </div>

            </div>
          </div>

          {/* Right Photo */}
          <div className="relative shrink-0">
            <div className="h-52 w-52 rounded-full bg-amber-200 md:h-60 md:w-60" />

            <img
              src={studentBoy}
              alt="Student at Roshni Public School"
              className="absolute inset-0 h-52 w-52 rounded-full border-4 border-white object-cover shadow-sm md:h-60 md:w-60"
            />
          </div>

        </div>
      </section>

      {/* Mission / Vision */}
      <section
        id="about"
        className="mx-auto max-w-6xl px-6 py-20"
      >
        <div className="grid gap-12 md:grid-cols-2 md:divide-x md:divide-[#E3DCCC]">

          <div>
            <h2 className="font-serif text-2xl font-semibold text-[#14263A]">
              Mission
            </h2>

            <p className="mt-4 max-w-sm leading-relaxed">
              To deliver accessible, quality education that builds academic
              excellence and strong moral character — preparing students for
              higher education and responsible citizenship.
            </p>
          </div>

          <div className="md:pl-12">
            <h2 className="font-serif text-2xl font-semibold text-[#14263A]">
              Vision
            </h2>

            <p className="mt-4 max-w-sm leading-relaxed">
              To be a beacon of quality education in Gogdara and beyond,
              known for nurturing thinkers, leaders, and well-rounded
              citizens.
            </p>
          </div>

        </div>
      </section>

      {/* Academic Programs */}
      <section
        id="academics"
        className="border-t border-[#E3DCCC] bg-[#F4F0E6]"
      >
        <div className="mx-auto max-w-6xl px-6 py-20">

          <h2 className="font-serif text-2xl font-semibold text-[#14263A]">
            Academic Programs
          </h2>

          <div className="mt-10 grid gap-8 md:grid-cols-3">

            {programs.map((p) => (
              <div
                key={p.title}
                className="border-l-2 border-orange-500 pl-5"
              >
                <h3 className="font-serif text-lg font-semibold text-[#14263A]">
                  {p.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* Why Choose Roshni */}
      <section className="mx-auto max-w-6xl px-6 py-20">

        <div className="grid gap-10 md:grid-cols-[1fr_1.6fr]">

          <h2 className="font-serif text-2xl font-semibold text-[#14263A]">
            Why Families Choose Roshni
          </h2>

          <ul className="space-y-4">

            {reasons.map((r) => (
              <li
                key={r}
                className="flex gap-3 border-b border-[#E3DCCC] pb-4 text-sm leading-relaxed last:border-none"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />

                {r}
              </li>
            ))}

          </ul>
        </div>
      </section>

      {/* Services */}
      <section className="border-t border-[#E3DCCC] bg-[#F4F0E6]">

        <div className="mx-auto max-w-6xl px-6 py-20">

          <h2 className="font-serif text-2xl font-semibold text-[#14263A]">
            What We Offer
          </h2>

          <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">

            {services.map((s) => (
              <div key={s.title}>

                <h3 className="font-medium text-[#14263A]">
                  {s.title}
                </h3>

                <p className="mt-1 text-sm leading-relaxed">
                  {s.desc}
                </p>

              </div>
            ))}

          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Admission Application Modal */}
      {showApply && (
        <ApplyNow
          onClose={() => setShowApply(false)}
        />
      )}

    </div>
  );
};

export default Home;