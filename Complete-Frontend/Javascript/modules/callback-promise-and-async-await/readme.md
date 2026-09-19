# Callbacks, Promises, and Async/Await

JavaScript uses **asynchronous programming** for tasks that take time, such as timers, API requests, and fetching data.

---

## 1. Synchronous JavaScript

**Synchronous** code runs line by line. Each line waits for the previous line to finish.

```javascript
console.log("Start");
console.log("Hello");
console.log("End");
````

Output:

```text
Start
Hello
End
```

> **Synchronous = One task at a time.**

---

## 2. Asynchronous JavaScript

**Asynchronous** code allows a task to take time while JavaScript continues running other code.

```javascript
console.log("Start");

setTimeout(() => {
    console.log("Finished");
}, 2000);

console.log("End");
```

Output:

```text
Start
End
Finished
```

`setTimeout()` waits for 2 seconds, but JavaScript does not stop the rest of the code.

> **Asynchronous = Start a task and continue other work while waiting.**

---

## 3. Callback

A **callback** is a function passed to another function.

```javascript
function greet(name, callback) {
    console.log("Hello " + name);
    callback();
}

greet("Adil", () => {
    console.log("Goodbye");
});
```

Here, the function passed to `greet()` is the callback.

> **Callback = A function passed to another function.**

### Callback with `setTimeout()`

```javascript
setTimeout(() => {
    console.log("Data received");
}, 2000);
```

The function inside `setTimeout()` is a callback that runs after 2 seconds.

---

## 4. Callback Hell

When many callbacks are nested inside each other, the code becomes difficult to read.

```javascript
getUser(() => {
    getPosts(() => {
        getComments(() => {
            console.log("Done");
        });
    });
});
```

This is called **Callback Hell**.

Promises provide a cleaner way to handle these operations.

---

# 5. Promise

A **Promise** represents a result that we will get in the future.

A Promise has three states:

```text
Pending
   ↓
   ├── Resolved ✅
   │
   └── Rejected ❌
```

* **Pending** → Operation is still running
* **Resolved** → Operation was successful
* **Rejected** → Operation failed

---

## Creating a Promise

```javascript
let promise = new Promise((resolve, reject) => {

    let success = true;

    if (success) {
        resolve("Task completed");
    } else {
        reject("Task failed");
    }

});
```

* `resolve()` → Success
* `reject()` → Failure

---

## `.then()` and `.catch()`

```javascript
promise
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });
```

* `.then()` handles a **resolved Promise**
* `.catch()` handles a **rejected Promise**

Simple flow:

```text
resolve()
   ↓
.then()

reject()
   ↓
.catch()
```

---

# 6. Promise with Random Number

This is an example of a Promise that waits for **3 seconds** and then randomly resolves or rejects.

```javascript
let pr = new Promise(function(res, rej) {

    setTimeout(() => {

        let rn = Math.floor(Math.random() * 10);

        if (rn > 5) {
            res("Resolved with " + rn);
        } else {
            rej("Rejected " + rn);
        }

    }, 3000);

});

pr
    .then(function(val) {
        console.log(val);
    })
    .catch(function(val) {
        console.log(val);
    });
```

### How it works

First, a random number from `0` to `9` is created:

```javascript
let rn = Math.floor(Math.random() * 10);
```

Then:

```javascript
if (rn > 5)
```

If the number is:

```text
6, 7, 8, 9
```

the Promise is resolved.

```javascript
res("Resolved with " + rn);
```

If the number is:

```text
0, 1, 2, 3, 4, 5
```

the Promise is rejected.

```javascript
rej("Rejected " + rn);
```

The result is then handled by `.then()` or `.catch()`.

```text
Random Number
      ↓
    rn > 5?
    /     \
  Yes      No
   ↓        ↓
resolve   reject
   ↓        ↓
.then()  .catch()
```

---

# 7. Async/Await

`async/await` is a cleaner way to work with Promises.

### Using `.then()`

```javascript
getData()
    .then((data) => {
        console.log(data);
    });
```

### Using `async/await`

```javascript
async function showData() {

    const data = await getData();

    console.log(data);

}

showData();
```

* `async` → Makes the function asynchronous and it returns a Promise.
* `await` → Waits for the Promise result.

> **Async/await makes Promise-based code easier to read.**

---

# 8. Error Handling

With `async/await`, we can use `try...catch` to handle errors.

```javascript
async function showData() {

    try {

        const data = await getData();

        console.log(data);

    } catch (error) {

        console.log(error);

    }

}

showData();
```

* `try` → Code that might fail
* `catch` → Handles the error

---

# 9. Chaining Async Operations

Sometimes one asynchronous operation depends on another.

For example:

```text
Get User
   ↓
Get Posts
   ↓
Get Comments
```

Using `async/await`:

```javascript
async function getData() {

    const user = await getUser();

    const posts = await getPosts(user.id);

    const comments = await getComments(posts[0].id);

    console.log(comments);

}
```

Each `await` waits for the previous operation to finish.

---

# 🧠 Quick Summary

| Concept           | Simple Meaning                      |
| ----------------- | ----------------------------------- |
| **Synchronous**   | Runs code line by line              |
| **Asynchronous**  | Allows tasks to finish later        |
| **Callback**      | Function passed to another function |
| **Callback Hell** | Too many nested callbacks           |
| **Promise**       | Represents a future result          |
| **Pending**       | Promise is still running            |
| **Resolve**       | Promise succeeded                   |
| **Reject**        | Promise failed                      |
| **`.then()`**     | Handles success                     |
| **`.catch()`**    | Handles failure                     |
| **`async`**       | Creates an async function           |
| **`await`**       | Waits for a Promise                 |
| **`try...catch`** | Handles errors                      |

---

# ⭐ Simple Flow

```text
Synchronous
     ↓
Asynchronous
     ↓
Callback
     ↓
Callback Hell
     ↓
Promise
     ↓
.then() / .catch()
     ↓
async / await
     ↓
try / catch
```

> **Main idea:** Asynchronous JavaScript is used when a task takes time. Callbacks, Promises, and async/await are different ways to handle these tasks.