import { useState } from "react";
import axios from "axios";

function App() {
  const [page, setPage] = useState("home");

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Content */}
      <main className="max-w-5xl mx-auto p-8">

        {/* =========================
            HOME
        ========================= */}

        {page === "home" && (
          <div className="text-center py-20">

            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Welcome to Post App
            </h2>

            <p className="text-gray-600 mb-8">
              Create and view your posts.
            </p>

            <div className="flex justify-center gap-4">

              <button
                onClick={() => setPage("posts")}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                View Posts
              </button>

              <button
                onClick={() => setPage("create")}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
              >
                Create Post
              </button>

            </div>

          </div>
        )}

        {/* =========================
            POSTS
        ========================= */}

        {page === "posts" && <Posts setPage={setPage} />}

        {/* =========================
            CREATE POST
        ========================= */}

        {page === "create" && <CreatePost setPage={setPage} />}

      </main>

    </div>
  );
}


// =========================
// VIEW POSTS
// =========================

function Posts({ setPage }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPosts = async () => {
    try {

      setLoading(true);

      const response = await axios.get(
        "http://localhost:3000/posts"
      );

      setPosts(response.data.posts);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  return (
    <div>

      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        {/* Back Button */}
        <button
          onClick={() => setPage("home")}
          className="bg-gray-600 text-white px-5 py-2 rounded-lg hover:bg-gray-700"
        >
          ← Back
        </button>

        <h2 className="text-3xl font-bold text-gray-800">
          All Posts
        </h2>

        <button
          onClick={getPosts}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          {loading ? "Loading..." : "Load Posts"}
        </button>

      </div>


      {/* Posts */}
      {posts.length === 0 ? (

        <div className="bg-white p-10 rounded-xl text-center shadow">
          <p className="text-gray-500">
            No posts found.
          </p>
        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {posts.map((post) => (

            <div
              key={post._id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition"
            >

              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-64 object-contain rounded-lg bg-gray-100"
              />

              <div className="p-5">

                <p className="text-gray-800 font-medium">
                  {post.caption}
                </p>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}


// =========================
// CREATE POST
// =========================

function CreatePost({ setPage }) {

  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const createPost = async (e) => {

    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append("image", image);
      formData.append("caption", caption);

      const response = await axios.post(
        "http://localhost:3000/posts",
        formData
      );

      console.log(response.data);

      alert("Post created successfully!");

      setImage(null);
      setCaption("");

      e.target.reset();

    } catch (error) {

      console.log(error);

      alert("Failed to create post");

    } finally {

      setLoading(false);

    }
  };


  return (

    <div className="max-w-xl mx-auto">

      {/* Back Button */}
      <button
        onClick={() => setPage("home")}
        className="mb-6 bg-gray-600 text-white px-5 py-2 rounded-lg hover:bg-gray-700"
      >
        ← Back
      </button>

      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        Create Post
      </h2>

      <form
        onSubmit={createPost}
        className="bg-white p-6 rounded-xl shadow-md"
      >

        {/* Image */}
        <div className="mb-6">

          <label className="block text-gray-700 font-medium mb-2">
            Select Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(e.target.files[0])
            }
            className="w-full border border-gray-300 rounded-lg p-3"
          />

        </div>


        {/* Caption */}
        <div className="mb-6">

          <label className="block text-gray-700 font-medium mb-2">
            Caption
          </label>

          <textarea
            placeholder="Write your caption..."
            value={caption}
            onChange={(e) =>
              setCaption(e.target.value)
            }
            rows="4"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>


        {/* Create Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-400"
        >
          {loading ? "Creating..." : "Create Post"}
        </button>

      </form>

    </div>

  );
}


export default App;