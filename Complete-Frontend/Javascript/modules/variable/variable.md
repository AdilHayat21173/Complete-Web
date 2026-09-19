# JavaScript Variables

## 1. Word vs Keyword

A **word** is a normal word used in programming.

A **keyword** is a reserved word in JavaScript that has a special meaning and performs a specific task.

Examples:

```js
if
else
for
while
function
return
var
let
const
```

Keywords cannot normally be used as variable names.

---

## 2. What is a Variable?

A **variable** is a named container used to store data.

```js
let score = 90;
```

Here:

* `let` → keyword
* `score` → variable name
* `90` → value

Variables allow us to store and work with data in a program.

---

## 3. Variable Declaration Types

JavaScript provides three ways to declare variables:

```js
var
let
const
```

### `var`

`var` is the older way of declaring variables.

Characteristics:

* Function scoped
* Can be reassigned
* Can be redeclared
* Hoisted with the value `undefined`

Example:

```js
var score = 50;

score = 90;       // Reassignment
var score = 100;  // Redeclaration
```

Both reassignment and redeclaration are allowed with `var`.

### Why is `var` risky?

`var` does not follow block scope.

```js
if (true) {
    var x = 10;
}

console.log(x);
```

Output:

```text
10
```

The variable is accessible outside the `if` block because `var` is function scoped.

---

## 4. `let`

`let` is used when the value of a variable needs to change.

```js
let score = 50;

score = 90;
```

This is called **reassignment**.

However, `let` cannot be redeclared in the same scope:

```js
let score = 50;

let score = 90; // Error
```

### `let` is Block Scoped

```js
if (true) {
    let age = 20;
}

console.log(age); // Error
```

The variable `age` only exists inside the block.

---

## 5. `const`

`const` is used when a variable should not be reassigned.

```js
const pi = 3.14;

pi = 3.14159; // Error
```

`const` also cannot be redeclared:

```js
const pi = 3.14;

const pi = 3.14159; // Error
```

A `const` variable must be initialized when it is declared:

```js
const name = "Adil";
```

This is not allowed:

```js
const name;
name = "Adil"; // Error
```

---

# 6. Reassignment vs Redeclaration

These are two different concepts.

### Reassignment

Changing the value of an existing variable:

```js
let score = 50;

score = 90;
```

The variable is declared only once.

### Redeclaration

Declaring the same variable again:

```js
var score = 50;

var score = 90;
```

`var` allows redeclaration.

But:

```js
let score = 50;

let score = 90; // Error
```

And:

```js
const score = 50;

const score = 90; // Error
```

---

# 7. Scope

**Scope** determines where a variable can be accessed.

There are three important types of scope:

1. Global Scope
2. Function Scope
3. Block Scope

---

## Global Scope

A variable declared outside a function or block can have global scope.

```js
let name = "Adil";

function greet() {
    console.log(name);
}

greet();
```

Output:

```text
Adil
```

The function can access the global variable.

---

## Function Scope

`var` is function scoped.

```js
function test() {
    var age = 20;

    console.log(age);
}

test();
```

The variable `age` is available inside the function.

It cannot be accessed outside:

```js
function test() {
    var age = 20;
}

console.log(age); // Error
```

---

## Block Scope

`let` and `const` are block scoped.

A block is created using `{ }`.

For example:

```js
if (true) {
    let x = 10;
    const y = 20;
}

console.log(x); // Error
console.log(y); // Error
```

---

# 8. Scope Comparison

| Variable | Global Scope | Function Scope | Block Scope |
| -------- | ------------ | -------------- | ----------- |
| `var`    | Yes          | Yes            | No          |
| `let`    | Yes          | Yes            | Yes         |
| `const`  | Yes          | Yes            | Yes         |

---

# 9. Hoisting

**Hoisting** is JavaScript's behavior of processing variable and function declarations before executing the code.

Example:

```js
console.log(a);

var a = 90;
```

Output:

```text
undefined
```

Conceptually, JavaScript treats it similar to:

```js
var a;

console.log(a);

a = 90;
```

The declaration is available before the assignment, but the value `90` is assigned later.

---

# 10. Declaration and Initialization

When we write:

```js
var a = 90;
```

There are two important parts:

### Declaration

```js
var a;
```

The variable is declared.

### Initialization

```js
a = 90;
```

The variable receives its initial value.

So:

```js
var a = 90;
```

can conceptually be understood as:

```js
var a;    // Declaration
a = 90;   // Initialization
```

---

# 11. Temporal Dead Zone (TDZ)

`let` and `const` are hoisted, but they are **not initialized with `undefined`**.

The period between entering the scope and reaching the variable declaration is called the **Temporal Dead Zone (TDZ)**.

Example:

```js
console.log(a);

let a = 90;
```

This produces:

```text
ReferenceError
```

Similarly:

```js
console.log(a);

const a = 90;
```

also produces a `ReferenceError`.

---

# 12. `var` vs `let` vs `const`

| Feature                            | `var` | `let` | `const` |
| ---------------------------------- | ----- | ----- | ------- |
| Reassignment                       | Yes   | Yes   | No      |
| Redeclaration                      | Yes   | No    | No      |
| Block Scoped                       | No    | Yes   | Yes     |
| Function Scoped                    | Yes   | Yes   | Yes     |
| Hoisted                            | Yes   | Yes   | Yes     |
| Initialized with `undefined`       | Yes   | No    | No      |
| TDZ                                | No    | Yes   | Yes     |
| Must initialize during declaration | No    | No    | Yes     |

---

# 13. Quick Examples

### `var`

```js
var name = "Adil";

name = "Hayat"; // Reassignment

var name = "Ali"; // Redeclaration
```

### `let`

```js
let score = 50;

score = 90; // Reassignment
```

### `const`

```js
const pi = 3.14;

// pi = 3.14159; // Error
```

---

# 14. Best Practice

In modern JavaScript:

* Use **`const` by default**
* Use **`let` when the value needs to change**
* Avoid **`var`** unless you specifically need its behavior

Example:

```js
const name = "Adil";
let score = 50;

score = 90;
```

---

## Summary

```text
var
 ├── Function Scope
 ├── Can Reassign
 ├── Can Redeclare
 └── Hoisted as undefined

let
 ├── Block Scope
 ├── Can Reassign
 ├── Cannot Redeclare
 └── Temporal Dead Zone

const
 ├── Block Scope
 ├── Cannot Reassign
 ├── Cannot Redeclare
 ├── Must be initialized
 └── Temporal Dead Zone
```

### Remember

> **`var` → old and function scoped**
> **`let` → value can change**
> **`const` → variable cannot be reassigned**
> **`let` & `const` → block scoped**
> **`var` → function scoped**
> **TDZ → applies to `let` and `const`**
