# 📘 Tailwind CSS Notes

## 1. What is Tailwind CSS?

Tailwind CSS is a **utility-first CSS framework** that allows you to style web pages by using pre-built utility classes directly in your HTML. It helps you build modern, responsive websites quickly without writing much custom CSS.

---

## 2. Play CDN

The **Play CDN** is mainly used for **learning, testing, and small projects**. It lets you use Tailwind CSS without installing it.

```html
<script src="https://cdn.tailwindcss.com"></script>
```

> **Note:** The Play CDN is **not recommended for production** websites.

---

## 3. Making a Navbar

A navbar is used to provide navigation links for a website.

Common Tailwind classes used:

- `flex`
- `justify-between`
- `items-center`
- `px-*`
- `py-*`
- `gap-*`

Example:

```html
<nav class="flex justify-between items-center px-10 py-4 bg-white">
```

---

## 4. Installing Tailwind CSS

Install Tailwind CSS using npm:

```bash
npm install tailwindcss @tailwindcss/postcss postcss
```

Then import Tailwind in your CSS file:

```css
@import "tailwindcss";
```

---

## 5. Font Family

Change the font family using Tailwind classes.

Examples:

```html
font-sans
font-serif
font-mono
```

---

## 6. Font Size

Control the text size using predefined classes.

Examples:

```html
text-sm
text-base
text-lg
text-xl
text-2xl
text-4xl
text-6xl
```

---

## 7. Text Alignment

Align text using:

```html
text-left
text-center
text-right
text-justify
```

---

## 8. Margin & Padding

### Margin

Adds space **outside** an element.

```html
m-4
mt-4
mb-4
ml-4
mr-4
mx-4
my-4
```

### Padding

Adds space **inside** an element.

```html
p-4
pt-4
pb-4
pl-4
pr-4
px-4
py-4
```

---

## 9. Letter Spacing

Control the spacing between letters.

Examples:

```html
tracking-tight
tracking-normal
tracking-wide
tracking-widest
```

---

## 10. Making a Landing Page

A basic landing page usually contains:

- Navbar
- Hero Section
- Heading
- Description
- Call-to-Action Button
- Image
- Footer

Common Tailwind classes used:

```html
flex
justify-center
items-center
h-screen
w-screen
object-cover
rounded-lg
shadow-lg
bg-blue-500
text-white
```

---

## 📌 Summary

- Tailwind CSS is a utility-first CSS framework.
- Play CDN is used for testing and learning.
- Tailwind makes it easy to build responsive layouts.
- Use utility classes instead of writing custom CSS.
- Common concepts include typography, spacing, alignment, and Flexbox.
- Build projects like landing pages to practise Tailwind CSS.