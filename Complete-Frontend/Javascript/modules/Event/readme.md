# 📦 JavaScript Events

An **event** is an action that happens on a webpage, such as clicking a button, typing in an input, selecting an option, or submitting a form.

JavaScript can listen for these events and run a function when they happen.

---

## 🎯 Event Binding

### `addEventListener()`

Used to listen for an event.

```javascript
const button = document.querySelector("button");

button.addEventListener("click", function () {
    console.log("Button clicked");
});
```

### `removeEventListener()`

Used to remove an event listener.

```javascript
function greet() {
    console.log("Hello");
}

button.addEventListener("click", greet);
button.removeEventListener("click", greet);
```

---

## 🖱️ Common Events

| Event       | Use                                       |
| ----------- | ----------------------------------------- |
| `click`     | When an element is clicked                |
| `input`     | When the input value changes while typing |
| `change`    | When an input/select value changes        |
| `submit`    | When a form is submitted                  |
| `mouseover` | When the mouse moves over an element      |
| `keyup`     | When a keyboard key is released           |

Example:

```javascript
input.addEventListener("input", function () {
    console.log(input.value);
});
```

---

## 📦 Event Object

The event handler receives an **event object**.

```javascript
button.addEventListener("click", function (e) {
    console.log(e);
});
```

### `event.target`

Returns the element that actually triggered the event.

```javascript
button.addEventListener("click", function (e) {
    console.log(e.target);
});
```

### `event.type`

Returns the event type.

```javascript
button.addEventListener("click", function (e) {
    console.log(e.type);
});
```

Output:

```text
click
```

### `event.preventDefault()`

Stops the browser's default behavior.

Commonly used with forms:

```javascript
form.addEventListener("submit", function (e) {
    e.preventDefault();

    console.log("Form submitted");
});
```

---

# 🔄 Event Capturing and Bubbling

Events have different phases as they move through the DOM.

Suppose we have:

```text
main1
  ↓
 nav
  ↓
 li
  ↓
button
```

And we click the **button**.

---

## ⬇️ Event Capturing

**Event capturing** means the event moves from the **top-level element toward the element that was clicked**.

If we click the button, the event moves:

```text
main1 → nav → li → button
```

So the event travels:

**Top → Down**

You can enable capturing by passing `true`:

```javascript
main1.addEventListener("click", function () {
    console.log("main1");
}, true);
```

---

## ⬆️ Event Bubbling

**Event bubbling** means the event starts from the **element that was clicked** and then moves upward through its parent elements.

If we click the button:

```text
button → li → nav → main1
```

So the event travels:

**Bottom → Up**

Bubbling is the **default behavior** of most event listeners.

```javascript
button.addEventListener("click", function () {
    console.log("button");
});
```

---

## 🧠 Easy Way to Remember

```text
Capturing:
Top → Down

Bubbling:
Bottom → Up
```

---

## 🎯 `target` vs `currentTarget`

These two are important.

```javascript
parent.addEventListener("click", function (e) {
    console.log(e.target);
    console.log(e.currentTarget);
});
```

### `event.target`

The element that was actually clicked.

### `event.currentTarget`

The element where the event listener is attached.

```text
target
→ Actual clicked element

currentTarget
→ Element containing the event listener
```

---

# 📌 Event Delegation

**Event delegation** means adding one event listener to a parent instead of adding listeners to every child.

Example:

```html
<ul id="todoList">
    <li>Learn JavaScript</li>
    <li>Practice DOM</li>
    <li>Learn Events</li>
</ul>
```

```javascript
const todoList = document.querySelector("#todoList");

todoList.addEventListener("click", function (e) {

    if (e.target.tagName === "LI") {
        e.target.remove();
    }

});
```

When an `<li>` is clicked:

```text
li clicked
   ↓
event bubbles
   ↓
ul receives event
   ↓
event.target identifies li
   ↓
li is removed
```

This is useful when there are many elements or when elements are created dynamically.

---

# 🔢 Live Character Counter

HTML:

```html
<textarea id="message"></textarea>

<p>
    Characters: <span id="count">0</span>
</p>
```

JavaScript:

```javascript
const message = document.querySelector("#message");
const count = document.querySelector("#count");

message.addEventListener("input", function () {
    count.textContent = message.value.length;
});
```

Every time the user types, the character count updates.

---

# 🧠 Quick Summary

```text
Events
│
├── Event Binding
│   ├── addEventListener()
│   └── removeEventListener()
│
├── Common Events
│   ├── click
│   ├── input
│   ├── change
│   ├── submit
│   ├── mouseover
│   └── keyup
│
├── Event Object
│   ├── target
│   ├── currentTarget
│   ├── type
│   └── preventDefault()
│
├── Event Flow
│   ├── Capturing → Top → Down
│   └── Bubbling → Bottom → Up
│
└── Event Delegation
    └── Parent handles child events
```

### ⭐ Remember

```text
addEventListener()
→ Listen for an event

event.target
→ Element that triggered the event

event.currentTarget
→ Element with the listener

preventDefault()
→ Stop default browser behavior

Capturing
→ Top → Down

Bubbling
→ Bottom → Up

Delegation
→ Parent handles child events
```
