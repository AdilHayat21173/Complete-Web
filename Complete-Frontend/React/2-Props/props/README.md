# 💼 React Job Cards — Props Practice

A simple React project built to understand **React Props**, **component reusability**, and how to pass data from a parent component to a child component.

In this project, I created a reusable **Job Card component** and used an array of job objects to display multiple job openings dynamically.

## 📸 Project Preview

![React Job Cards](./assets/card.png)

---

## 🎯 Project Purpose

The main purpose of this project is to practice:

* React Components
* React Props
* Passing data between components
* JavaScript Objects
* JavaScript Arrays
* `.map()` method
* Reusable components
* Dynamic rendering

---

## 🧠 Understanding Props

**Props** stands for **Properties**.

Props are used to pass data from a **parent component** to a **child component**.

For example, in `App.jsx`:

```jsx
<Card user="Adil" />
```

The `user` value is passed to the `Card` component.

We can receive it inside `Card.jsx`:

```jsx
const Card = (props) => {
  return <h1>{props.user}</h1>;
};
```

Here:

```text
Parent Component
      ↓
   App.jsx
      ↓
<Card user="Adil" />
      ↓
 Child Component
      ↓
   Card.jsx
      ↓
   props.user
```

### Important

`props` is not a JavaScript keyword.

It is simply the commonly used name for the object that contains the values passed to a React component.

For example, this also works:

```jsx
const Card = (data) => {
  return <h1>{data.user}</h1>;
};
```

But `props` is the standard naming convention.

---

## 📦 Passing Multiple Props

We can pass multiple values to a component:

```jsx
<Card
  companyName="Google"
  post="Software Engineer"
  pay="$45/hour"
/>
```

Inside the `Card` component:

```jsx
const Card = (props) => {
  return (
    <div>
      <h2>{props.companyName}</h2>
      <h3>{props.post}</h3>
      <p>{props.pay}</p>
    </div>
  );
};
```

Each value can be accessed using:

```jsx
props.companyName
props.post
props.pay
```

---

# 📊 Using an Array of Objects

Instead of creating each job card manually, I created an array containing multiple job objects.

```jsx
const jobOpenings = [
  {
    companyName: "Google",
    post: "Software Engineer",
    pay: "$45/hour",
  },
  {
    companyName: "Microsoft",
    post: "AI Engineer",
    pay: "$55/hour",
  },
];
```

Each object represents one job opening.

For example:

```jsx
{
  companyName: "Google",
  post: "Software Engineer",
  pay: "$45/hour"
}
```

This contains the information needed to create one job card.

---

# 🔄 Rendering Cards Using `.map()`

We can use JavaScript's `.map()` method to loop through the `jobOpenings` array.

```jsx
{jobOpenings.map((job, index) => (
  <Card
    key={index}
    companyName={job.companyName}
    post={job.post}
    pay={job.pay}
  />
))}
```

The `.map()` method creates a new `Card` component for every object in the array.

For example:

```text
jobOpenings
     ↓
   .map()
     ↓
 ┌───────────────┐
 │ Google        │
 │ Software Eng. │
 └───────────────┘

 ┌───────────────┐
 │ Microsoft     │
 │ AI Engineer   │
 └───────────────┘
```

---

# 🃏 Job Card Component

The `Card` component is reusable.

Instead of writing the HTML for every job separately, we create the card once:

```jsx
const Card = (props) => {
  return (
    <div className="card">
      <div className="top">
        <img
          src={props.brandLogo}
          alt={props.companyName}
        />

        <button>
          Save
          <i className="ri-bookmark-line"></i>
        </button>
      </div>

      <div className="center">
        <h3>
          {props.companyName}
          <span>{props.datePosted}</span>
        </h3>

        <h2>{props.post}</h2>

        <div className="tag">
          <h4>{props.tag1}</h4>
          <h4>{props.tag2}</h4>
        </div>
      </div>

      <div className="bottom">
        <div>
          <h3>{props.pay}</h3>
          <p>{props.location}</p>
        </div>

        <button>Apply now</button>
      </div>
    </div>
  );
};
```

The same component can display different companies because the data comes through props.

---

# 🏢 Job Data

Each job object contains:

| Property      | Description             |
| ------------- | ----------------------- |
| `brandLogo`   | Company logo            |
| `companyName` | Company name            |
| `datePosted`  | Date the job was posted |
| `post`        | Job title               |
| `tag1`        | Job type                |
| `tag2`        | Experience level        |
| `pay`         | Salary per hour         |
| `location`    | Job location            |

Example:

```jsx
{
  brandLogo: "company-logo-url",
  companyName: "Google",
  datePosted: "5 days ago",
  post: "Software Engineer",
  tag1: "Full Time",
  tag2: "Junior Level",
  pay: "$45/hour",
  location: "Mountain View, USA"
}
```

---

# 🔁 Data Flow

The complete data flow of the project is:

```text
        App.jsx
           │
           │
           ▼
    jobOpenings Array
           │
           │
           ▼
        .map()
           │
           │
           ▼
     <Card props />
           │
           │
           ▼
       Card.jsx
           │
           │
           ▼
     Job Card UI
```

The **parent component (`App`)** owns the job data and passes it to the **child component (`Card`)** through props.

---

# ✨ Features

* Responsive job card layout
* Reusable React Card component
* Dynamic job data
* Company logos
* Job title and company information
* Job type and experience tags
* Salary and location
* Save button
* Apply Now button
* Multiple cards generated using `.map()`

---

# 🛠️ Technologies Used

* **React**
* **JavaScript**
* **JSX**
* **CSS**
* **React Props**
* **JavaScript Arrays**
* **JavaScript Objects**
* **Array `.map()`**
* **Remix Icon**

---

# 📁 Project Structure

```text
project/
│
├── src/
│   ├── components/
│   │   └── Card.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── assets/
│   └── card.png
│
├── public/
│
├── package.json
└── README.md
```

---

# 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

### 3. Open the application

Open the local URL provided by Vite in your browser.

---

# 📚 What I Learned

Through this project, I learned how to:

1. Create reusable React components.
2. Pass data using props.
3. Access props using `props.propertyName`.
4. Store related data inside objects.
5. Store multiple objects inside an array.
6. Use `.map()` to render multiple components.
7. Create dynamic UI instead of hardcoding every card.
8. Reuse the same component with different data.

---

# 📝 Key Concept

The main concept practiced in this project is:

```jsx
<Card companyName="Google" />
```

and accessing the value inside the child component:

```jsx
props.companyName
```

When multiple objects are involved, `.map()` allows us to pass each object's data to the reusable component:

```jsx
jobOpenings.map((job) => (
  <Card
    companyName={job.companyName}
    post={job.post}
  />
))
```

This is one of the basic and important patterns for building **reusable and dynamic React applications**.

---

## 👨‍💻 Learning Project

This project was created as part of my **React learning journey**, with a focus on understanding **Props, reusable components, arrays, objects, and dynamic rendering**.
