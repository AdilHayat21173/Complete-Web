# Roshni Public School — Frontend

React (Vite) + Tailwind. Talks to the backend at `http://localhost:3000`.

## Folder structure

```
frontend/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── src/
    ├── main.jsx              entry point — Router + AuthProvider
    ├── App.jsx                all routes + role-based access rules
    ├── index.css
    │
    ├── api/                   one file per backend module — nothing else
    │   ├── axiosClient.js     shared axios instance, attaches the JWT automatically
    │   ├── auth.api.js
    │   ├── fee.api.js
    │   ├── result.api.js
    │   └── dashboard.api.js
    │
    ├── context/
    │   └── AuthContext.jsx    global login state: user, role, login(), logout()
    │
    ├── components/            reusable pieces used across pages
    │   ├── Layout.jsx         Sidebar + header wrapper
    │   ├── Sidebar.jsx        nav links, shown/hidden based on role
    │   ├── ProtectedRoute.jsx gate a route behind login + role check
    │   └── Loader.jsx
    │
    └── pages/                 one full screen each
        ├── Login.jsx
        ├── Register.jsx
        ├── Dashboard.jsx      admin only
        ├── FeeSystem.jsx      admin only
        ├── ResultSystem.jsx   admin + teacher
        └── NotFound.jsx
```

**Rule of thumb:** `components/` = pieces used *inside* pages (a sidebar,
a route guard); `pages/` = a full screen you navigate to.

## How access control works here

`App.jsx` wraps each route in `<ProtectedRoute allowedRoles={[...]}>`.
`ProtectedRoute` checks `AuthContext`'s current user:
- Not logged in → redirect to `/login`.
- Logged in but wrong role → shows an "Access Denied" message instead of
  the page.
- Logged in with the right role → renders the page.

`Sidebar.jsx` separately hides links the user isn't allowed to see, so a
teacher never even sees a "Dashboard" or "Fee System" link to click.

Both checks read from the same place (`user.role` in `AuthContext`), so
there's only one source of truth for "who can see what."

## Setup

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`. Make sure the backend is running at
`http://localhost:3000` first (see the backend's own README).

## First login

Since public registration always creates a `teacher` account, log in as
the admin you created with the backend's `createFirstAdmin.js` script.
From there, promote other accounts via `PATCH /auth/users/:id/role` (no
UI for this yet — it's a fast follow if you want an admin screen for it).

## Notes

- The API base URL is hardcoded in `src/api/axiosClient.js`
  (`http://localhost:3000`). Change it there when you deploy.
- The JWT is stored in `localStorage` and attached to every request via
  an axios interceptor — works whether or not cookies survive across
  origins in production.
- Tailwind classes reuse the same color palette as your original mockup
  (`#5A5034`, `#F8F5E9`, `#FF6500`, `#8B8058`) so it should feel visually
  consistent if you already had a look you liked.
