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
  { title: "Quality Education", desc: "A structured curriculum from primary through college level." },
  { title: "Transport Service", desc: "Safe van and bus pickup and drop-off across Gogdara." },
  { title: "Library Access", desc: "A well-stocked library that encourages reading habits." },
  { title: "Safe Campus", desc: "Secure premises with CCTV monitoring and trained supervision." },
  { title: "Sports & Co-curricular", desc: "Sports, debates, and extracurricular activities." },
  { title: "Parent-Teacher Communication", desc: "Regular updates and meetings with families." },
  { title: "Exam Preparation", desc: "Focused guidance and mock tests for board exams." },
  { title: "Computer Studies", desc: "Hands-on computer labs for digital literacy." },
];

// Placeholder news items — replace with real updates as they happen
const news = [
  {
    date: "Aug 2026",
    title: "Admissions open for the new academic year",
    excerpt: "Applications are now being accepted for Playgroup through Class 10.",
  },
  {
    date: "Jul 2026",
    title: "Annual sports day highlights",
    excerpt: "Students competed across track, field, and team events this season.",
  },
  {
    date: "Jun 2026",
    title: "Board exam results announced",
    excerpt: "Congratulations to our graduating class on their achievements.",
  },
];

const Home = () => {
  const [showApply, setShowApply] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  return (
    <div className="font-sans text-[#F3EEE1]">
      {/* Announcement Banner */}
      {showBanner && (
        <div className="flex items-center justify-center gap-3 bg-orange-500 px-4 py-2 text-center text-sm font-medium text-white">
          <span>Admissions for the new academic year are now open.</span>
          <button
            onClick={() => setShowApply(true)}
            className="underline underline-offset-2 hover:no-underline"
          >
            Apply now
          </button>
          <button
            onClick={() => setShowBanner(false)}
            aria-label="Dismiss announcement"
            className="ml-2 text-white/80 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      {/* Hero */}
      <section className="bg-[#857850] text-[#FBF9F4]">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <p className="text-sm tracking-wide text-orange-300">Gogdara, Swat</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight md:text-5xl">
            A foundation of learning, character, and light
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-[#EFE9D8]">
            Roshni Public School & College delivers accessible, quality
            education from primary through college level — building
            academic excellence and strong moral character for responsible
            citizenship.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => setShowApply(true)}
              className="rounded-full bg-orange-500 px-6 py-3 text-sm font-medium text-white hover:bg-orange-600"
            >
              Apply Now
            </button>
            <Link
              to="/about"
              className="rounded-full border border-[#C9BE9C] px-6 py-3 text-sm font-medium text-[#FBF9F4] hover:border-orange-300"
            >
              Learn About Us
            </Link>
          </div>
        </div>
      </section>

      {/* Two Photos + Stats */}
      <section className="relative overflow-hidden bg-[#857850] px-6 py-20">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 md:flex-row md:items-center md:justify-between">
          <div className="relative shrink-0">
            <div className="h-52 w-52 rounded-full bg-orange-200 md:h-60 md:w-60" />
            <img
              src={studentGirl}
              alt="Student at Roshni Public School"
              className="absolute inset-0 h-52 w-52 rounded-full border-4 border-white object-cover shadow-sm md:h-60 md:w-60"
            />
          </div>

          <div className="max-w-md text-center">
            <h2 className="font-serif text-2xl font-semibold text-[#FBF9F4] md:text-3xl">
              Learning that goes beyond the classroom
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#EFE9D8]">
              We don't just give our students lectures — we give them
              hands-on activities, workshops, and real experiences
              throughout their journey.
            </p>
            <button
              onClick={() => setShowApply(true)}
              className="mt-6 rounded-full bg-orange-500 px-6 py-3 text-sm font-medium text-white hover:bg-orange-600"
            >
              Get Started
            </button>

            <div className="mt-10 flex justify-center gap-12">
              <div>
                <p className="font-serif text-2xl font-bold text-[#FBF9F4]">7+</p>
                <p className="mt-1 text-xs leading-relaxed text-[#D9CEB0]">
                  Subject specialists teaching across all grades
                </p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-[#FBF9F4]">3</p>
                <p className="mt-1 text-xs leading-relaxed text-[#D9CEB0]">
                  Signature programs beyond the core curriculum
                </p>
              </div>
            </div>
          </div>

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

      {/* Principal's Mini-Welcome */}
      <section className="border-t border-[#A89A6E] bg-[#857850]">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center">
          <p className="text-sm font-medium tracking-wide text-orange-300">A note from our Principal</p>
          <p className="mx-auto mt-4 max-w-xl font-serif text-xl leading-relaxed text-[#FBF9F4]">
            "Every child who walks through our gates carries potential worth
            nurturing — our job is to help them find it."
          </p>
          <p className="mt-3 text-sm text-[#D9CEB0]">— Javed Iqbal, Principal</p>
          <Link
            to="/about"
            className="mt-5 inline-block text-sm font-medium text-orange-300 hover:underline"
          >
            Read the full message →
          </Link>
        </div>
      </section>

      {/* Academic Programs */}
      <section id="academics" className="border-t border-[#A89A6E] bg-[#857850]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-serif text-2xl font-semibold text-[#FBF9F4]">Academic Programs</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {programs.map((p) => (
              <div key={p.title} className="border-l-2 border-orange-400 pl-5">
                <h3 className="font-serif text-lg font-semibold text-[#FBF9F4]">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#EFE9D8]">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Roshni */}
      <section className="bg-[#857850] px-6 py-20">
        <div className="mx-auto max-w-6xl grid gap-10 md:grid-cols-[1fr_1.6fr]">
          <h2 className="font-serif text-2xl font-semibold text-[#FBF9F4]">
            Why Families Choose Roshni
          </h2>
          <ul className="space-y-4">
            {reasons.map((r) => (
              <li key={r} className="flex gap-3 border-b border-[#A89A6E] pb-4 text-sm leading-relaxed text-[#EFE9D8] last:border-none">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Services */}
      <section className="border-t border-[#A89A6E] bg-[#857850]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-serif text-2xl font-semibold text-[#FBF9F4]">What We Offer</h2>
          <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {services.map((s) => (
              <div key={s.title}>
                <h3 className="font-medium text-[#FBF9F4]">{s.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-[#EFE9D8]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Admission Application Modal */}
      {showApply && <ApplyNow onClose={() => setShowApply(false)} />}
    </div>
  );
};

export default Home;