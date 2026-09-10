import { useState } from "react";
import emailjs from "@emailjs/browser";
import Footer from "../Components/Footer";


 
// EmailJS Configuration — pulled from environment variables (see .env)
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    classApplying: "Contact Us",
  });

  const [status, setStatus] = useState("idle");

  // Handle input changes
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check Public Key
    if (!PUBLIC_KEY || PUBLIC_KEY === "YOUR_PUBLIC_KEY") {
      console.error("EmailJS Public Key is missing.");
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      const response = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          classApplying: "Contact Us",
          message: form.message,
        },
        {
          publicKey: PUBLIC_KEY,
        }
      );

      console.log("Email sent successfully:", response);

      setStatus("sent");

      // Clear form
      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
        classApplying: "Contact Us",
      });
    } catch (error) {
      console.error("EmailJS Error:", error);

      console.error("Error Status:", error?.status);
      console.error("Error Text:", error?.text);

      setStatus("error");
    }
  };

  return (
    <div className="font-sans bg-[#857850] text-[#F3EEE1]">

      {/* Header */}
      <section className="bg-[#857850]">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center">

          <p className="text-sm font-medium tracking-wide text-orange-300">
            Contact Us
          </p>

          <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight text-[#FBF9F4] md:text-5xl">
            We'd love to hear from you
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-[#EFE9D8]">
            Questions about admissions, academics, or anything else — reach
            out and our team will get back to you.
          </p>

        </div>
      </section>

      {/* Form + Contact Details */}
      <section className="mx-auto max-w-6xl px-6 py-20">

        <div className="grid gap-14 md:grid-cols-2">

          {/* Contact Form */}
          <div>

            <h2 className="font-serif text-2xl font-semibold text-[#FBF9F4]">
              Send a message
            </h2>

            {/* SUCCESS MESSAGE */}
            {status === "sent" && (
              <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-6">

                <p className="text-lg font-semibold text-green-700">
                  Message Sent Successfully
                </p>

                <p className="mt-2 text-sm leading-relaxed text-green-700">
                  Thank you for contacting Roshni Public School.
                  Your message has been sent successfully. Our team will
                  get back to you soon.
                </p>

                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-5 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-orange-600"
                >
                  Send Another Message
                </button>

              </div>
            )}

            {/* ERROR MESSAGE */}
            {status === "error" && (
              <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-5">

                <p className="font-semibold text-red-700">
                  Message Could Not Be Sent
                </p>

                <p className="mt-2 text-sm leading-relaxed text-red-600">
                  Something went wrong while sending your message.
                  Please check your EmailJS configuration and try again.
                </p>

                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-4 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-orange-600"
                >
                  Try Again
                </button>

              </div>
            )}

            {/* FORM */}
            {(status === "idle" || status === "sending") && (
              <form
                onSubmit={handleSubmit}
                className="mt-6 space-y-4"
              >

                {/* Full Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-[#EFE9D8]"
                  >
                    Full name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="mt-1 w-full rounded-md border border-[#A89A6E] bg-white px-4 py-2.5 text-sm text-[#3D3524] placeholder:text-[#8A93A0] focus:border-orange-400 focus:outline-none"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-[#EFE9D8]"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="mt-1 w-full rounded-md border border-[#A89A6E] bg-white px-4 py-2.5 text-sm text-[#3D3524] placeholder:text-[#8A93A0] focus:border-orange-400 focus:outline-none"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium text-[#EFE9D8]"
                  >
                    Phone
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="03XX XXXXXXX"
                    className="mt-1 w-full rounded-md border border-[#A89A6E] bg-white px-4 py-2.5 text-sm text-[#3D3524] placeholder:text-[#8A93A0] focus:border-orange-400 focus:outline-none"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-[#EFE9D8]"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="How can we help?"
                    className="mt-1 w-full rounded-md border border-[#A89A6E] bg-white px-4 py-2.5 text-sm text-[#3D3524] placeholder:text-[#8A93A0] focus:border-orange-400 focus:outline-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="rounded-full bg-orange-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "sending"
                    ? "Sending..."
                    : "Send Message"}
                </button>

              </form>
            )}

          </div>

          {/* Contact Details */}
          <div>

            <h2 className="font-serif text-2xl font-semibold text-[#FBF9F4]">
              Visit or reach us directly
            </h2>

            <dl className="mt-6 space-y-5 text-sm text-[#EFE9D8]">

              {/* Address */}
              <div>
                <dt className="font-medium text-[#FBF9F4]">
                  Address
                </dt>

                <dd className="mt-1">
                  GT Road Gogdara Swat, Near Adnan Tyre Shop,
                  Gogdara, Mingora, 19130
                </dd>
              </div>

              {/* Phone */}
              <div>
                <dt className="font-medium text-[#FBF9F4]">
                  Phone
                </dt>

                <dd className="mt-1">
                  0349 8963400
                </dd>
              </div>

              {/* Email */}
              <div>
                <dt className="font-medium text-[#FBF9F4]">
                  Email
                </dt>

                <dd className="mt-1">
                  roshnigogdara08@gmail.com
                </dd>
              </div>

              {/* Hours */}
              <div>
                <dt className="font-medium text-[#FBF9F4]">
                  Hours
                </dt>

                <dd className="mt-1">
                  Open · Closes 1 PM
                </dd>
              </div>

            </dl>

            {/* Google Map */}
            <div className="mt-8 overflow-hidden rounded-lg border border-[#A89A6E]">

              <iframe
                title="Roshni Public School location"
                src="https://www.google.com/maps?q=Roshni+Public+School+%26+College+Gogdara,+34.7440816,72.2900154&output=embed"
                className="h-56 w-full"
                loading="lazy"
              />

            </div>

            <a
              href="https://www.google.com/maps/place/Roshni+Public+School+%26+College+Gogdara/@34.7440816,72.2874405,17z/data=!3m1!4b1!4m14!1m7!3m6!1s0x476e69c45589f9a9:0x894f58933afa5e1c!2sRoshni+Public+School+%26+College+Gogdara!8m2!3d34.7440816!4d72.2900154!16s%2Fg%2F11z9pd1g5x!3m5!1s0x476e69c45589f9a9:0x894f58933afa5e1c!8m2!3d34.7440816!4d72.2900154!16s%2Fg%2F11z9pd1g5x?hl=en-US&entry=ttu&g_ep=EgoyMDI2MDkwNi4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm font-medium text-orange-300 hover:underline"
            >
              Open in Google Maps →
            </a>

          </div>

        </div>
      </section>

      <Footer />

    </div>
  );
};

export default Contact;