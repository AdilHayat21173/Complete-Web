# HTML Basics Notes

## What is Boilerplate Code?

Boilerplate code is the basic structure of an HTML document that is required before writing any HTML code. Without this structure, the browser cannot properly display the webpage.

### Basic HTML Boilerplate

```html
<!DOCTYPE html>
<html>
<head>
    <title>My First Web Page</title>
</head>
<body>

</body>
</html>
```

---

## HTML Tags

HTML uses **tags** to define elements.

**Syntax:**

```html
<tagname>Content</tagname>
```

**Example:**

```html
<h1>Hello World</h1>
<p>This is a paragraph.</p>
```

---

## Headings

HTML provides six heading tags.

```html
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>
```

* `<h1>` is the largest heading.
* `<h6>` is the smallest heading.

---

## Paragraph

The `<p>` tag is used to write paragraphs.

```html
<p>This is a paragraph.</p>
```

You can use **Lorem Ipsum** (`lorem`) in VS Code to generate random text for practice.

---

## Line Break

The `<br>` tag is used to move text to a new line.

```html
Hello<br>
World
```

Output:

```
Hello
World
```

---

## Image

The `<img>` tag is used to display an image.

**Example:**

```html
<img src="https://plus.unsplash.com/premium_photo-1683436791486-508249532f52?q=80&w=687&auto=format&fit=crop" alt="Mac Laptop">
```

* `src` → Specifies the image URL.
* `alt` → Displays alternative text if the image cannot be loaded.

---

## Anchor Tag (Hyperlink)

The `<a>` tag is used to create links.

**Example:**

```html
<a href="https://google.com">Visit Google</a>
```

You can also create a download link.

```html
<a href="file.pdf" download>Download Now</a>
```

* `href` → Specifies the destination (URL or file).
* `download` → Downloads the file instead of opening it.

---

## Div

The `<div>` tag is a container used to group HTML elements.

* By default, a `<div>` takes **100% of the available width**.
* It has **no fixed height**.
* Its height automatically becomes equal to the height of its child elements.

### Example

```html
<div class="parent">
    <div class="child1">Child 1</div>
    <div class="child2">Child 2</div>
</div>
```

Here:

* `parent` is the main container.
* `child1` and `child2` are inside the parent `<div>`.

---

## ID

The `id` attribute is used to uniquely identify an HTML element.

### Example

```html
<p id="green">This paragraph is green.</p>

<p id="blue">This paragraph is blue.</p>
```

**Rules**

* An `id` must be **unique**.
* The same `id` should **not** be used on multiple elements.

---

## Class

The `class` attribute is used to apply the same style to multiple elements.

### Example

```html
<p class="black">Paragraph 1</p>
<p class="black">Paragraph 2</p>
<p class="green">Paragraph 3</p>
<p class="green">Paragraph 4</p>
```

If you have 20 paragraphs:

* Assign the class `black` to 10 paragraphs.
* Assign the class `green` to the other 10 paragraphs.

Unlike `id`, a **class can be used on multiple elements**.

---

## Summary

* Boilerplate code is the basic HTML structure.
* HTML elements are created using tags.
* `<h1>` to `<h6>` are heading tags.
* `<p>` is used for paragraphs.
* `<br>` creates a new line.
* `<img>` displays images.
* `<a>` creates hyperlinks and download links.
* `<div>` is used as a container for other elements.
* `id` is unique and used only once.
* `class` can be used on multiple elements.
