import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../features/searchSlice";

const Tabs = () => {
  const tabs = [
    { label: "Photos", value: "photos" },
    { label: "Videos", value: "videos" },
    { label: "GIFs", value: "gifs" },
  ];

  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.search.activeTab);

  return (
    <div className="flex gap-10 justify-center py-5">
      {tabs.map(({ label, value }) => (
        <button
          key={value}
          className={`border-2 px-6 py-3 text-xl rounded cursor-pointer active:scale-95 ${
            activeTab === value ? "bg-emerald-500" : "bg-gray-300"
          }`}
          onClick={() => dispatch(setActiveTab(value))}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;