# 🎨 CSS Basics - Beginner Guide

A beginner-friendly guide to learning the basics of CSS. This README explains the most commonly used CSS concepts with simple definitions and examples.

---

# 📖 What is CSS?

**CSS (Cascading Style Sheets)** is used to style HTML elements.

CSS controls how a webpage looks, including:

- Colors
- Fonts
- Backgrounds
- Width & Height
- Spacing
- Layout
- Animations

### Simple Definition

> CSS is used to give style and design to HTML elements.

---

# 📝 CSS Syntax

```css
selector {
    property: value;
}
```

### Example

```css
h1 {
    color: blue;
    font-size: 30px;
}
```

Here,

- **h1** → Selector
- **color** → Property
- **blue** → Value

---

# 🎯 CSS Selectors

Selectors tell CSS which HTML elements should be styled.

## 1. Tag Selector

Used to style all elements with the same HTML tag.

### HTML

```html
<p>Hello World</p>
```

### CSS

```css
p {
    color: red;
}
```

Every `<p>` tag becomes red.

---

## 2. ID Selector (`#`)

Used to style one unique element.

### HTML

```html
<h1 id="title">Hello World</h1>
```

### CSS

```css
#title {
    color: blue;
}
```

> **Note:** One ID should only be used once on a webpage.

---

## 3. Class Selector (`.`)

A class can be used for multiple elements.

### HTML

```html
<p class="text">Paragraph 1</p>
<p class="text">Paragraph 2</p>
```

### CSS

```css
.text {
    color: green;
}
```

Both paragraphs become green.

---

# 📏 Width and Height

Width and height are used to define the size of an element.

```css
div {
    width: 300px;
    height: 200px;
}
```

---

# 📐 When to Use Pixels (px)

Pixels (`px`) are used when you **know the exact fixed size** of an element.

The size always remains the same.

### Use `px` for:

- Logos
- Icons
- Buttons
- Borders
- Fixed-size containers

Example

```css
button {
    width: 150px;
}
```

---

# 📊 When to Use Percentage (%)

Percentage (`%`) is used when you **don't know the exact width or height** and want the element to adjust according to its parent container.

It automatically changes size when the parent size changes.

### Use `%` for:

- Responsive websites
- Containers
- Images
- Website sections
- Layouts

Example

```css
.container {
    width: 80%;
}
```

If the parent width is **1000px**

```
80% = 800px
```

If the parent width becomes **500px**

```
80% = 400px
```

### Easy Trick

- **px** → Fixed size (you know the exact size).
- **%** → Responsive size (depends on the parent element).

---

# 📦 Margin

Margin creates space **outside** an element.

### Simple Definition

> Margin is the space between two elements.

Example

```css
margin: 20px;
```

---

## Margin with Four Values

```css
margin: 10px 20px 30px 40px;
```

Order

```
Top
Right
Bottom
Left
```

Memory Trick

```
TRBL

Top
Right
Bottom
Left
```

---

## Margin with Two Values

```css
margin: 20px 40px;
```

Means

```
Top = Bottom = 20px

Left = Right = 40px
```

---

# 📦 Padding

Padding creates space **inside** an element.

### Simple Definition

> Padding is the space between the content and the border.

Example

```html
<div>
    Hello World
</div>
```

Without Padding

```
+-----------+
|Hello World|
+-----------+
```

With Padding

```
+-------------------+
|                   |
|   Hello World     |
|                   |
+-------------------+
```

CSS

```css
div {
    padding: 20px;
}
```

---

# 🖼 Background Image

CSS allows you to add a background image to an element.

```css
background-image: url("image.jpg");
```

---

## Background Size

```css
background-size: cover;
```

`cover` makes the image fill the entire container without leaving empty space.

---

## Background Position

```css
background-position: center;
```

Other values

```css
background-position: left;
background-position: right;
background-position: top;
background-position: bottom;
```

---

## Background Repeat

```css
background-repeat: no-repeat;
```

Prevents the image from repeating.

---

## Complete Example

```css
body {
    background-image: url("background.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}
```

---

# 📍 Position Property

The `position` property controls where an element appears on the webpage.

Types of Position

- static
- relative
- absolute
- fixed
- sticky

---

# 📍 Position: Absolute

`position: absolute` removes an element from the normal document flow.

It can be moved anywhere using:

- top
- left
- right
- bottom

### Example

Suppose we have three boxes.

```
Box 1

Box 2

Box 3
```

Now apply

```css
.box2 {
    position: absolute;
    left: 100px;
}
```

Result

```
Box 1

Box 3
```

Box 2 leaves its original position and can move anywhere on the page.

This happens because absolute positioning removes the element from the normal layout.

---

# 📍 Position: Relative

`position: relative` keeps the element in the normal document flow but allows it to move slightly.

It is also used as a reference point for absolutely positioned child elements.

### Example

```html
<div class="main">
    <div class="child"></div>
</div>
```

```css
.main {
    position: relative;
    width: 400px;
    height: 300px;
    border: 2px solid black;
}

.child {
    position: absolute;
    left: 40%;
    top: 20px;
}
```

Because `.main` has `position: relative`, the child moves inside the main container instead of the whole page.

---

# 📦 Flexbox

Flexbox is used to arrange elements in rows or columns easily.

Without Flexbox

```
Box 1

Box 2

Box 3

Box 4
```

With Flexbox

```css
.main {
    display: flex;
}
```

Output

```
Box1   Box2   Box3   Box4
```

The boxes are arranged horizontally.

---

# ↔ Justify Content

`justify-content` aligns items horizontally (left to right).

Example

```css
.main {
    display: flex;
    justify-content: center;
}
```

Other values

```css
justify-content: flex-start;
justify-content: flex-end;
justify-content: center;
justify-content: space-between;
justify-content: space-around;
justify-content: space-evenly;
```

---

# ↕ Align Items

`align-items` aligns items vertically (top to bottom).

Example

```css
.main {
    display: flex;
    align-items: center;
}
```

---

# 💡 Easy Trick to Remember

| Property | Works On | Direction |
|----------|----------|-----------|
| justify-content | Width | Horizontal (Left ↔ Right) |
| align-items | Height | Vertical (Top ↕ Bottom) |

### Memory Trick

- **justify-content** → Controls **Horizontal** alignment.
- **align-items** → Controls **Vertical** alignment.

---

# 📚 Quick Revision

- CSS is used to style HTML elements.
- `#` is used for **ID**.
- `.` is used for **Class**.
- Tag names are used for **Tag Selectors**.
- Width and Height define the size of an element.
- **px** is used when you know the fixed size.
- **%** is used when you want the size to adjust according to the parent element (responsive).
- Margin creates space outside an element.
- Padding creates space inside an element.
- `background-image` adds a background image.
- `background-size: cover` fills the entire container.
- `position: absolute` removes an element from the normal layout.
- `position: relative` keeps the element in the layout and acts as a reference for absolutely positioned children.
- `display: flex` arranges child elements in a flexible row or column.
- `justify-content` aligns items horizontally.
- `align-items` aligns items vertically.

---

# 🚀 Next Topics to Learn

After completing these basics, you can move on to:

- CSS Grid
- Media Queries
- Responsive Web Design
- Transform
- Transition
- Animation
- Pseudo Classes (`:hover`, `:focus`)
- Pseudo Elements (`::before`, `::after`)
- CSS Variables
- Box Shadow
- Border Radius

---

# 🎯 Conclusion

These CSS concepts are the foundation of web development. Once you understand selectors, spacing, positioning, backgrounds, and Flexbox, you'll be ready to build beautiful and responsive websites.

Happy Coding! 🚀