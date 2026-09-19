# 📏 CSS Units

CSS units are used to set the **size**, **width**, **height**, **margin**, **padding**, and **font size** of elements.

---

# 📌 `px` (Pixel)

`px` (pixel) is a **fixed unit**.

It is mainly used when you want an element to stay the **same size**, even if the browser window is resized. It is also useful for making small adjustments, such as moving a button slightly.

### Example

```css
.box{
    width: 300px;
}
```

If you resize the browser, the box will **remain 300px wide**.

### When to Use `px`

* Buttons
* Icons
* Borders
* Small spacing (margin, padding)
* Fixed-size elements

> **Easy Trick:** `px` = **Fixed Length**

---

# 📌 `%` (Percentage)

`%` is a **relative unit**.

It depends on the **parent element's size**. If the parent becomes bigger or smaller, the child element also changes its size.

### Example

```css
.parent{
    width: 800px;
}

.child{
    width: 50%;
}
```

```
50% of 800px = 400px
```

If the parent width changes to **600px**:

```
50% of 600px = 300px
```

### When to Use `%`

* Responsive layouts
* Flexible containers
* Images
* Width and height based on the parent

> **Easy Trick:** `%` = Depends on the **Parent Element**

---

## 📚 Quick Comparison

| Unit | Depends On     |
| ---- | -------------- |
| `px` | Fixed size     |
| `%`  | Parent element |

---

# 📏 CSS `vw` Unit (Viewport Width)

`vw` stands for **Viewport Width**.

It sets the size of an element based on the **browser window's width**, not the parent element.

### Example

```css
.box{
    width: 50vw;
}
```

If the browser width is **1000px**:

```
50vw = 500px
```

If the browser width becomes **800px**:

```
50vw = 400px
```

The element automatically resizes when the browser window changes.

### When to Use `vw`

* Hero sections
* Full-width banners
* Landing pages
* Responsive layouts

### Quick Comparison

| Unit | Depends On           |
| ---- | -------------------- |
| `px` | Fixed size           |
| `%`  | Parent element       |
| `vw` | Browser window width |

> **Easy Trick:** `vw` = **Viewport Width** (Browser Width)

---

# 📏 CSS `vh` Unit (Viewport Height)

`vh` stands for **Viewport Height**.

It sets the size of an element based on the **browser window's height**, not the parent element.

### Example

```css
.box{
    height: 50vh;
}
```

If the browser height is **800px**:

```
50vh = 400px
```

If the browser height becomes **600px**:

```
50vh = 300px
```

The element automatically resizes when the browser window height changes.

### When to Use `vh`

* Full-screen sections
* Hero sections
* Landing pages
* Login pages
* Welcome screens

### Quick Comparison

| Unit | Depends On            |
| ---- | --------------------- |
| `px` | Fixed size            |
| `%`  | Parent element        |
| `vh` | Browser window height |

> **Easy Trick:** `vh` = **Viewport Height** (Browser Height)

---

# 📏 `vmax` (Viewport Maximum)

`vmax` uses the **larger** value of the browser's width or height.

### Example

Browser Size:

```
Width  = 1200px
Height = 800px
```

```css
.box{
    width: 10vmax;
}
```

Since **1200px** is larger than **800px**, `10vmax` is calculated using the **width**.

If the browser is resized and the height becomes larger than the width, `vmax` will automatically use the **height**.

> **Easy Trick:** `vmax` = Uses the **Maximum** viewport size.

---

# 📏 `vmin` (Viewport Minimum)

`vmin` uses the **smaller** value of the browser's width or height.

### Example

Browser Size:

```
Width  = 1200px
Height = 800px
```

```css
.box{
    width: 10vmin;
}
```

Since **800px** is smaller than **1200px**, `10vmin` is calculated using the **height**.

If the browser is resized and the width becomes smaller than the height, `vmin` will automatically use the **width**.

> **Easy Trick:** `vmin` = Uses the **Minimum** viewport size.

---

# 📏 `em`

`em` is a **relative CSS unit** based on the **parent element's font size**.

### Example

```css
.parent{
    font-size: 20px;
}

.child{
    font-size: 2em;
}
```

The parent font size is **20px**, so:

```
2em = 40px
```

### Key Point

* Depends on the **parent element**
* If the parent's font size changes, the child's `em` value also changes.

> **Easy Trick:** `em` = **Element (Parent)**

---

# 📏 `rem`

`rem` is a **relative CSS unit** based on the **root (`html`) font size**.

### Example

```css
html{
    font-size: 16px;
}

h1{
    font-size: 2rem;
}
```

The root (`html`) font size is **16px**, so:

```
2rem = 32px
```

### Key Point

* Depends on the **root (`html`) font size**
* It does **not** depend on the parent element.

> **Easy Trick:** `rem` = **Root (`html`)**

---

# 📚 Quick Comparison

| Unit   | Based On                            |
| ------ | ----------------------------------- |
| `px`   | Fixed size                          |
| `%`    | Parent element                      |
| `vw`   | Browser window width                |
| `vh`   | Browser window height               |
| `vmax` | Larger of viewport width or height  |
| `vmin` | Smaller of viewport width or height |
| `em`   | Parent element's font size          |
| `rem`  | Root (`html`) font size             |

---

# 💡 Memory Tricks

* **`px`** → Fixed size
* **`%`** → Parent element
* **`vw`** → Viewport Width
* **`vh`** → Viewport Height
* **`vmax`** → Maximum viewport size
* **`vmin`** → Minimum viewport size
* **`em`** → **E**lement (Parent)
* **`rem`** → **R**oot (`html`)
