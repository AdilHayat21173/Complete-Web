import { useDispatch } from "react-redux";
import { removeCollection, removeToast } from "../features/CollectionSlice";

const CollectionCard = ({ item }) => {
  const dispatch=useDispatch()

  const removefromcollection=(item)=>{
    dispatch(removeCollection(item.id))
    dispatch(removeToast())
  }
  return (
    <div className="w-[18vw] h-80 bg-white rounded relative overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">

      {/* Media */}
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        {item.type === "photo" && (
          <img
            src={item.src}
            alt={item.title || "Photo"}
            className="w-full h-full object-cover"
          />
        )}

        {item.type === "video" && (
          <video
            src={item.src}
            poster={item.thumbnail}
            controls
            className="w-full h-full object-cover"
          />
        )}

        {item.type === "gif" && (
          <img
            src={item.src}
            alt={item.title || "GIF"}
            className="w-full h-full object-cover"
          />
        )}
      </a>

      {/* Bottom section */}
      <div className="absolute bottom-0 left-0 w-full h-[30%] px-4 flex items-center justify-between gap-3 bg-black/50">

        {/* Title */}
        <h2 className="flex-1 min-w-0 text-lg font-semibold capitalize leading-snug line-clamp-2 text-white">
          {item.title || "Untitled"}
        </h2>

        {/* Remove Button */}
        <button  onClick={()=>{
          removefromcollection(item)
        }}
        className="shrink-0 bg-cyan-900 text-white py-2 px-4 rounded font-medium hover:bg-cyan-800 transition">
          Remove
        </button>

      </div>

    </div>
  );
};

export default CollectionCard;