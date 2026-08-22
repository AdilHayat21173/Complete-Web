# React API Pagination App

![Project Demo](./assets/project.png)

A simple React project built to understand **`useState`**, **`useEffect`**, API calls with Axios, Props, and Pagination.

The project fetches images from the **Picsum Photos API** and displays them using a reusable `Card` component.

## 🚀 Features

* Fetch images from API using Axios
* Display images in reusable cards
* Previous / Next pagination
* Loading message
* Practice React Hooks
* Tailwind CSS styling

## 🛠️ Technologies

* React.js
* JavaScript
* Axios
* Tailwind CSS
* Picsum Photos API

## ⚛️ React Hooks Used

### `useState`

`useState` is used to store data that can change in our application.

In this project, we use it for two things:

```js
const [Userdata, SetUserdata] = useState([])
const [index, setindex] = useState(1)
```

**`Userdata`** stores the data received from the API.

**`index`** stores the current page number.

When the user clicks Next:

```js
setindex(index + 1)
```

The page number changes and React updates the UI.

### `useEffect`

`useEffect` is used to perform a task after React renders the component.

In this project, we use it to call the API:

```js
useEffect(() => {
  getdata()
}, [index])
```

The `[index]` is the dependency array.

It means the API function runs when `index` changes.

For example:

```text
Page 1
  ↓
API Call
  ↓
Click Next
  ↓
index changes to 2
  ↓
useEffect runs again
  ↓
New API data
```

So, **`useState` stores the page number, and `useEffect` uses that page number to fetch new data.**

## 🌐 API Request

Axios is used to fetch 10 images:

```js
const response = await axios.get(
  `https://picsum.photos/v2/list?page=${index}&limit=10`
)

SetUserdata(response.data)
```

The API response is stored in `Userdata`.

## 🧩 Props & Card Component

The API data is passed to the `Card` component:

```js
<Card elem={elem} />
```

Inside `Card.jsx`, we access the data through:

```js
props.elem.download_url
props.elem.author
```

The Card component displays the image and author name.

## 📄 Pagination

The **Next** button increases the page:

```js
setindex(index + 1)
```

The **Previous** button decreases the page:

```js
setindex(index - 1)
```

When `index` changes, `useEffect` automatically calls the API again.

## 🔄 Project Flow

```text
User opens app
      ↓
useEffect runs
      ↓
Axios fetches API data
      ↓
useState stores data
      ↓
map() creates Cards
      ↓
Images displayed
      ↓
User changes page
      ↓
useEffect fetches new data
```

## 📚 What I Learned

* How `useState` manages changing data
* How `useEffect` handles API calls
* How dependency arrays work
* How to fetch data using Axios
* How to pass data using Props
* How to render API data with `map()`
* How pagination works in React
* How to create reusable components

## ▶️ Run the Project

```bash
npm install
npm run dev
```
