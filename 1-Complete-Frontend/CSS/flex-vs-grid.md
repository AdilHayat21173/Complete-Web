# 📦 CSS Flexbox & Grid Basics

## What is Flexbox?

**Flexbox** is a CSS layout system used to arrange items in **one direction** (either a row or a column). It helps you align, space, and position elements easily.

## Basic Structure

```html
<div class="parent">
    <div class="child">1</div>
    <div class="child">2</div>
    <div class="child">3</div>
</div>
```

```css
.parent {
    display: flex;
}
```

By default, HTML places `<div>` elements **one below another (column)**.

When you apply:

```css
display: flex;
```

The child elements are automatically arranged in a **row**.

---

# `display: flex`

```css
.parent {
    display: flex;
}
```

### Working

- Makes the parent a **flex container**.
- Converts child elements from **column to row**.
- All direct child elements become **flex items**.

---

# `align-items`

`align-items` aligns items on the **cross axis**.

When `flex-direction: row` (default):

- Cross Axis = **Vertical (Y-axis)**

```css
.parent {
    display: flex;
    align-items: center;
}
```

## Values

### `flex-start`

Places child elements at the **top** of the parent.

```css
align-items: flex-start;
```

### `center`

Moves child elements to the **vertical centre**.

```css
align-items: center;
```

### `flex-end`

Places child elements at the **bottom** of the parent.

```css
align-items: flex-end;
```

---

# `justify-content`

`justify-content` aligns items on the **main axis**.

When `flex-direction: row` (default):

- Main Axis = **Horizontal (X-axis)**

```css
.parent {
    display: flex;
    justify-content: center;
}
```

## Values

### `flex-start`

Moves items to the **left/start**.

```css
justify-content: flex-start;
```

### `center`

Moves items to the **centre**.

```css
justify-content: center;
```

### `flex-end`

Moves items to the **right/end**.

```css
justify-content: flex-end;
```

---

# `justify-content` Spacing

## `space-between`

```css
justify-content: space-between;
```

- Adds equal space **between** the items.
- The first item touches the **left** side.
- The last item touches the **right** side.

Example:

```
|Box1      Box2      Box3|
```

---

## `space-around`

```css
justify-content: space-around;
```

- Adds equal space **around** each item.
- The left and right edges have **half** the space compared to the space between items.

Example:

```
|  Box1    Box2    Box3  |
```

---

## `space-evenly`

```css
justify-content: space-evenly;
```

- Adds **equal spacing everywhere**.
- The left, right, and spaces between items are all equal.

Example:

```
|   Box1   Box2   Box3   |
```

---

# `flex-direction`

Changes the direction of the flex items.

## Row (Default)

```css
.parent {
    display: flex;
    flex-direction: row;
}
```

Items appear from **left to right**.

---

## Column

```css
.parent {
    display: flex;
    flex-direction: column;
}
```

Items appear from **top to bottom**.

You can still use `align-items` and `justify-content` to align or centre the items.

---

# `flex-wrap`

Normally, Flexbox tries to keep all items on one line. If there are many items, they shrink.

```css
.parent {
    display: flex;
    flex-wrap: wrap;
}
```

### Working

If there are many child elements (for example, 10 boxes), they move to the **next line** instead of shrinking.

Without `wrap`:

```
□□□□□□□□□□
```

With `wrap`:

```
□□□□□
□□□□□
```

---

# `flex-shrink`

Controls whether a flex item can shrink when there is not enough space.

```css
.child {
    flex-shrink: 0;
}
```

- `1` (default) → Item can shrink.
- `0` → Item keeps its original size.

---

# Flexbox Axes

Flexbox works with **two axes**.

- **Main Axis** → Controlled by `justify-content`
- **Cross Axis** → Controlled by `align-items`

When `flex-direction: row`:

- Main Axis = Horizontal (X-axis)
- Cross Axis = Vertical (Y-axis)

When `flex-direction: column`:

- Main Axis = Vertical (Y-axis)
- Cross Axis = Horizontal (X-axis)

---

# What is CSS Grid?

**CSS Grid** is a layout system used to create **rows and columns at the same time**.

Unlike Flexbox, Grid controls both the **X-axis** and **Y-axis** together.

---

# Flexbox vs Grid

| Flexbox | Grid |
|----------|------|
| One-dimensional layout | Two-dimensional layout |
| Works on one axis at a time | Works on rows and columns together |
| Best for small layouts | Best for large and complex layouts |
| Used for navigation bars, buttons, menus, and cards | Used for dashboards, galleries, and full-page layouts |

## Use Flexbox When

- Navigation bars
- Buttons
- Menus
- Aligning items
- Centre content

## Use Grid When

- Dashboards
- Website layouts
- Admin panels
- Image galleries
- Complex page layouts

---

# `grid-template-columns`

Defines how many columns you want and their width.

```css
.container {
    display: grid;
    grid-template-columns: 100px 100px;
}
```

### Output

Creates **2 columns**, each **100px** wide.

```
+-------+-------+
| Box 1 | Box 2 |
+-------+-------+
| Box 3 | Box 4 |
+-------+-------+
```

### Three Columns Example

```css
.container {
    display: grid;
    grid-template-columns: 100px 100px 100px;
}
```

Creates **3 columns**, each **100px** wide.

---

# 📖 Summary

- `display: flex` converts child elements from **column to row**.
- `align-items` aligns items on the **cross axis**.
- `justify-content` aligns items on the **main axis**.
- `flex-direction` changes the layout to **row** or **column**.
- `flex-wrap` moves items to the next line when needed.
- `flex-shrink` controls whether items can shrink.
- **Flexbox** is best for one-dimensional layouts.
- **Grid** is best for two-dimensional layouts.
- `grid-template-columns` defines the number and width of columns.