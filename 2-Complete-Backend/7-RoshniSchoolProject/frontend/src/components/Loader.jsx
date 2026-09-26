// src/components/Loader.jsx
export default function Loader({ label = "Loading..." }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#8B8058]">
      <p className="text-[#F8F5E9] text-lg font-medium">{label}</p>
    </div>
  );
}
