# 📄 DOM (Document Object Model)

The **DOM** represents an HTML page as a tree of objects. JavaScript uses the DOM to **select, read, change, create, and remove HTML elements**.

## 🌳 DOM Tree

Basic DOM structure:

```text
Document
 └── HTML
      ├── Element
      ├── Text
      └── Comment
```

* **Node** → Any item in the DOM tree.
* **Element** → HTML tags like `<div>`, `<h1>`, `<p>`.
* **Text** → Text inside an element.
* **Comment** → HTML comments.

## 🎯 Selecting Elements

```javascript
document.getElementById("id");

document.getElementsByClassName("class");

document.querySelector(".box");

document.querySelectorAll(".box");
```

* `getElementById()` → Selects one element by ID.
* `getElementsByClassName()` → Selects elements by class.
* `querySelector()` → Selects the first matching element.
* `querySelectorAll()` → Selects all matching elements.

## ✏️ Text & Content

```javascript
element.innerText;
element.textContent;
element.innerHTML;
```

* `innerText` → Gets visible text.
* `textContent` → Gets all text content.
* `innerHTML` → Gets or changes HTML content.

## 🏷️ Attributes

```javascript
element.getAttribute("src");

element.setAttribute("src", "image.jpg");

element.removeAttribute("src");
```

Used to read, add/change, and remove HTML attributes.

## 🏗️ Dynamic DOM Manipulation

```javascript
const div = document.createElement("div");

div.textContent = "Hello";

parent.appendChild(div);

parent.prepend(div);

parent.removeChild(div);
```

* `createElement()` → Creates a new element.
* `appendChild()` → Adds element at the end.
* `prepend()` → Adds element at the beginning.
* `removeChild()` → Removes a child element.

## 🎨 Styles & Classes

### Style

```javascript
element.style.color = "red";
element.style.fontSize = "20px";
```

### classList

```javascript
element.classList.add("active");

element.classList.remove("active");

element.classList.toggle("active");
```

* `add()` → Add a class.
* `remove()` → Remove a class.
* `toggle()` → Add if missing, remove if present.

## 🧠 Quick Summary

```text
DOM
├── Select
│   ├── getElementById
│   ├── getElementsByClassName
│   ├── querySelector
│   └── querySelectorAll
│
├── Read / Change
│   ├── innerText
│   ├── textContent
│   └── innerHTML
│
├── Attributes
│   ├── getAttribute
│   ├── setAttribute
│   └── removeAttribute
│
├── Create / Remove
│   ├── createElement
│   ├── appendChild
│   ├── prepend
│   └── removeChild
│
└── Styling
    ├── style
    └── classList
        ├── add
        ├── remove
        └── toggle
```
