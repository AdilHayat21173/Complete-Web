import { createSlice } from "@reduxjs/toolkit";
import { toast, Bounce } from "react-toastify";

const initialState = {
  items: JSON.parse(localStorage.getItem("collection")) || [],
};

const collectionSlice = createSlice({
  name: "collection",
  initialState,

  reducers: {
    addCollection: (state, action) => {
      const alreadyExists = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (!alreadyExists) {
        state.items.push(action.payload);

        localStorage.setItem(
          "collection",
          JSON.stringify(state.items)
        );
      }
    },

    removeCollection: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );

      localStorage.setItem(
        "collection",
        JSON.stringify(state.items)
      );
    },

    clearCollection: (state) => {
      state.items = [];

      localStorage.removeItem("collection");
    },

    addToast: () => {
      toast.success("Added to collection", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    },

    removeToast: () => {
      toast.error("Removed from collection", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    },
  },
});

export const {
  addCollection,
  removeCollection,
  clearCollection,
  addToast,
  removeToast,
} = collectionSlice.actions;

export default collectionSlice.reducer;