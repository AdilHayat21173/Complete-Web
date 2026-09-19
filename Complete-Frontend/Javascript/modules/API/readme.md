# 🌐 JavaScript Fetch API & HTTP Basics

This section is about learning how **JavaScript communicates with APIs and servers**.

We are learning how to send requests, receive responses, work with JSON, handle errors, and display API data on a webpage.

---

## 📚 Topics We Are Learning

* API Basics
* `fetch()`
* GET Requests
* POST Requests
* JSON
* HTTP Status Codes
* `response.ok`
* `try...catch`
* Form Submission with Fetch
* REST API Basics
* API Chaining
* `async/await` with APIs
* Rendering API Data on the DOM
* Working with Real-World APIs

---

# 1. What is an API?

**API** stands for **Application Programming Interface**.

In simple words, an API allows our application to **communicate with another application or server**.

For example, in a weather app:

```text
Your Website
     |
     | "Give me weather for Lahore"
     ↓
Weather API
     |
     | "Here is the weather"
     ↓
Your Website
     |
     ↓
Display Weather
```

Think of an API as a **messenger between your application and a server**.

---

# 2. What is `fetch()`?

`fetch()` is a JavaScript function used to make HTTP requests.

```javascript
fetch(url);
```

It means:

> Send a request to this URL and give me the response.

`fetch()` is **asynchronous** and returns a Promise.

We can use it with:

```javascript
fetch(url)
    .then(...)
    .catch(...);
```

Or with `async/await`:

```javascript
async function getData() {

    const response = await fetch(url);

}
```

---

# 3. GET Request

A **GET request** is used to get data from a server.

```javascript
async function getUsers() {

    const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
    );

    const data = await response.json();

    console.log(data);
}

getUsers();
```

The basic flow is:

```text
JavaScript
    ↓
fetch()
    ↓
Server
    ↓
Response
    ↓
JSON
    ↓
JavaScript Data
```

---

# 4. `response` vs `data`

This is very important.

```javascript
const response = await fetch(url);

const data = await response.json();
```

`response` and `data` are different.

### `response`

Contains information about the HTTP response:

```text
response
├── status
├── ok
├── headers
└── json()
```

### `data`

Contains the actual information returned by the API:

```text
data
├── name
├── email
├── username
└── ...
```

For example:

```javascript
console.log(response.status);
```

might give:

```text
200
```

While:

```javascript
console.log(data.name);
```

might give:

```text
Adil
```

---

# 5. POST Request

A **POST request** is generally used to send data to a server.

For example:

```javascript
fetch("https://example.com/users", {

    method: "POST",

    headers: {
        "Content-Type": "application/json"
    },

    body: JSON.stringify({
        name: "Adil",
        email: "adil@gmail.com"
    })

});
```

### `method`

```javascript
method: "POST"
```

Means we want to send data.

### `headers`

```javascript
headers: {
    "Content-Type": "application/json"
}
```

Tells the server that we are sending JSON.

### `body`

```javascript
body: JSON.stringify({
    name: "Adil",
    email: "adil@gmail.com"
})
```

Contains the data we want to send.

---

# 6. JSON

**JSON** stands for:

> JavaScript Object Notation

It is a common format for exchanging data between applications and servers.

Example:

```json
{
    "name": "Adil",
    "age": 24,
    "city": "Peshawar"
}
```

After parsing the response:

```javascript
const data = await response.json();

console.log(data.name);
console.log(data.age);
```

---

# 7. `response.json()`

When we use:

```javascript
const response = await fetch(url);
```

we don't immediately have the JSON data.

We first have a **Response object**.

Then:

```javascript
const data = await response.json();
```

converts the response body into usable JavaScript data.

Think:

```text
fetch()
   ↓
Response
   ↓
response.json()
   ↓
JavaScript Data
```

---

# 8. HTTP Status Codes

Servers return status codes to tell us what happened.

| Status | Meaning      |
| ------ | ------------ |
| `200`  | Success      |
| `201`  | Created      |
| `400`  | Bad Request  |
| `401`  | Unauthorized |
| `403`  | Forbidden    |
| `404`  | Not Found    |
| `500`  | Server Error |

For example:

```text
200 → Everything worked
404 → Resource wasn't found
500 → Server had a problem
```

---

# 9. Important `fetch()` Rule

One of the most important things to understand:

> **`fetch()` does not automatically throw an error when the server returns an HTTP error such as `400`, `404`, or `500`.**

That's why we check:

```javascript
if (!response.ok) {
    throw new Error("Something went wrong");
}
```

`response.ok` gives:

```text
true  → Successful HTTP response
false → HTTP error response
```

---

# 10. Error Handling

We use `try...catch` when working with APIs.

```javascript
async function getUsers() {

    try {

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }

        const data = await response.json();

        console.log(data);

    } catch (error) {

        console.log(error.message);

    }
}

getUsers();
```

The flow:

```text
fetch()
   ↓
Response
   ↓
response.ok?
   ↓
 ┌───────────┐
 Yes         No
  ↓           ↓
JSON       throw Error
  ↓           ↓
Data        catch
```

---

# 11. Form Submission with Fetch

We can also use `fetch()` when submitting forms.

Example:

```html
<form id="userForm">

    <input id="name" type="text" placeholder="Name">

    <input id="email" type="email" placeholder="Email">

    <button type="submit">
        Submit
    </button>

</form>
```

Normally, submitting a form reloads the page.

We can prevent that:

```javascript
form.addEventListener("submit", function(event) {

    event.preventDefault();

});
```

Then we can send the form data using `fetch()`.

The flow is:

```text
User fills form
      ↓
Submit
      ↓
preventDefault()
      ↓
Get form values
      ↓
fetch()
      ↓
POST data
      ↓
Server response
      ↓
Success / Error
```

---

# 12. REST API Basics

REST is a common way of designing APIs around resources and HTTP methods.

For example, suppose we have:

```text
/users
```

### GET

Get users:

```text
GET /users
```

### POST

Create a user:

```text
POST /users
```

### GET One User

```text
GET /users/5
```

### PUT

Update a user:

```text
PUT /users/5
```

### PATCH

Partially update a user:

```text
PATCH /users/5
```

### DELETE

Delete a user:

```text
DELETE /users/5
```

| Method | Purpose          |
| ------ | ---------------- |
| GET    | Read             |
| POST   | Create           |
| PUT    | Replace / Update |
| PATCH  | Partially Update |
| DELETE | Delete           |

---

# 13. API Chaining

Sometimes one API request depends on another API request.

For example:

```text
Get User
   ↓
Get User's Posts
```

First:

```javascript
const user = await getUser();
```

Then use information from the first request:

```javascript
const posts = await getPosts(user.id);
```

The flow becomes:

```text
Request 1
   ↓
Get User
   ↓
Get User ID
   ↓
Request 2
   ↓
Get User's Posts
```

This is called **API chaining**.

---

# 14. `await` Inside Loops

We can also use `await` inside loops.

```javascript
const ids = [1, 2, 3];

async function getUsers() {

    for (const id of ids) {

        const response = await fetch(
            `https://jsonplaceholder.typicode.com/users/${id}`
        );

        const user = await response.json();

        console.log(user.name);
    }
}

getUsers();
```

Here, each request waits for the previous one:

```text
User 1
 ↓
wait
 ↓
User 2
 ↓
wait
 ↓
User 3
```

This is useful when the next operation depends on the previous result.

---

# 15. Render API Data on the DOM

Getting data in the console isn't enough for a real application.

We want:

```text
API
 ↓
Data
 ↓
HTML
 ↓
User
```

For example:

```html
<div id="users"></div>
```

Then JavaScript can create elements dynamically:

```javascript
const usersContainer = document.querySelector("#users");

const response = await fetch(
    "https://jsonplaceholder.typicode.com/users"
);

const users = await response.json();

users.forEach(user => {

    const card = document.createElement("div");

    card.innerHTML = `
        <h2>${user.name}</h2>
        <p>${user.email}</p>
    `;

    usersContainer.append(card);
});
```

The flow is:

```text
API
 ↓
fetch()
 ↓
response
 ↓
response.json()
 ↓
JavaScript Data
 ↓
forEach()
 ↓
Create HTML
 ↓
DOM
```

---

# 16. Practice Project — User Search

We can practice APIs by creating a **User Search** application.

We can use JSONPlaceholder:

```text
https://jsonplaceholder.typicode.com/users
```

The application can work like:

```text
User enters name
       ↓
Search
       ↓
Filter API data
       ↓
Display matching users
```

This helps us practice:

* `fetch()`
* JSON
* Arrays
* `filter()`
* DOM manipulation
* Events
* Error handling

---

# 17. Practice Project — Weather App

Our next practice project is a **Weather App**.

The basic architecture is:

```text
User enters city
      ↓
Click Search
      ↓
fetch()
      ↓
Weather API
      ↓
JSON response
      ↓
Extract weather data
      ↓
Update DOM
```

For example:

```text
Lahore

Temperature: 32°C
Weather: Clear
Humidity: 45%
Wind: 12 km/h
```

This project helps us combine everything we have learned.

---

# 🧠 What We Should Remember

### `fetch()`

Used to communicate with a server/API.

### GET

Used to get data.

```javascript
fetch(url);
```

### POST

Used to send data.

```javascript
fetch(url, {
    method: "POST"
});
```

### `response.json()`

Converts the response body into usable JavaScript data.

### `response.ok`

Checks whether the HTTP response was successful.

### `try...catch`

Handles errors.

### HTTP Status Codes

```text
200 → Success
201 → Created
400 → Bad Request
401 → Unauthorized
403 → Forbidden
404 → Not Found
500 → Server Error
```

### API Chaining

Use the result of one API request to make another request.

---

# ⭐ Most Important Flow

```text
JavaScript
    ↓
fetch()
    ↓
HTTP Request
    ↓
Server / API
    ↓
HTTP Response
    ↓
response.ok
    ↓
response.json()
    ↓
JavaScript Data
    ↓
DOM
    ↓
User
```

## 🎯 Learning Goal

The goal of this section is to understand how **real JavaScript applications communicate with servers**.

After learning these concepts, we can build applications such as:

* 🌦️ Weather App
* 👤 User Search
* 🎬 Movie Search
* 📊 API Dashboards
* 📝 Form Submission Apps

The main mindset is:

> **APIs are building blocks that allow our JavaScript applications to communicate with the real world.**
