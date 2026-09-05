# MediaSearch

MediaSearch is a React application for searching photos, videos, and GIFs from one interface. Users can change the media type with tabs, view the returned results, save useful items to a personal collection, and remove or clear saved items later.

## Features

- Search for media using a text query.
- Search Unsplash photos, Pexels videos, and GIPHY GIFs.
- Switch between Photos, Videos, and GIFs without leaving the page.
- Show loading and error states while a search request is running.
- Add results to a collection and prevent duplicate items.
- Persist the collection in browser `localStorage`.
- View and clear the saved collection on a separate route.
- Display success and removal notifications with React Toastify.

## What This Project Teaches

This project is built to practice the core Redux Toolkit workflow in a real React application:

- Creating slices with `createSlice`.
- Keeping search query, active tab, results, loading state, and errors in Redux.
- Dispatching actions from form and tab components.
- Reading shared state with `useSelector`.
- Connecting Redux to React with the `Provider` component.
- Configuring multiple reducers with `configureStore`.
- Loading data when Redux values change with `useEffect`.
- Normalizing different API response formats into one common result shape.
- Persisting Redux collection data in `localStorage`.
- Using React Router for Search and Collection pages.
- Handling asynchronous API requests with Axios.

## How It Works

1. The user submits a search from `SearchBox`.
2. The query is saved in the `search` Redux slice.
3. `ResultGrid` watches the query and active tab.
4. The matching function in `api/mediaApi.js` requests data from Unsplash, Pexels, or GIPHY.
5. The response is converted to a common media object containing values such as `id`, `type`, `title`, `thumbnail`, `src`, and `url`.
6. The normalized results are stored in Redux and rendered by `ResultCard`.
7. Collection actions save or remove items and synchronize the collection with `localStorage`.

## Tech Stack

- React 19
- Vite
- Redux Toolkit and React Redux
- React Router
- Axios
- Tailwind CSS
- React Toastify
- Unsplash API
- Pexels API
- GIPHY API

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure API keys

Create a `.env` file in the project root and add your own API keys:

```env
VITE_UNSPLASH_API_KEY=your_unsplash_api_key
VITE_PEXELS_API_KEY=your_pexels_api_key
VITE_GIPHY_API_KEY=your_giphy_api_key
```

Do not commit real API keys to source control. The `.env` file should remain ignored by Git.

### 3. Start the development server

```bash
npm run dev
```

Open the local URL shown by Vite in your browser.

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Create a production build. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Check the project with ESLint. |

## Project Structure

```text
src/
├── api/
│   └── mediaApi.js              # Unsplash, Pexels, and GIPHY requests
├── Components/
│   ├── CollectionCard.jsx       # Displays a saved media item
│   ├── Navbar.jsx               # Application navigation
│   ├── ResultCard.jsx           # Displays one search result
│   ├── ResultGrid.jsx           # Fetches and renders search results
│   ├── SearchBox.jsx            # Search form
│   └── Tabs.jsx                 # Media type selector
├── features/
│   ├── CollectionSlice.js       # Saved collection state and actions
│   └── searchSlice.js           # Search state and actions
├── pages/
│   ├── CollectionPages.jsx      # Collection route
│   └── HomePage.jsx             # Search route
├── redux/
│   └── store.js                 # Redux store configuration
├── App.jsx                      # Routes and shared application layout
└── main.jsx                     # React, Redux, and Router entry point
```

## Routes

- `/` - Search for photos, videos, and GIFs.
- `/collection` - View and manage saved media.

## Development Notes

- API keys use the `VITE_` prefix because they are read through `import.meta.env` by Vite.
- API credentials used in a browser application can be visible to users. For a production application, API requests should be moved behind a server or serverless endpoint when the provider supports it.
- The three media services return different response structures, so `ResultGrid` maps them into a shared structure before rendering.
- The collection is restored from `localStorage` when the Redux slice is initialized, so saved items remain after refreshing the page in the same browser.
