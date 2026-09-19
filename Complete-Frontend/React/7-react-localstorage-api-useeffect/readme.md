# React: Local Storage, API Calls & useEffect

This README explains three important React concepts:

* Local Storage
* API Calls using `fetch` and `axios`
* `useEffect` and dependency arrays

---

## 1. Local Storage

**Local Storage** is used to store data in the browser.

The data remains saved even after refreshing or closing the browser.

### Save data

```js
localStorage.setItem("name", "Adil");
```

### Get data

```js
const name = localStorage.getItem("name");
console.log(name);
```

### Remove data

```js
localStorage.removeItem("name");
```

### Remove everything

```js
localStorage.clear();
```

### Example

```js
localStorage.setItem("username", "Adil");

const username = localStorage.getItem("username");

console.log(username);
```

---

## 2. API Calls in React

An **API call** is used when our React application needs data from a server.

For example:

```text
React App → API → Server → Data → React App
```

Two common ways to make API calls are:

1. `fetch()`
2. `axios`

---

## 3. Fetch

`fetch()` is built into JavaScript, so we don't need to install anything.

### Example

```js
fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });
```

---

## 4. Axios

Axios is a third-party library used for making API requests.

Install it:

```bash
npm install axios
```

Example:

```js
import axios from "axios";

axios
  .get("https://jsonplaceholder.typicode.com/users")
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error);
  });
```

### Fetch vs Axios

| Fetch                      | Axios                                   |
| -------------------------- | --------------------------------------- |
| Built into JavaScript      | External library                        |
| No installation required   | Need to install                         |
| Requires `response.json()` | Automatically handles JSON              |
| Simple                     | More convenient for larger applications |

---

# 5. useEffect

`useEffect` is a React Hook used when we want to perform a **side effect** in a component.

Common examples:

* Calling an API
* Using Local Storage
* Setting a timer
* Adding event listeners
* Updating something outside React

Import it:

```js
import { useEffect } from "react";
```

Basic example:

```js
useEffect(() => {
  console.log("useEffect is running");
});
```

Without a dependency array, the effect can run after **every render**.

---

# 6. useEffect and Mounting

When a React component is created and displayed for the first time, this is called **mounting**.

If we want an effect to run only when the component mounts, use an empty dependency array:

```js
useEffect(() => {
  console.log("Component mounted");
}, []);
```

### Important

The empty array:

```js
[]
```

means:

> Run this effect once after the initial render.

For example, this is commonly used for an API call:

```js
useEffect(() => {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}, []);
```

---

# 7. Dependency Array

The dependency array tells React **when the effect should run again**.

Example:

```js
useEffect(() => {
  console.log("Effect running");
}, [num1]);
```

Here, `num1` is a dependency.

The effect runs:

1. After the initial render
2. Again whenever `num1` changes

Example:

```js
const [num1, setNum1] = useState(0);

useEffect(() => {
  console.log("num1 changed");
}, [num1]);
```

If:

```js
setNum1(1);
```

the effect runs because `num1` changed.

If:

```js
setNum1(2);
```

the effect runs again.

---

# 8. Different Dependency Array Cases

### No dependency array

```js
useEffect(() => {
  console.log("Effect");
});
```

Runs after **every render**.

---

### Empty dependency array

```js
useEffect(() => {
  console.log("Effect");
}, []);
```

Runs once after the component's initial render.

---

### Dependency

```js
useEffect(() => {
  console.log("Effect");
}, [num1]);
```

Runs after the initial render and whenever `num1` changes.

---

### Multiple dependencies

```js
useEffect(() => {
  console.log("Effect");
}, [num1, name]);
```

Runs when either `num1` or `name` changes.

---

# 9. API Call + useEffect

A very common React pattern is:

```js
import { useEffect } from "react";

function App() {

  useEffect(() => {

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });

  }, []);

  return (
    <div>
      <h1>Users</h1>
    </div>
  );
}

export default App;
```

Here:

```text
Component renders
       ↓
useEffect runs
       ↓
API request
       ↓
Server sends data
       ↓
React can use the data
```

---

# 10. Quick Summary

### Local Storage

Used to store data in the browser.

```js
localStorage.setItem()
localStorage.getItem()
localStorage.removeItem()
```

### Fetch

Used to make API requests without installing another library.

```js
fetch(url)
```

### Axios

A library that makes API requests easier.

```js
axios.get(url)
```

### useEffect

Used for side effects such as API calls, timers, and Local Storage operations.

```js
useEffect(() => {
  // side effect
}, []);
```

### Dependency Array

Controls when the effect runs.

```js
useEffect(() => {}, []);
```

**`[]` → run once after initial render**

```js
useEffect(() => {}, [num1]);
```

**`[num1]` → run when `num1` changes**

```js
useEffect(() => {});
```

**No array → run after every render**

---

## Main Idea

```text
React Component
      ↓
    Render
      ↓
   useEffect
      ↓
 ┌────┴─────┐
 ↓          ↓
API       Local Storage
 ↓          ↓
Data      Saved Data
      ↓
   Update UI
```
