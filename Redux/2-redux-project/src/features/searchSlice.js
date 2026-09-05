import { createSlice } from "@reduxjs/toolkit";

const SearchSlice = createSlice({
  name: "search",

  initialState: {
    query: "",
    activeTab: "photos",
    results: [],
    isLoading: false,
    error: null,
  },

  reducers: {
    // Update search query
    setQuery(state, action) {
      state.query = action.payload;
    },

    // Change active tab
    setActiveTab(state, action) {
      state.activeTab = action.payload;
    },

    // Store API results
    setResults(state, action) {
      state.results = action.payload;
      state.isLoading = false;
    },

    // Set loading state
    setIsLoading(state, action) {
    state.isLoading = action.payload;
    if (action.payload) {
      state.error = null;
    }
  },

    // Store error
    setError(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },

   
    //clear results
    clearResults(state) {
      state.results = [];
    }
  },
});

export const {
  setQuery,
  setActiveTab,
  setResults,
  setIsLoading,
  setError,
  clearResults
} = SearchSlice.actions;

export default SearchSlice.reducer;