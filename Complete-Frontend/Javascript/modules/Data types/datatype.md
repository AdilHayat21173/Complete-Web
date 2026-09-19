# JavaScript Data Types & Type Coercion

## 1. Data Types

JavaScript data types are mainly divided into two categories:

### Primitive Types

Primitive values are copied **by value**, meaning a real copy of the value is created.

Examples:

```js
string
number
boolean
undefined
null
bigint
symbol
```

Example:

```js
let a = 10;
let b = a;

b = 20;

console.log(a); // 10
console.log(b); // 20
```

---

### Reference Types

Reference values are copied **by reference**, meaning both variables can point to the same data in memory.

Examples:

```js
Array   []
Object  {}
Function ()
```

Example:

```js
let a = [1, 2, 3];
let b = a;

b.push(4);

console.log(a); // [1, 2, 3, 4]
console.log(b); // [1, 2, 3, 4]
```

---

## 2. BigInt

JavaScript `Number` has a maximum safe integer:

```js
Number.MAX_SAFE_INTEGER
```

For integers larger than this limit, use `BigInt`:

```js
let a = 9007199254740991n;
```

The `n` at the end represents a `BigInt`.

---

## 3. Dynamic Typing

JavaScript is a **dynamically typed language**.

A variable can hold different types of values during execution:

```js
let a = 18;

a = true;

a = [];
```

The type of `a` changes dynamically.

---

# 4. Type Coercion

**Type coercion** means JavaScript automatically converts one data type into another during certain operations.

```js
"5" + 1        // "51" → number converted to string
"5" - 1        // 4   → string converted to number
true + 1        // 2
null + 1        // 1
undefined + 1   // NaN
```

---

# 5. Truthy and Falsy Values

### Falsy Values

These values are treated as `false` in a condition:

```js
false
0
""
null
undefined
NaN
```

### Truthy Values

Everything else is generally truthy, including:

```js
"0"
"false"
[]
{}
function() {}
```

Example:

```js
if ("0") {
    console.log("Runs");
}
```

`"0"` is a non-empty string, so it is **truthy**.

---

# 6. Loose vs Strict Equality

### Loose Equality `==`

Compares values after type conversion.

```js
5 == "5"; // true
```

### Strict Equality `===`

Compares both **value and type** without type conversion.

```js
5 === "5"; // false
```

### Best Practice

Always prefer `===` for accurate and predictable comparisons.

---

# 7. `typeof`

The `typeof` operator tells us the type of a value.

```js
typeof "Sheryians"   // "string"
typeof 99            // "number"
typeof true          // "boolean"
typeof undefined     // "undefined"
typeof null          // "object"
typeof []            // "object"
typeof {}            // "object"
typeof function(){}  // "function"
```

### Important Quirk

```js
typeof NaN   // "number"
typeof null  // "object"
```

`typeof null === "object"` is a well-known historical JavaScript behavior.

---

## Quick Summary

| Concept        | Meaning                       |
| -------------- | ----------------------------- |
| Primitive      | Copied by value               |
| Reference      | Copied by reference           |
| BigInt         | Large integers                |
| Dynamic Typing | Variable type can change      |
| Type Coercion  | Automatic type conversion     |
| Truthy         | Acts like `true`              |
| Falsy          | Acts like `false`             |
| `==`           | Equality with type conversion |
| `===`          | Strict equality               |
| `typeof`       | Checks the type               |

### Remember

> **Primitive → Copy by Value**
> **Reference → Copy by Reference**
> **`==` → Converts Types**
> **`===` → Checks Value + Type**
> **Prefer `===`**
