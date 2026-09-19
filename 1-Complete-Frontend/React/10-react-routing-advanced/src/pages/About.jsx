import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="p-10 text-center">

      <h1 className="text-4xl font-bold mb-4">
        About Us
      </h1>

      <p className="text-lg mb-8">
        This is the About Page
      </p>

      <div className="flex justify-center gap-4">

        {/* Go directly to Home */}
        <button
          onClick={() => navigate("/")}
          className="bg-cyan-700 px-5 py-2 rounded"
        >
          Return to Home
        </button>

        {/* Go to previous page */}
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-700 px-5 py-2 rounded"
        >
          Previous
        </button>

        {/* Go to next page */}
        <button
          onClick={() => navigate(1)}
          className="bg-green-700 px-5 py-2 rounded"
        >
          Next
        </button>

      </div>

    </div>
  );
};

export default About;