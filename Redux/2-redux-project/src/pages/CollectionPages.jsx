
import { useSelector ,useDispatch} from 'react-redux'
import CollectionCard from '../Components/CollectionCard'
import { clearCollection } from "../features/CollectionSlice";




function CollectionPages() {
  const collection =useSelector(state => state.collection.items)
  const dispatch = useDispatch();


   return (
    <div className="overflow-auto px-10 py-6">

      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-medium">
          Your Collection
        </h2>

        <button
          onClick={() => dispatch(clearCollection())}
          className="active:scale-95 transition cursor-pointer bg-red-600 px-8 py-3 text-lg font-medium rounded"
        >
          Clear Collection
        </button>
      </div>

      <div className="flex justify-start w-full flex-wrap gap-6">
        {collection.map((item, idx) => {
          return (
            <div key={idx}>
              <CollectionCard item={item} />
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default CollectionPages
