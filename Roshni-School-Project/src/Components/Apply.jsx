import { useState } from "react";
import emailjs from "@emailjs/browser";


 // EmailJS Configuration — pulled from environment variables (see .env)
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;


const emptyForm = {
  name: "",
  phone: "",
  email: "",
  classApplying: "",
  message: "",
};

const ApplyNow = ({ onClose }) => {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, form, PUBLIC_KEY)
      .then(() => {
        setStatus("sent");
        setForm(emptyForm);
      })
      .catch((error) => {
        console.error(error);
        setStatus("error");
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl font-semibold text-[#5E5438]">
            Apply Now
          </h2>

          <button
            onClick={onClose}
            className="text-lg text-[#8A7A5C] hover:text-[#5E5438]"
          >
            ✕
          </button>
        </div>

        {/* Success */}
        {status === "sent" ? (
          <div className="mt-6">
            <p className="text-sm text-[#5E5438]">
              Thank you — we've received your details and will contact you
              soon.
            </p>

            <button
              onClick={onClose}
              className="mt-4 rounded-full bg-orange-500 px-5 py-2 text-sm text-white hover:bg-orange-600"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-3">

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Student's name"
              className="w-full rounded-md border border-[#C9BE9C] px-3 py-2 text-sm text-[#3D3524] placeholder:text-[#8A7A5C] focus:border-orange-400 focus:outline-none"
            />

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              placeholder="Phone number"
              className="w-full rounded-md border border-[#C9BE9C] px-3 py-2 text-sm text-[#3D3524] placeholder:text-[#8A7A5C] focus:border-orange-400 focus:outline-none"
            />

            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Email"
              className="w-full rounded-md border border-[#C9BE9C] px-3 py-2 text-sm text-[#3D3524] placeholder:text-[#8A7A5C] focus:border-orange-400 focus:outline-none"
            />

            <input
              name="classApplying"
              value={form.classApplying}
              onChange={handleChange}
              required
              placeholder="Class applying for"
              className="w-full rounded-md border border-[#C9BE9C] px-3 py-2 text-sm text-[#3D3524] placeholder:text-[#8A7A5C] focus:border-orange-400 focus:outline-none"
            />

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={3}
              placeholder="Anything else?"
              className="w-full rounded-md border border-[#C9BE9C] px-3 py-2 text-sm text-[#3D3524] placeholder:text-[#8A7A5C] focus:border-orange-400 focus:outline-none"
            />

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-full bg-orange-500 py-2.5 text-sm font-medium text-white hover:bg-orange-600 disabled:opacity-60"
            >
              {status === "sending" ? "Sending..." : "Submit"}
            </button>

            {status === "error" && (
              <p className="text-sm text-red-500">
                Something went wrong, please try again.
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default ApplyNow;