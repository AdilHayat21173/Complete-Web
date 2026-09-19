# Roshni Public School

A simple React-based school website built to practice **React Router**, navigation, reusable components, and Tailwind CSS.

## 🚀 Features

* Responsive navigation bar
* Roshni Public School branding
* Home page
* About page
* Contact page
* React Router navigation
* `NavLink` for navigation links
* `useNavigate()` for programmatic navigation
* Return to Home button
* Previous page navigation
* Next page navigation
* Browser Back and Forward support
* Reusable Navbar and Footer components
* Tailwind CSS styling

## 🛠️ Technologies Used

* React.js
* React Router DOM
* Tailwind CSS
* JavaScript
* Vite

## 📁 Project Structure

```text
src/
│
├── Components/
│   ├── Navbar.jsx
│   └── Footer.jsx
│
├── Pages/
│   ├── Home.jsx
│   ├── About.jsx
│   └── Contact.jsx
│
├── App.jsx
├── main.jsx
└── index.css
```

## 📌 Routes

| Page    | Route      |
| ------- | ---------- |
| Home    | `/`        |
| About   | `/about`   |
| Contact | `/contact` |

## 🧭 Navigation

The project uses `react-router-dom` for client-side navigation.

### NavLink

The Navbar uses `NavLink` instead of normal HTML `<a>` tags:

```jsx
<NavLink to="/">Home</NavLink>
<NavLink to="/about">About</NavLink>
<NavLink to="/contact">Contact Us</NavLink>
```

This allows React Router to change pages without completely reloading the website.

## 🔀 Programmatic Navigation

The About page uses `useNavigate()`:

```jsx
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();
```

### Return Home

```jsx
navigate("/");
```

This takes the user directly to the Home page.

### Previous Page

```jsx
navigate(-1);
```

This goes one step backward in the browser history.

### Next Page

```jsx
navigate(1);
```

This goes one step forward **only when a forward history entry exists**.

For a fixed Next button, you can navigate directly to the next route:

```jsx
navigate("/contact");
```

## 🔙 Browser Back & Forward

React Router works with the browser history.

For example:

```text
Home → About → Contact
```

If the user clicks the browser Back button:

```text
Contact → About
```

Clicking Back again:

```text
About → Home
```

The Forward button can then move forward through the existing history.

## 🧩 Reusable Components

### Navbar

The Navbar contains the website name and navigation links:

```text
Roshni Public School

Home    About    Contact Us
```

### Footer

The Footer is displayed at the bottom of the application and contains the school copyright information.

## ⚙️ Installation

Clone the project and install dependencies:

```bash
npm install
```

Install React Router:

```bash
npm install react-router-dom
```

Start the development server:

```bash
npm run dev
```

The application will be available through the local Vite development URL.

## 📚 What I Learned

Through this project, I practiced:

* React components
* Props and component structure
* React Router
* `BrowserRouter`
* `Routes`
* `Route`
* `NavLink`
* `useNavigate`
* Browser history navigation
* Previous and Next navigation
* Tailwind CSS
* Reusable Navbar and Footer components

## 👨‍💻 Author

**Adil Hayat**

Software Engineer | React & AI Developer

---

⭐ This project was created as a learning project to practice React routing and navigation.
