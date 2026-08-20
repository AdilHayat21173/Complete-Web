# React Functions, Event Handling, Hooks & State Management

This project focuses on understanding **functions, event handling, React Hooks, and state management in React.js**.

The main goal is to understand how functions are created and used in React, how React handles user events, and how state is created and updated using `useState`.

---

## 📌 Topics Covered

### Functions & Event Handling

* Functions in React
* Function Declaration
* Function Call
* Passing Functions to Events
* Inline Functions
* Arrow Functions
* `onClick`
* `onMouseEnter`
* `onDoubleClick`
* `onChange`
* React Event Object
* `event.target.value`

### React Hooks

* Introduction to React Hooks
* `useState`
* `useEffect`
* `useRef`
* `useContext`
* `useReducer`
* `useMemo`
* `useCallback`

### State Management Basics

* `useState` Deep Dive
* Creating State
* Updating State
* Updating Objects
* Updating Arrays
* Immutability
* Functional State Updates
* Batch Updates
* Event Handling with State
* Mini Project: Counter App

---

# 🔹 React Functions

A function in a React component can be used to perform an action.

```jsx
function handleClick() {
  console.log("Clicked");
}
```

The function can then be passed to an event handler:

```jsx
<button onClick={handleClick}>
  Click Here
</button>
```

When the button is clicked, React calls the `handleClick` function.

---

# 🔹 Function vs Function Call

This is an important concept in React.

### Passing a Function

```jsx
<button onClick={handleClick}>
  Click
</button>
```

Here, we pass the function to React.

### Calling a Function

```jsx
handleClick();
```

Here, the function is called immediately.

### Important

```jsx
onClick={handleClick}    // ✅ Correct

onClick={handleClick()}  // ❌ Calls immediately
```

Use `()` when you want to **call a function**.

Don't use `()` when passing the function directly to a React event handler.

---

# 🖱️ onClick

`onClick` is used when we want to execute a function when the user clicks an element.

```jsx
function handleClick() {
  console.log("Button Clicked");
}

<button onClick={handleClick}>
  Click Here
</button>
```

---

# 🔹 Inline Function

We can also write a function directly inside `onClick`.

```jsx
<button
  onClick={function () {
    console.log("Explored");
  }}
>
  Explore Here
</button>
```

---

# ➡️ Arrow Function

We can use an arrow function as an event handler.

```jsx
<button
  onClick={() => {
    console.log("Explored");
  }}
>
  Explore Here
</button>
```

Arrow functions are also useful when we need to pass arguments.

```jsx
function greet(name) {
  console.log("Hello", name);
}

<button onClick={() => greet("Adil")}>
  Greet
</button>
```

---

# 🖱️ onMouseEnter

`onMouseEnter` runs when the mouse pointer enters an element.

```jsx
function handleMouseEnter() {
  console.log("Mouse Enter");
}

<button onMouseEnter={handleMouseEnter}>
  Move Mouse Here
</button>
```

---

# 🖱️ onDoubleClick

`onDoubleClick` runs when the user double-clicks an element.

```jsx
function handleDoubleClick() {
  console.log("Double Clicked");
}

<button onDoubleClick={handleDoubleClick}>
  Double Click
</button>
```

---

# ⌨️ onChange

`onChange` is commonly used with input fields.

```jsx
function handleChange(event) {
  console.log(event.target.value);
}

<input
  onChange={handleChange}
  type="text"
  placeholder="Enter Name"
/>
```

## Event Object

React passes an **event object** to the function.

```jsx
event.target.value
```

* `event` → contains information about the event
* `event.target` → the element that triggered the event
* `event.target.value` → the current input value

For example, when the user types:

```text
Adil
```

`event.target.value` will contain the current input value.

---

# ⚛️ React Hooks

React Hooks allow functional components to use React features such as state and other functionality.

Some commonly used Hooks are:

| Hook          | Purpose                              |
| ------------- | ------------------------------------ |
| `useState`    | Manage component state               |
| `useEffect`   | Handle side effects                  |
| `useRef`      | Store values and access DOM elements |
| `useContext`  | Share data between components        |
| `useReducer`  | Manage complex state                 |
| `useMemo`     | Optimize expensive calculations      |
| `useCallback` | Optimize function references         |

---

# 🔹 useState

`useState` is used to create and manage state in a React component.

```jsx
import { useState } from "react";

const [count, setCount] = useState(3);
```

Here:

* `count` → current state value
* `setCount` → function used to update the state
* `3` → initial value

Example:

```jsx
import { useState } from "react";

function App() {
  const [count, setCount] = useState(3);

  function increase() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>{count}</h1>

      <button onClick={increase}>
        Increase
      </button>
    </div>
  );
}

export default App;
```

The value changes:

```text
3 → 4 → 5 → 6 → 7
```

When state changes, React re-renders the component and displays the updated value.

---

# 🔹 Updating Objects

When using objects in state, we should not directly modify the object.

```jsx
const [user, setUser] = useState({
  name: "Adil",
  age: 22
});
```

### ❌ Don't do this

```jsx
user.age = 23;
```

### ✅ Do this

```jsx
setUser({
  ...user,
  age: 23
});
```

The spread operator creates a new object while keeping the existing properties.

---

# 🔹 Updating Arrays

For arrays, create a new array instead of directly modifying the existing array.

```jsx
const [items, setItems] = useState([
  "Apple",
  "Banana"
]);
```

### Add an item

```jsx
setItems([...items, "Mango"]);
```

### ❌ Don't do this

```jsx
items.push("Mango");
```

---

# 🔹 Immutability

**Immutability means we don't directly modify the existing state.**

Instead, we create a new value and pass it to the state setter.

### Object

```jsx
setUser({
  ...user,
  age: 23
});
```

### Array

```jsx
setItems([
  ...items,
  "Mango"
]);
```

This allows React to correctly detect the state change and update the UI.

---

# 🔹 Functional State Updates

When the new state depends on the previous state, use a functional update.

```jsx
setCount((prev) => prev + 1);
```

For example:

```jsx
function increaseThreeTimes() {
  setCount((prev) => prev + 1);
  setCount((prev) => prev + 1);
  setCount((prev) => prev + 1);
}
```

This correctly applies all three updates.

```text
0 → 1 → 2 → 3
```

---

# 🔹 Batch Updates

React can batch multiple state updates together.

For example, this:

```jsx
setCount(count + 1);
setCount(count + 1);
setCount(count + 1);
```

does not mean React will necessarily increment the value three times because all updates are based on the same current `count`.

When the next state depends on the previous state, use:

```jsx
setCount((prev) => prev + 1);
```

This is the safer and recommended approach for sequential state updates.

---

# 🎯 Mini Project: Counter App

The Counter App combines:

* `useState`
* Functions
* Event handling
* Functional state updates
* State management

```jsx
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  function increase() {
    setCount((prev) => prev + 1);
  }

  function decrease() {
    setCount((prev) => prev - 1);
  }

  function reset() {
    setCount(0);
  }

  return (
    <div>
      <h1>Counter App</h1>

      <h2>{count}</h2>

      <button onClick={increase}>
        +
      </button>

      <button onClick={decrease}>
        -
      </button>

      <button onClick={reset}>
        Reset
      </button>
    </div>
  );
}

export default App;
```

### Counter Flow

```text
User clicks button
       ↓
Event Handler runs
       ↓
Function executes
       ↓
setCount() updates state
       ↓
React re-renders
       ↓
Updated count appears
```

---

# 📂 Complete React Event Example

```jsx
const App = () => {

  function handleClick() {
    console.log("Clicked");
  }

  function handleMouseEnter() {
    console.log("Mouse Enter");
  }

  function handleDoubleClick() {
    console.log("Double Clicked");
  }

  function handleChange(event) {
    console.log(event.target.value);
  }

  return (
    <div>

      <button onClick={handleClick}>
        Click Here
      </button>

      <button
        onClick={() => {
          console.log("Explored");
        }}
      >
        Explore Here
      </button>

      <button onMouseEnter={handleMouseEnter}>
        Mouse Enter
      </button>

      <button onDoubleClick={handleDoubleClick}>
        Double Click
      </button>

      <input
        onChange={handleChange}
        type="text"
        placeholder="Enter Name"
      />

    </div>
  );
};

export default App;
```

---

# 📚 React Event Summary

| Event           | When it runs                |
| --------------- | --------------------------- |
| `onClick`       | When the user clicks        |
| `onMouseEnter`  | When the mouse enters       |
| `onDoubleClick` | When the user double-clicks |
| `onChange`      | When an input value changes |

---

# 🛠️ Technologies

* React.js
* JavaScript
* JSX
* React Hooks
* Vite

---

# 🎯 Learning Goal

The goal of this project is to understand how **React functions, events, Hooks, and state management work together**.

The main concept is:

```text
Function
   ↓
Event
   ↓
State Update
   ↓
setState()
   ↓
React Re-render
   ↓
Updated UI
```
